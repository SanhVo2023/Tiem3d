import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

// ============================================
// CONFIG
// ============================================
const API_KEY = "AIzaSyBlLvICd8PB0vq14ADcnJWcre1pF3WvM_8";
const ai = new GoogleGenAI({ apiKey: API_KEY });
const MODEL = "gemini-2.5-flash-image";

// Output directory
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "generated");

// ============================================
// REALISTIC VIETNAMESE WORKSHOP STYLE
// ============================================
const REALISTIC_STYLE = `
Documentary photography style. Authentic Vietnamese small workshop.
Natural uneven lighting, some fluorescent mixed with daylight.
Real workspace - tools scattered, some mess on desk.
Smartphone camera quality, not professional studio.
Vietnamese workshop aesthetic - functional, hardworking environment.
Visible wear on equipment. Authentic and relatable.
NO HDR. NO over-saturation. NOT perfectly composed.
`;

const WORK_IN_PROGRESS_STYLE = `
Mid-work chaos. Vietnamese workshop setting.
Harsh fluorescent lighting mixed with window light.
Camera slightly tilted. Quick snapshot aesthetic.
Dust particles visible. Real working conditions.
NOT a product photo - documentation of actual work.
`;

// ============================================
// VIETNAM-SPECIFIC FDM PROJECTS
// Large decoration pieces, multi-part assembly
// ============================================
const PROJECTS = {
  // ==========================================
  // PROJECT 1: Large Buddha Statue (Tượng Phật)
  // Very popular in Vietnam - 60cm tall, 8-10kg filament
  // ==========================================
  "tuong-phat": {
    name: "Tượng Phật A Di Đà 60cm",
    description: "Tượng Phật lớn in nhiều phần, cao 60cm, ~8kg filament, sơn vàng đồng",
    product: {
      type: "large Buddha Amitabha statue (Phật A Di Đà)",
      material: "gray PLA, multiple printed parts",
      size: "60cm tall, split into 12 parts for printing",
      features: "serene expression, flowing robes, lotus base, meditation pose",
      weight: "approximately 8kg of filament total",
    },
    steps: [
      {
        name: "phat-01-parts",
        stage: "Các phần đã in xong",
        ratio: "16:9",
        prompt: (p) => `
          All 12 printed parts of ${p.type} laid out on large table.
          ${p.material}. Head, torso sections, arms, lotus base pieces.
          Layer lines visible on all parts. Some parts still have supports.
          Industrial workspace, Vietnamese small business setting.
          Multiple filament spools visible (used up). Scale impressive.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "phat-02-gluing",
        stage: "Ghép nối các phần",
        ratio: "4:3",
        prompt: (p) => `
          Vietnamese worker assembling ${p.type} parts.
          Using super glue and clamps to join torso sections.
          ${p.material} parts being carefully aligned.
          Workbench with glue bottles, clamps, alignment tools.
          Partially assembled Buddha showing scale - already 40cm tall.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "phat-03-filling",
        stage: "Trám khe và mài",
        ratio: "1:1",
        prompt: (p) => `
          Filling seams on assembled ${p.type} with putty filler.
          Worker applying filler to visible seam lines.
          ${p.size}. Pink/gray filler paste on joints.
          Sandpaper, putty knives, mixing board on messy desk.
          Buddha face visible - peaceful expression emerging.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "phat-04-sanding",
        stage: "Chà nhám toàn bộ",
        ratio: "4:3",
        prompt: (p) => `
          Major sanding work on ${p.type}.
          Worker wearing mask, using orbital sander on large surfaces.
          Manual sanding on detailed areas like face and hands.
          ${p.size}. Dust everywhere. Various sandpaper grits.
          Statue getting smooth, layer lines disappearing.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "phat-05-priming",
        stage: "Phun lót sơn",
        ratio: "1:1",
        prompt: (p) => `
          ${p.type} with gray primer coat in spray area.
          Newspaper on floor, statue on rotating stand.
          Primer spray cans nearby. Even gray coat applied.
          Some imperfections visible - will need touch up.
          ${p.size} - impressive scale visible.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "phat-06-goldpaint",
        stage: "Sơn màu vàng đồng",
        ratio: "1:1",
        prompt: (p) => `
          Applying gold/bronze paint to ${p.type}.
          Worker with airbrush applying metallic gold paint.
          Beautiful golden color emerging on Buddha surface.
          ${p.features} becoming visible in gold.
          Traditional Vietnamese Buddha aesthetic.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "phat-07-details",
        stage: "Vẽ chi tiết",
        ratio: "4:3",
        prompt: (p) => `
          Hand-painting details on ${p.type}.
          Fine brush adding dark accents to robes folds.
          Face details being painted - eyes, lips, eyebrows.
          Reference image of traditional Buddha nearby.
          Paints, fine brushes, magnifying lamp on desk.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "phat-08-finished",
        stage: "Hoàn thiện",
        ratio: "3:4",
        prompt: (p) => `
          Completed ${p.type} on display.
          Stunning gold/bronze finish. ${p.size}.
          ${p.features}. Traditional Vietnamese Buddhist aesthetic.
          Placed on altar-like display with red cloth.
          Soft lighting. Impressive craftsmanship from 3D print.
          Professional quality statue. Spiritual presence.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 2: Vietnamese Dragon (Rồng)
  // Cultural symbol - 80cm long, decorative piece
  // ==========================================
  "rong-trang-tri": {
    name: "Rồng Trang Trí 80cm",
    description: "Rồng Việt Nam phong cách truyền thống, 80cm, sơn đỏ vàng",
    product: {
      type: "traditional Vietnamese dragon decoration (Rồng)",
      material: "gray PLA, 15+ separate parts",
      size: "80cm long, 30cm tall, curved S-shape body",
      features: "detailed scales, fierce head with horns, flowing mane, clawed feet",
      weight: "approximately 6kg of filament",
    },
    steps: [
      {
        name: "rong-01-parts",
        stage: "In xong các phần",
        ratio: "16:9",
        prompt: (p) => `
          All printed parts of ${p.type} spread on large workshop table.
          Head piece, 8 body segments, 4 legs, tail, mane pieces.
          ${p.material}. Supports still attached to some parts.
          Vietnamese workshop setting. Scale of parts impressive.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "rong-02-assembly",
        stage: "Lắp ráp thân rồng",
        ratio: "4:3",
        prompt: (p) => `
          Assembling body segments of ${p.type}.
          Worker connecting curved body sections with glue.
          S-shape dragon body taking form on workbench.
          Clamps holding sections together while drying.
          ${p.features} - scales visible on each segment.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "rong-03-head",
        stage: "Hoàn thiện đầu rồng",
        ratio: "1:1",
        prompt: (p) => `
          Dragon head of ${p.type} being detailed.
          Fierce expression, horns, open mouth with teeth.
          Filling seams around jaw and horns.
          Mane pieces being attached to head.
          Impressive Vietnamese dragon aesthetic.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "rong-04-sanding",
        stage: "Chà nhám vảy rồng",
        ratio: "4:3",
        prompt: (p) => `
          Careful sanding of dragon scales on ${p.type}.
          Worker with small files working on scale details.
          ${p.size}. Body assembled and being smoothed.
          Preserving scale texture while removing layer lines.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "rong-05-priming",
        stage: "Sơn lót",
        ratio: "16:9",
        prompt: (p) => `
          ${p.type} fully assembled with primer coat.
          ${p.size} - impressive S-curve dragon on stand.
          Gray primer showing all the details clearly.
          Spray booth setup. Dragon on rotating display.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "rong-06-redgold",
        stage: "Sơn đỏ vàng truyền thống",
        ratio: "1:1",
        prompt: (p) => `
          Painting ${p.type} in traditional red and gold.
          Body being painted deep red. Gold accents on scales.
          Airbrush and hand brush work combination.
          Traditional Vietnamese color scheme emerging.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "rong-07-finished",
        stage: "Hoàn thiện",
        ratio: "16:9",
        prompt: (p) => `
          Completed ${p.type} on display stand.
          Stunning red body with gold scale highlights.
          ${p.size}. ${p.features}. Fierce golden eyes.
          Traditional Vietnamese dragon - symbol of power.
          Display in Vietnamese home/business setting.
          Professional decoration piece from 3D printing.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 3: Giant Store Mascot
  // Large business display - 1m tall character
  // ==========================================
  "mascot-cua-hang": {
    name: "Mascot Cửa Hàng 1 Mét",
    description: "Mascot nhân vật hoạt hình khổng lồ cho cửa hàng, cao 1m, ~15kg filament",
    product: {
      type: "giant cartoon character mascot for store display",
      material: "white and colored PLA, 20+ parts",
      size: "1 meter tall, split into many sections",
      features: "cute cartoon style, big head, friendly expression, holding product",
      weight: "approximately 15kg of filament",
    },
    steps: [
      {
        name: "mascot-01-printing",
        stage: "In các phần lớn",
        ratio: "4:3",
        prompt: (p) => `
          Large format 3D printer running huge part for ${p.type}.
          Big head section being printed - 30cm diameter piece.
          Industrial FDM printer with large build volume.
          ${p.material}. Print time display showing 40+ hours.
          Vietnamese workshop with multiple large printers.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "mascot-02-allparts",
        stage: "Tất cả phần đã in",
        ratio: "16:9",
        prompt: (p) => `
          All printed parts for ${p.type} on workshop floor.
          Massive scale - head pieces, body sections, arms, legs, base.
          ${p.size}. Worker standing next to parts for scale.
          ${p.material}. Some parts white, some colored.
          Impressive amount of plastic. ${p.weight}.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "mascot-03-structure",
        stage: "Lắp khung bên trong",
        ratio: "1:1",
        prompt: (p) => `
          Installing internal support structure for ${p.type}.
          Metal/PVC pipe frame inside body sections.
          Needed to support ${p.weight} and ${p.size}.
          Worker assembling internal skeleton.
          Engineering for large-scale 3D print display.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "mascot-04-assembly",
        stage: "Ghép nối thân",
        ratio: "4:3",
        prompt: (p) => `
          Assembling body of ${p.type}.
          Two workers lifting and connecting large body sections.
          Super glue, epoxy, and mechanical fasteners used.
          ${p.size} - already impressive even partially assembled.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "mascot-05-filling",
        stage: "Trám và mài",
        ratio: "1:1",
        prompt: (p) => `
          Filling seams on assembled ${p.type}.
          Large amount of filler being applied to joints.
          Worker on ladder reaching upper sections.
          ${p.size}. Cartoon shape clearly visible.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "mascot-06-painting",
        stage: "Sơn màu sắc",
        ratio: "4:3",
        prompt: (p) => `
          Painting ${p.type} with vibrant colors.
          Airbrush applying bright cartoon colors.
          ${p.features} - cute face being painted.
          Multiple paint colors on table. Masking tape used.
          ${p.size}. Character coming to life.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "mascot-07-details",
        stage: "Chi tiết và phụ kiện",
        ratio: "1:1",
        prompt: (p) => `
          Adding final details to ${p.type}.
          Eyes being painted, accessories attached.
          Product/item being placed in character's hands.
          Clear coat being applied for durability.
          ${p.features}. Almost complete.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "mascot-08-finished",
        stage: "Hoàn thiện tại cửa hàng",
        ratio: "3:4",
        prompt: (p) => `
          Completed ${p.type} displayed in store front.
          ${p.size} - towering cute character welcoming customers.
          ${p.features}. Vibrant colors, glossy finish.
          Vietnamese shop setting. Customers taking photos.
          Professional store display from 3D printing.
          Eye-catching marketing piece.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 4: Architectural Model
  // Vietnamese pagoda/temple for display
  // ==========================================
  "mo-hinh-chua": {
    name: "Mô Hình Chùa Một Cột",
    description: "Mô hình chùa Một Cột tỉ lệ 1:50, chi tiết cao, sơn truyền thống",
    product: {
      type: "One Pillar Pagoda model (Chùa Một Cột) - Vietnamese heritage",
      material: "gray PLA with wood-fill PLA accents",
      size: "40cm tall, 50cm base, 1:50 scale",
      features: "single pillar, lotus-shaped structure, curved roof tiles, ornate details",
      weight: "approximately 3kg of filament",
    },
    steps: [
      {
        name: "chua-01-design",
        stage: "Thiết kế 3D",
        ratio: "16:9",
        prompt: (p) => `
          Computer screen showing 3D model of ${p.type}.
          Fusion 360 or Blender with detailed pagoda model.
          Reference photos of real Chùa Một Cột nearby.
          Designer's desk in Vietnamese office setting.
          Technical notes about scale and print orientation.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "chua-02-parts",
        stage: "In các chi tiết",
        ratio: "4:3",
        prompt: (p) => `
          Printed parts for ${p.type} on table.
          Lotus base, central pillar, pagoda structure, roof tiles.
          ${p.material}. Fine details visible on roof pieces.
          Multiple small parts for ornate decorations.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "chua-03-assembly",
        stage: "Lắp ráp",
        ratio: "1:1",
        prompt: (p) => `
          Careful assembly of ${p.type}.
          Delicate work attaching roof tiles and decorations.
          ${p.features}. Single pillar being centered.
          Tweezers, small clamps, precision work.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "chua-04-painting",
        stage: "Sơn chi tiết",
        ratio: "4:3",
        prompt: (p) => `
          Hand-painting ${p.type} with traditional colors.
          Red and gold for roof, brown for wood elements.
          Fine brushes for detailed work on tiles.
          ${p.size}. Traditional Vietnamese pagoda colors.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "chua-05-base",
        stage: "Làm hồ sen",
        ratio: "1:1",
        prompt: (p) => `
          Creating lotus pond base for ${p.type}.
          Resin being poured for water effect.
          Tiny lotus flowers and leaves being placed.
          Realistic pond scene around single pillar.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "chua-06-finished",
        stage: "Hoàn thiện",
        ratio: "1:1",
        prompt: (p) => `
          Completed ${p.type} on display base.
          ${p.size}. ${p.features}. Stunning detail.
          Traditional red roof, golden accents.
          Lotus pond with water effect around pillar.
          Vietnamese cultural heritage piece.
          Museum-quality architectural model from 3D printing.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 5: Gaming/Anime Giant Figure
  // Popular in Vietnam - large character display
  // ==========================================
  "tuong-anime-lon": {
    name: "Tượng Goku Ultra Instinct 50cm",
    description: "Tượng Goku khổng lồ từ Dragon Ball, 50cm, hiệu ứng năng lượng",
    product: {
      type: "giant Goku Ultra Instinct figure from Dragon Ball",
      material: "gray PLA body, transparent PLA for energy effects",
      size: "50cm tall on dynamic action base",
      features: "silver hair, muscular pose, energy aura effects, detailed face",
      weight: "approximately 4kg of filament",
    },
    steps: [
      {
        name: "goku-01-parts",
        stage: "In xong các phần",
        ratio: "16:9",
        prompt: (p) => `
          All printed parts for ${p.type} on worktable.
          Body split into head, torso, arms, legs sections.
          ${p.material}. Energy effect pieces in clear filament.
          Action base parts. ${p.size} parts impressive.
          Vietnamese workshop, anime figure project.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "goku-02-assembly",
        stage: "Lắp ráp thân",
        ratio: "4:3",
        prompt: (p) => `
          Assembling main body of ${p.type}.
          Torso and limbs being connected.
          Dynamic action pose taking shape.
          ${p.features}. Muscular anatomy visible.
          Glue, clamps, reference images of Goku nearby.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "goku-03-sanding",
        stage: "Xử lý bề mặt",
        ratio: "1:1",
        prompt: (p) => `
          Surface finishing on ${p.type}.
          Sanding muscle definition areas carefully.
          Filling seams on torso and limbs.
          ${p.size}. Preserving anatomical details.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "goku-04-priming",
        stage: "Sơn lót",
        ratio: "4:3",
        prompt: (p) => `
          ${p.type} with gray primer coat.
          Full figure assembled on base.
          Primer revealing all details - muscles, face, hair.
          ${p.size}. ${p.features}. Ready for painting.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "goku-05-skinpaint",
        stage: "Sơn da",
        ratio: "1:1",
        prompt: (p) => `
          Airbrushing skin tones on ${p.type}.
          Realistic skin color with muscle shading.
          Face being carefully painted.
          Anime-accurate skin tones. Professional painting.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "goku-06-details",
        stage: "Chi tiết trang phục",
        ratio: "4:3",
        prompt: (p) => `
          Painting clothing and details on ${p.type}.
          Blue/orange gi costume colors being applied.
          ${p.features} - silver Ultra Instinct hair.
          Eyes being painted with anime style.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "goku-07-effects",
        stage: "Lắp hiệu ứng",
        ratio: "1:1",
        prompt: (p) => `
          Attaching energy effect pieces to ${p.type}.
          Transparent aura pieces around figure.
          LED lights being installed in base.
          Energy flowing effect taking shape.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "goku-08-finished",
        stage: "Hoàn thiện",
        ratio: "3:4",
        prompt: (p) => `
          Completed ${p.type} with LED lights on.
          ${p.size}. ${p.features}. Glowing energy aura.
          Stunning Ultra Instinct silver hair.
          Dynamic pose on action base with lighting effects.
          Professional anime figure from 3D printing.
          Collector quality display piece.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 6: Wedding Decoration Set
  // Popular service in Vietnam
  // ==========================================
  "trang-tri-cuoi": {
    name: "Bộ Trang Trí Đám Cưới",
    description: "Bộ chữ cưới và khung ảnh lớn, tên cô dâu chú rể, sơn vàng hồng",
    product: {
      type: "wedding decoration set with large letters and photo frame",
      material: "white PLA, gold and rose gold painted",
      size: "letters 40cm tall, photo frame 60x40cm",
      features: "custom names, heart decorations, elegant script font, floral accents",
      weight: "approximately 5kg of filament total",
    },
    steps: [
      {
        name: "cuoi-01-design",
        stage: "Thiết kế theo tên",
        ratio: "16:9",
        prompt: (p) => `
          Computer screen showing ${p.type} design.
          Vietnamese names in elegant script: "MINH & LINH".
          Heart shapes, floral decorations in 3D software.
          Customer reference photos nearby. Wedding theme.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "cuoi-02-printing",
        stage: "In các chữ lớn",
        ratio: "4:3",
        prompt: (p) => `
          3D printer creating large letter for ${p.type}.
          Letter "M" being printed, 40cm tall.
          ${p.material}. Elegant script font visible.
          Multiple letters already printed on table.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "cuoi-03-parts",
        stage: "Tất cả bộ phận",
        ratio: "16:9",
        prompt: (p) => `
          All printed parts for ${p.type} on table.
          Large letters spelling names, heart pieces, frame parts.
          ${p.size}. Floral accent pieces. Decorative elements.
          ${p.material}. Ready for finishing.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "cuoi-04-sanding",
        stage: "Xử lý bề mặt",
        ratio: "1:1",
        prompt: (p) => `
          Sanding and finishing ${p.type} letters.
          Smooth surface preparation for painting.
          Script font edges being perfected.
          ${WORK_IN_PROGRESS_STYLE}
        `,
      },
      {
        name: "cuoi-05-painting",
        stage: "Sơn vàng và hồng",
        ratio: "4:3",
        prompt: (p) => `
          Spray painting ${p.type} in gold and rose gold.
          Letters getting metallic gold finish.
          Hearts in rose gold. Elegant color scheme.
          Wedding aesthetic emerging.
          ${REALISTIC_STYLE}
        `,
      },
      {
        name: "cuoi-06-finished",
        stage: "Hoàn thiện",
        ratio: "16:9",
        prompt: (p) => `
          Completed ${p.type} displayed at wedding venue.
          "MINH & LINH" in gold script letters, 40cm tall.
          Large photo frame with rose gold finish.
          Heart decorations, floral accents. Elegant setup.
          Vietnamese wedding decoration. Romantic lighting.
          Professional custom wedding decor from 3D printing.
          ${REALISTIC_STYLE}
        `,
      },
    ],
  },
};

// ============================================
// IMAGE GENERATION FUNCTION WITH RETRY
// ============================================
async function generateImage(prompt, aspectRatio, outputPath, retries = 3) {
  const filename = path.basename(outputPath);
  console.log(`\n📸 Generating: ${filename}`);
  console.log(`   Ratio: ${aspectRatio}`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt.trim().replace(/\s+/g, " "),
        config: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      if (response.candidates && response.candidates[0]) {
        const parts = response.candidates[0].content?.parts || [];
        for (const part of parts) {
          if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");

            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(outputPath, buffer);
            console.log(`   ✅ Saved: ${outputPath}`);
            return true;
          }
        }
      }

      console.log(`   ❌ No image in response`);
      return false;
    } catch (error) {
      const errorMsg = error.message || String(error);

      // Check if it's a rate limit error
      if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("quota")) {
        const waitTime = attempt * 60; // 60s, 120s, 180s
        console.log(`   ⏳ Rate limited. Waiting ${waitTime}s before retry ${attempt}/${retries}...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
        continue;
      }

      console.error(`   ❌ Error: ${errorMsg}`);
      if (attempt < retries) {
        console.log(`   🔄 Retrying (${attempt}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  return false;
}

// ============================================
// GENERATE PROJECT SEQUENCE
// ============================================
async function generateProject(projectKey) {
  const project = PROJECTS[projectKey];
  if (!project) {
    console.log(`❌ Project "${projectKey}" not found`);
    console.log(`Available projects: ${Object.keys(PROJECTS).join(", ")}`);
    return;
  }

  console.log("\n" + "=".repeat(60));
  console.log(`🎬 PROJECT: ${project.name}`);
  console.log(`   ${project.description}`);
  console.log("=".repeat(60));

  const projectDir = path.join(OUTPUT_DIR, "projects", projectKey);

  for (let i = 0; i < project.steps.length; i++) {
    const step = project.steps[i];
    const outputPath = path.join(projectDir, `${step.name}.png`);

    // Skip if exists
    if (fs.existsSync(outputPath)) {
      console.log(`\n⏭️  Skipping ${step.name} (exists)`);
      continue;
    }

    console.log(`\n📍 Step ${i + 1}/${project.steps.length}: ${step.stage}`);

    const prompt = step.prompt(project.product);
    await generateImage(prompt, step.ratio, outputPath);

    // Rate limiting - 10 second delay between requests
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  console.log(`\n✅ Project "${project.name}" complete!`);
}

// ============================================
// GENERATE ALL PROJECTS
// ============================================
async function generateAllProjects() {
  console.log("=".repeat(60));
  console.log("🚀 GENERATING ALL PROJECT SEQUENCES");
  console.log("=".repeat(60));

  let totalSteps = 0;
  for (const key of Object.keys(PROJECTS)) {
    totalSteps += PROJECTS[key].steps.length;
  }
  console.log(`\nTotal images to generate: ${totalSteps}`);

  for (const projectKey of Object.keys(PROJECTS)) {
    await generateProject(projectKey);
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎉 ALL PROJECTS COMPLETE!");
  console.log("=".repeat(60));
}

// ============================================
// CLI
// ============================================
const args = process.argv.slice(2);
const command = args[0] || "help";

switch (command) {
  case "all":
    generateAllProjects();
    break;
  case "project":
    if (args[1]) {
      generateProject(args[1]);
    } else {
      console.log("Usage: node generate-projects.mjs project <name>");
      console.log("Projects:", Object.keys(PROJECTS).join(", "));
    }
    break;
  case "list":
    console.log("\n📋 Available Projects:\n");
    for (const [key, proj] of Object.entries(PROJECTS)) {
      console.log(`  ${key}`);
      console.log(`    Name: ${proj.name}`);
      console.log(`    Steps: ${proj.steps.length} images`);
      console.log(`    ${proj.description}\n`);
    }
    break;
  default:
    console.log("\n🖼️  Vietnam FDM Project Image Generator\n");
    console.log("Commands:");
    console.log("  node generate-projects.mjs all              - Generate ALL projects");
    console.log("  node generate-projects.mjs project <name>   - Generate specific project");
    console.log("  node generate-projects.mjs list             - List all projects");
    console.log("\nProjects:", Object.keys(PROJECTS).join(", "));
}
