// Generates blog cover images and brand assets.
//
// public/assets/blog/ was an empty directory while every post declared an
// `image:` — so every post's og:image and twitter:image was a 404.
//
//   node scripts/generate-blog-assets.mjs covers   blog cover images
//   node scripts/generate-blog-assets.mjs brand    logo + default OG card
//   node scripts/generate-blog-assets.mjs branch   Sơn Kỳ branch photos
//   node scripts/generate-blog-assets.mjs all
import * as fs from "node:fs";
import * as path from "node:path";
import matter from "gray-matter";
import { generateImage, pause, summarise } from "./lib/gemini.mjs";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_OUT = path.join(process.cwd(), "public", "assets", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const ASSET_OUT = path.join(PUBLIC_DIR, "assets", "generated");

// Shared look so covers read as one set rather than 18 unrelated images.
const COVER_STYLE = `
Editorial photograph for a blog article header, 16:9 landscape.
Real Vietnamese 3D printing workshop, natural daylight, warm neutral tones.
Shallow depth of field, uncluttered composition with clear negative space
in the upper third. Photorealistic, not illustration, no text or lettering
anywhere in the image.
`;

// One prompt per post slug. Each shows the article's actual subject rather
// than a generic printer photo.
const COVERS = {
  "in-3d-o-dau-tphcm":
    "Wide view of a tidy Vietnamese 3D printing shop front counter, several FDM printers working on shelves behind, a staff member handing a finished print to a customer across the counter.",
  "chon-vat-lieu-in-3d-pla-petg-abs-tpu":
    "Overhead flat lay of six filament spools in different colours arranged in a row on a light wooden bench, each with a small printed test sample beside it showing different surface finishes.",
  "in-3d-mo-hinh-figure-anime-theo-yeu-cau":
    "A painted anime-style collectible figure about 18cm tall on a display base, airbrush and fine paint brushes softly blurred behind it, warm window light.",
  "in-3d-do-nhua-bi-gay-khong-co-file":
    "A broken plastic part with a missing piece lying on a workbench next to a steel ruler and a digital caliper, a freshly printed replacement part beside it.",
  "in-3d-phu-kien-xe-may-do-che":
    "A 3D printed phone mount fitted to a motorbike handlebar in bright daylight, motorbike detail visible, urban Vietnamese street softly blurred behind.",
  "in-3d-mau-san-pham-prototype-doanh-nghiep":
    "Several identical small brand mascot figurines arranged in neat rows on a white table beside a laptop showing a 3D render, meeting-room setting.",
  "den-lithophane-in-3d-tu-anh":
    "A lithophane night lamp glowing on a dark bedside table, a portrait photo visible inside the illuminated white panel, room lights low and warm.",
  "phu-kien-cosplay-halloween-in-3d":
    "A finished painted cosplay helmet and a shoulder armour piece on a dark workbench, metallic paint finish catching light, spray cans and sanding pads nearby.",
  "qua-tang-20-11-in-3d-tang-thay-co":
    "A small engraved desk nameplate and a glowing lithophane photo lamp arranged as a gift set on a teacher's wooden desk with books and a plant.",
  "in-3d-trang-tri-tet-2027-nam-dinh-mui":
    "A decorative goat figurine painted with gold accents for Vietnamese Lunar New Year, red and gold Tet decorations and apricot blossom softly blurred behind.",
  "gia-in-3d-tinh-nhu-the-nao":
    "A digital kitchen scale on a workbench with a freshly printed grey part sitting on it showing its weight, filament spool and calculator nearby.",
  "huong-dan-chuan-bi-file-in-3d":
    "A computer monitor showing a 3D model in slicing software with support structures visible, USB stick and notepad on the desk beside the keyboard.",
  "in-3d-fdm-vs-resin":
    "Two versions of the same small model side by side on a white surface — one visibly layered from FDM printing, one smooth and finely detailed from resin printing.",
  "in-3d-chi-tiet-ky-thuat":
    "Precision 3D printed mechanical parts — gears, brackets and a bearing housing — arranged on a workbench with a digital caliper measuring one of them.",
  "in-3d-cho-cosplayer":
    "A cosplayer's workbench with a large printed prop weapon partly sanded, foam padding, straps and paint supplies laid out around it.",
  "in-3d-qua-tang-valentine":
    "A small printed gift set on a table — a heart shaped box and a couple figurine — with soft warm lighting and rose petals blurred in the foreground.",
  "in-3d-trang-tri-tet-2026-nam-ngua":
    "A painted decorative horse figurine for Vietnamese Lunar New Year on a table with red envelopes and apricot blossom branches around it.",
  "in-3d-xe-rc-va-drone":
    "An FPV drone frame and RC car suspension parts printed in black and orange plastic, laid out on a workbench with hex drivers and spare propellers.",
};

const BRAND = [
  {
    file: path.join(PUBLIC_DIR, "logo.png"),
    ratio: "1:1",
    prompt: `
      A clean, simple app-icon style logo mark on a plain white background.
      A minimal geometric symbol suggesting a 3D printed layered object -
      stacked horizontal layers forming a simple cube or arch shape.
      Solid warm orange (#F97316) on white. Flat vector look, no gradient,
      no text, no lettering, centred with even margins. Crisp edges.
    `,
  },
  {
    file: path.join(PUBLIC_DIR, "og-image.jpg"),
    ratio: "16:9",
    prompt: `
      Wide banner photograph of a bright, tidy Vietnamese 3D printing workshop.
      Several FDM printers mid-print on shelves, colourful filament spools,
      a few finished painted models on a front bench. Natural daylight from
      large windows, warm inviting tones, clear empty space in the upper left
      third. Photorealistic. No text or lettering anywhere.
    `,
  },
];

const BRANCH = [
  {
    name: "branch-son-ky-front",
    ratio: "16:9",
    prompt: `
      Small friendly 3D printing shop front on a wide Vietnamese city street in
      Tan Phu district, daytime. Glass frontage showing printers and finished
      models inside, motorbikes parked outside, a large shopping mall visible
      further down the street. Bright natural light. Photorealistic.
      No readable text or signage lettering.
    `,
  },
  {
    name: "branch-son-ky-inside",
    ratio: "16:9",
    prompt: `
      Interior of a small 3D printing shop: a customer counter with finished
      painted models displayed, shelves of FDM printers running behind,
      filament spools organised on a wall rack. Clean, bright, welcoming.
      Photorealistic Vietnamese small business interior.
    `,
  },
  {
    name: "branch-thu-duc-front",
    ratio: "16:9",
    prompt: `
      Small 3D printing workshop front on a quiet residential street in Thu Duc,
      Ho Chi Minh City. Roll-up shutter open showing printers inside, a couple of
      motorbikes parked, green plants beside the entrance, afternoon light.
      Photorealistic. No readable text or signage lettering.
    `,
  },
  {
    name: "workspace-team",
    ratio: "16:9",
    prompt: `
      Two people working in a small Vietnamese 3D printing shop - one at a
      computer modelling on screen, one checking a print on the machine.
      Natural daylight, warm tones, real working atmosphere, tidy but used.
      Photorealistic.
    `,
  },
];

function postSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

async function generateCovers() {
  fs.mkdirSync(BLOG_OUT, { recursive: true });
  const slugs = postSlugs();
  const results = [];

  console.log(`\nGenerating covers for ${slugs.length} posts\n${"=".repeat(56)}`);

  for (const slug of slugs) {
    const subject = COVERS[slug];
    if (!subject) {
      console.log(`   ⚠️  No cover prompt defined for: ${slug}`);
      continue;
    }

    // Confirm the post actually points at the file we're about to write.
    const { data } = matter(
      fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8")
    );
    const expected = `/assets/blog/${slug}.jpg`;
    if (data.image && data.image !== expected) {
      console.log(`   ⚠️  ${slug} declares ${data.image}, expected ${expected}`);
    }

    const out = path.join(BLOG_OUT, `${slug}.jpg`);
    results.push(
      await generateImage(`${subject} ${COVER_STYLE}`, out, { aspectRatio: "16:9" })
    );
    await pause(6000);
  }

  summarise(results, "Blog covers");
}

async function generateBrand() {
  const results = [];
  for (const item of BRAND) {
    results.push(
      await generateImage(item.prompt, item.file, { aspectRatio: item.ratio })
    );
    await pause(6000);
  }
  summarise(results, "Brand assets");
}

async function generateBranch() {
  const dir = path.join(ASSET_OUT, "workspace");
  fs.mkdirSync(dir, { recursive: true });
  const results = [];
  for (const item of BRANCH) {
    results.push(
      await generateImage(item.prompt, path.join(dir, `${item.name}.png`), {
        aspectRatio: item.ratio,
      })
    );
    await pause(6000);
  }
  summarise(results, "Branch photos");
}

const command = process.argv[2] || "help";

switch (command) {
  case "covers":
    await generateCovers();
    break;
  case "brand":
    await generateBrand();
    break;
  case "branch":
    await generateBranch();
    break;
  case "all":
    await generateCovers();
    await generateBrand();
    await generateBranch();
    break;
  default:
    console.log(`
Usage:
  node scripts/generate-blog-assets.mjs covers   blog cover images (16:9)
  node scripts/generate-blog-assets.mjs brand    logo.png + og-image.jpg
  node scripts/generate-blog-assets.mjs branch   branch and workspace photos
  node scripts/generate-blog-assets.mjs all
`);
}
