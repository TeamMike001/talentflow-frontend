const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "docs", "talentflow-frontend-team-guide.md");
const outputDir = path.join(__dirname, "..", "output", "pdf");
const outputPath = path.join(outputDir, "TalentFlow-Frontend-Team-Guide.pdf");

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 52;
const MARGIN_TOP = 60;
const MARGIN_BOTTOM = 55;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function approxTextWidth(text, fontSize, fontName) {
  const factor = fontName === "F3" ? 0.6 : 0.52;
  return text.length * fontSize * factor;
}

function wrapText(text, maxWidth, fontSize, fontName) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines = [];
  let current = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${current} ${words[i]}`;
    if (approxTextWidth(candidate, fontSize, fontName) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }

  lines.push(current);
  return lines;
}

class PdfBuilder {
  constructor() {
    this.pages = [];
    this.currentPage = [];
    this.y = PAGE_HEIGHT - MARGIN_TOP;
    this.pageNumber = 1;
  }

  ensureSpace(height) {
    if (this.y - height < MARGIN_BOTTOM) {
      this.finishPage();
    }
  }

  footer() {
    const text = `TalentFlow Learning Platform Frontend Team Guide | Page ${this.pageNumber}`;
    this.currentPage.push(`BT /F1 9 Tf 52 28 Td (${escapePdfText(text)}) Tj ET`);
  }

  finishPage() {
    this.footer();
    this.pages.push(this.currentPage.join("\n"));
    this.currentPage = [];
    this.y = PAGE_HEIGHT - MARGIN_TOP;
    this.pageNumber += 1;
  }

  paragraph(text, options = {}) {
    const {
      x = MARGIN_X,
      font = "F1",
      size = 11,
      gapAfter = 8,
      width = CONTENT_WIDTH,
      leading = Math.round(size * 1.45),
    } = options;

    const lines = wrapText(text, width, size, font);
    this.ensureSpace(lines.length * leading + gapAfter);

    for (const line of lines) {
      this.currentPage.push(`BT /${font} ${size} Tf ${x} ${this.y} Td (${escapePdfText(line)}) Tj ET`);
      this.y -= leading;
    }

    this.y -= gapAfter;
  }

  heading(text, level) {
    const size = level === 1 ? 20 : level === 2 ? 15 : 12;
    const gapBefore = level === 1 ? 8 : 5;
    const gapAfter = level === 1 ? 8 : 5;
    this.y -= gapBefore;
    this.paragraph(text, {
      font: "F2",
      size,
      gapAfter,
      leading: Math.round(size * 1.3),
    });
  }

  bullet(text) {
    const bulletX = MARGIN_X + 10;
    const textX = MARGIN_X + 24;
    const width = CONTENT_WIDTH - 24;
    const lines = wrapText(text, width, 11, "F1");
    const leading = 16;
    this.ensureSpace(lines.length * leading + 4);
    this.currentPage.push(`BT /F1 11 Tf ${bulletX} ${this.y} Td (-) Tj ET`);

    for (const line of lines) {
      this.currentPage.push(`BT /F1 11 Tf ${textX} ${this.y} Td (${escapePdfText(line)}) Tj ET`);
      this.y -= leading;
    }

    this.y -= 4;
  }

  codeLine(text) {
    this.ensureSpace(13);
    this.currentPage.push(`BT /F3 9 Tf ${MARGIN_X + 12} ${this.y} Td (${escapePdfText(text || " ")}) Tj ET`);
    this.y -= 13;
  }

  blank(amount = 6) {
    this.ensureSpace(amount);
    this.y -= amount;
  }

  finalize() {
    this.finishPage();
  }
}

function buildPdfBinary(streams) {
  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogRef = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  addObject("");
  const font1Ref = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const font2Ref = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const font3Ref = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");

  const pageRefs = [];

  for (const stream of streams) {
    const contentRef = addObject(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`);
    const pageRef = addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${font1Ref} 0 R /F2 ${font2Ref} 0 R /F3 ${font3Ref} 0 R >> >> /Contents ${contentRef} 0 R >>`
    );
    pageRefs.push(pageRef);
  }

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}

function renderMarkdown(markdown) {
  const builder = new PdfBuilder();
  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      builder.blank(4);
      continue;
    }

    if (inCodeBlock) {
      builder.codeLine(line);
      continue;
    }

    if (!trimmed) {
      builder.blank(6);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      builder.heading(trimmed.slice(2), 1);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      builder.heading(trimmed.slice(3), 2);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      builder.heading(trimmed.slice(4), 3);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      builder.bullet(trimmed.slice(2));
      continue;
    }

    builder.paragraph(trimmed);
  }

  builder.finalize();
  return buildPdfBinary(builder.pages);
}

fs.mkdirSync(outputDir, { recursive: true });
const markdown = fs.readFileSync(inputPath, "utf8");
const pdf = renderMarkdown(markdown);
fs.writeFileSync(outputPath, pdf);
console.log(outputPath);
