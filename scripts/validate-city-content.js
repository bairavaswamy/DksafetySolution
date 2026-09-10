const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: { esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};

const wordCount = (value) => (value.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
const strings = (value) => typeof value === "string" ? [value]
  : Array.isArray(value) ? value.flatMap(strings)
    : value && typeof value === "object" ? Object.entries(value).filter(([key]) => key !== "id").flatMap(([, item]) => strings(item)) : [];
const encodeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

try {
  const { chennaiConfig } = require(path.join(root, "app/config/chennai.config.ts"));
  const { cityServiceContent } = require(path.join(root, "app/content/city-services/index.ts"));
  const expectedSlugs = chennaiConfig.services.map((service) => service.slug);
  assert.deepEqual(Object.keys(cityServiceContent).sort(), [...expectedSlugs].sort(), "Every city service needs its own content.");
  const titles = new Set();
  const descriptions = new Set();
  const longParagraphOwners = new Map();
  const counts = [];
  const checkExport = process.argv.includes("--export");

  for (const slug of expectedSlugs) {
    const content = cityServiceContent[slug];
    assert(content.metaTitle.includes("Chennai"), `${slug}: title must identify Chennai.`);
    assert(!titles.has(content.metaTitle), `${slug}: duplicate title.`);
    assert(!descriptions.has(content.metaDescription), `${slug}: duplicate description.`);
    titles.add(content.metaTitle);
    descriptions.add(content.metaDescription);
    assert(content.metaTitle.length >= 35 && content.metaTitle.length <= 95, `${slug}: title needs a concise descriptive length.`);
    assert(content.metaDescription.length >= 110 && content.metaDescription.length <= 180, `${slug}: description needs a concise descriptive length.`);
    assert(content.sections.length >= 4, `${slug}: incomplete service guide.`);
    assert.equal(new Set(content.sections.map((section) => section.id)).size, content.sections.length, `${slug}: duplicate section anchors.`);
    for (const section of content.sections) {
      assert(/^[a-z][a-z0-9-]*$/.test(section.id), `${slug}: invalid section anchor ${section.id}.`);
      assert(section.paragraphs.length >= 2, `${slug}: ${section.id} needs substantive explanations.`);
    }
    assert(content.options.rows.length >= 3 && content.pricing.factors.length >= 4 && content.pricing.quoteChecklist.length >= 5, `${slug}: missing comparison or quote guidance.`);
    assert(content.process.length >= 4 && content.localConsiderations.length >= 3, `${slug}: missing installation/local guidance.`);
    assert(content.faq.length >= 8, `${slug}: needs at least eight relevant FAQs.`);
    assert.equal(new Set(content.faq.map((faq) => faq.question)).size, content.faq.length, `${slug}: duplicate FAQ questions.`);
    for (const faq of content.faq) assert(wordCount(faq.answer) >= 25, `${slug}: incomplete FAQ answer: ${faq.question}`);
    assert.equal(new Set(content.relatedServices).size, content.relatedServices.length, `${slug}: duplicate related service.`);
    for (const related of content.relatedServices) assert(related !== slug && expectedSlugs.includes(related), `${slug}: invalid related service ${related}.`);

    const { metaTitle, metaDescription, relatedServices, ...body } = content;
    const bodyStrings = strings(body);
    const words = wordCount(bodyStrings.join(" "));
    // Editorial completeness check, not a search-engine word-count target.
    assert(words >= 1300, `${slug}: only ${words} words; check for missing guide sections.`);
    for (const text of bodyStrings) {
      assert(text.trim().length > 0, `${slug}: empty content field.`);
      if (wordCount(text) < 45) continue;
      const normalized = text.toLowerCase().replace(/\s+/g, " ").trim();
      const owner = longParagraphOwners.get(normalized);
      assert(!owner || owner === slug, `${slug}: repeated long passage from ${owner}.`);
      longParagraphOwners.set(normalized, slug);
    }

    if (checkExport) {
      const filename = path.join(root, "out", chennaiConfig.citySlug, slug, "index.html");
      const html = fs.readFileSync(filename, "utf8");
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${slug}: expected one h1.`);
      assert(html.includes(`<title>${encodeHtml(metaTitle)}</title>`), `${slug}: exported title is stale.`);
      assert(html.includes(`name="description" content="${encodeHtml(metaDescription)}"`), `${slug}: exported description is stale.`);
      for (const section of content.sections) assert(html.includes(`id="guide-${section.id}"`), `${slug}: missing article anchor ${section.id}.`);
      for (const text of bodyStrings) assert(html.includes(encodeHtml(text)), `${slug}: copy missing from exported HTML: ${text.slice(0, 70)}...`);
      const schemaNodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .flatMap((match) => { const value = JSON.parse(match[1]); return value["@graph"] || [value]; });
      const faqNodes = schemaNodes.filter((node) => node["@type"] === "FAQPage");
      assert.equal(faqNodes.length, 1, `${slug}: unexpected extra FAQ schema for answers not displayed on this page.`);
      const faqSchema = faqNodes.find((node) => node["@id"].includes(`/${slug}/`));
      assert(faqSchema, `${slug}: missing page FAQ schema.`);
      assert.deepEqual(faqSchema.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), content.faq, `${slug}: visible FAQ and structured data differ.`);
    }
    counts.push({ slug, words, faqs: content.faq.length });
  }
  const min = Math.min(...counts.map((item) => item.words));
  const max = Math.max(...counts.map((item) => item.words));
  const total = counts.reduce((sum, item) => sum + item.words, 0);
  console.table(counts);
  console.log(`City service content passed: ${counts.length} services, ${total} words (${min}-${max} per guide), ${counts.reduce((sum, item) => sum + item.faqs, 0)} FAQs${checkExport ? "; exported HTML, metadata and FAQ schema verified" : ""}.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
