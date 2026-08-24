import * as fs from "node:fs";
import * as path from "node:path";
import { generateImage, pause } from "./lib/gemini.mjs";
import { VN_PROJECTS, MISSING_SINGLES } from "./data/projects-vn.mjs";

// ============================================
// CONFIG
// ============================================
// API key comes from .env.local (gitignored) — see scripts/lib/env.mjs

// Output directory
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "generated");

// ============================================
// CLEAN PRODUCT PHOTOGRAPHY STYLE
// ============================================
const CLEAN_STYLE = `
Clean product photography. Soft natural daylight from window.
Simple wooden desk or table surface. Light wood tone.
Minimal background - white wall, blurred green plant.
Bright and airy. Shallow depth of field.
Professional but approachable. Modern minimalist aesthetic.
NO harsh shadows. NO cluttered background. NO dramatic lighting.
`;

const WORK_STYLE = `
Clean workspace photography. Soft natural lighting.
Wooden desk surface. Minimal tools visible - only what's needed.
White/light background. Small plant in corner blurred.
Focused on the subject. Professional product photo style.
Bright, clean, modern aesthetic.
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
    name: "Tượng Phật A Di Đà",
    description: "Tượng Phật vàng đồng từ ảnh tham khảo của khách",
    product: {
      type: "golden Buddha statue",
      material: "gray PLA, gold spray painted",
      features: "serene meditation pose, flowing robes, lotus base",
    },
    steps: [
      {
        name: "phat-01-zalo",
        stage: "Khách gửi qua Zalo",
        prompt: (p) => `
          Phone screenshot of Zalo chat conversation. Vietnamese interface.
          Customer sent a blurry photo of a ${p.type} they want printed.
          Chat bubbles visible, customer name blurred out for privacy.
          Phone lying on messy desk with keyboard visible. Real chat screenshot aesthetic.
        `,
      },
      {
        name: "phat-02-blender",
        stage: "Thiết kế 3D",
        prompt: (p) => `
          Computer workstation in a small Vietnamese 3D printing shop.
          Monitor showing Blender with ${p.type} 3D model being sculpted.
          Messy desk - coffee cup, sticky notes, mouse pad, tangled cables.
          Fluorescent lighting. Real workspace not studio.
        `,
      },
      {
        name: "phat-03-printing",
        stage: "Đang in",
        prompt: (p) => `
          Metal shelf rack with multiple 3D printers in Vietnamese print shop.
          5-6 FDM printers (Creality Ender, orange Prusa style) on shelves.
          One printer printing the ${p.type} in gray PLA, partially done.
          Filament spools hanging, some printers running, industrial look.
        `,
      },
      {
        name: "phat-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Finishing workbench in 3D print shop. Newspaper on table.
          ${p.type} being spray painted gold. Gold spray can nearby.
          Other pieces drying on rack. Paint masks, sandpaper scattered.
          Workshop corner with good ventilation, practical messy setup.
        `,
      },
      {
        name: "phat-05-display",
        stage: "Sản phẩm hoàn thiện",
        prompt: (p) => `
          Completed ${p.type} in beautiful gold finish.
          Product photography setup - white backdrop, soft lighting.
          ${p.features}. Professional product shot for portfolio.
          Clean presentation, the statue looks premium.
        `,
      },
      {
        name: "phat-06-shipping",
        stage: "Đóng gói giao hàng",
        prompt: (p) => `
          Packing station in Vietnamese shop. The ${p.type} wrapped in bubble wrap.
          Cardboard box with GHN or GHTK shipping label visible.
          Tape dispenser, scissors, packing materials on table.
          Ready to ship to customer. Real e-commerce packing scene.
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 2: Iron Man Helmet
  // Client sends reference image from internet
  // ==========================================
  "iron-man-helmet": {
    name: "Mũ Iron Man",
    description: "Mũ Iron Man từ ảnh tham khảo trên mạng",
    product: {
      type: "Iron Man MK85 helmet",
      material: "red PLA, gold spray painted",
      features: "iconic faceplate with LED eye slots, metallic red and gold finish, wearable size",
    },
    steps: [
      {
        name: "ironman-01-zalo",
        stage: "Khách gửi qua Zalo",
        prompt: (p) => `
          Phone screen showing Zalo chat. Vietnamese chat interface.
          Customer sent a screenshot of ${p.type} from Google Images.
          Red and gold helmet reference image in chat bubble.
          Phone on clean wooden desk, keyboard edge visible. Bright daylight.
        `,
      },
      {
        name: "ironman-02-blender",
        stage: "Thiết kế 3D",
        prompt: (p) => `
          Clean computer workstation. 27-inch monitor showing Blender software.
          ${p.type} 3D model being detailed - wireframe and solid viewport.
          Organized desk with coffee mug, small plant. Bright workspace.
          Modern Vietnamese office aesthetic, natural window light.
        `,
      },
      {
        name: "ironman-03-printing",
        stage: "Đang in",
        prompt: (p) => `
          3D printing area with organized metal shelving.
          Multiple FDM printers (Creality, Prusa orange) on clean shelves.
          One printer showing ${p.type} faceplate in red PLA, 70% done.
          Neat filament storage, good lighting. Professional workshop.
        `,
      },
      {
        name: "ironman-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Clean finishing workbench with newspaper protection.
          ${p.type} parts being spray painted gold accents.
          Organized setup - masking tape, gold spray can, respirator mask.
          Well-ventilated corner of shop. Practical but tidy.
        `,
      },
      {
        name: "ironman-05-display",
        stage: "Sản phẩm hoàn thiện",
        prompt: (p) => `
          Completed ${p.type} displayed on wooden table.
          ${p.features}. Stunning metallic finish catches light.
          Clean product photography - white backdrop, soft shadows.
          Premium cosplay quality piece.
        `,
      },
      {
        name: "ironman-06-shipping",
        stage: "Đóng gói giao hàng",
        prompt: (p) => `
          Packing area with the ${p.type} carefully wrapped in bubble wrap.
          Large cardboard box with GHN shipping label. Vietnamese text visible.
          Foam padding inside box. Tape gun on table.
          Ready for delivery. Clean organized shipping station.
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 3: Phone Stand
  // Client sends pencil sketch
  // ==========================================
  "phone-stand": {
    name: "Giá Đỡ Điện Thoại",
    description: "Giá đỡ điện thoại từ bản vẽ tay của khách",
    product: {
      type: "geometric minimalist phone stand",
      material: "orange PLA plastic",
      features: "clean angular design, stable weighted base, adjustable viewing angle",
    },
    steps: [
      {
        name: "stand-01-zalo",
        stage: "Khách gửi qua Zalo",
        prompt: (p) => `
          Phone screen showing Zalo chat conversation in Vietnamese.
          Customer sent a photo of hand-drawn pencil sketch on paper.
          Simple ${p.type} design concept with dimensions written.
          Phone lying flat on light wooden desk. Natural daylight.
        `,
      },
      {
        name: "stand-02-fusion",
        stage: "Thiết kế 3D",
        prompt: (p) => `
          Clean computer setup with Fusion 360 on screen.
          ${p.type} CAD model with precise measurements and dimensions.
          Technical parametric design view. Gray and orange preview.
          Organized desk, white wall background, good lighting.
        `,
      },
      {
        name: "stand-03-printing",
        stage: "Đang in",
        prompt: (p) => `
          FDM 3D printer printing ${p.type} in bright orange PLA.
          Clean Creality or Bambu printer, object 60% complete on bed.
          Orange filament spool visible. Clean print area with good lighting.
          Simple functional workshop corner.
        `,
      },
      {
        name: "stand-04-display",
        stage: "Sản phẩm hoàn thiện",
        prompt: (p) => `
          Completed ${p.type} in vibrant orange on wooden table.
          ${p.features}. Modern smartphone placed in stand at angle.
          Clean product photography - soft shadows, bright daylight.
          Minimalist aesthetic, blurred plant in background.
        `,
      },
      {
        name: "stand-05-shipping",
        stage: "Đóng gói giao hàng",
        prompt: (p) => `
          Small shipping station. ${p.type} in small cardboard box.
          Bubble wrap protection, GHTK shipping label on box.
          Compact neat packaging. Ready for delivery.
          Clean desk area with tape and scissors.
        `,
      },
    ],
  },

  // ==========================================
  // PROJECT 4: Anime Figure (Resin)
  // Client sends character drawing
  // ==========================================
  "anime-figure": {
    name: "Figure Anime Resin",
    description: "Figure anime từ hình vẽ nhân vật của khách",
    product: {
      type: "cute chibi anime girl figure",
      material: "8K resin, hand painted with acrylics",
      features: "big expressive eyes, pink twin-tails hair, school uniform, dynamic cute pose",
    },
    steps: [
      {
        name: "anime-01-zalo",
        stage: "Khách gửi qua Zalo",
        prompt: (p) => `
          Phone screen showing Zalo chat in Vietnamese.
          Customer sent a colorful hand-drawn ${p.type} character design.
          Cute anime art style drawing in chat bubble.
          Phone on wooden desk, natural daylight. Clean setup.
        `,
      },
      {
        name: "anime-02-zbrush",
        stage: "Điêu khắc 3D",
        prompt: (p) => `
          Computer workstation with ZBrush on large monitor.
          ${p.type} being digitally sculpted - high poly mesh visible.
          Multiple viewport angles showing character from different sides.
          Clean creative workspace, drawing tablet on desk.
        `,
      },
      {
        name: "anime-03-resin",
        stage: "In Resin 8K",
        prompt: (p) => `
          Resin printing corner of the shop. Elegoo or Anycubic 8K printer.
          ${p.type} emerging upside down from resin vat. Purple UV glow.
          Clean dedicated resin area with IPA wash station nearby.
          Professional setup with good ventilation.
        `,
      },
      {
        name: "anime-04-painting",
        stage: "Sơn màu thủ công",
        prompt: (p) => `
          Painting workstation with magnifying lamp. Good task lighting.
          ${p.type} being hand painted with fine brushes.
          Small acrylic paint bottles arranged neatly. Painting handle holder.
          Detailed face painting work in progress. Clean workspace.
        `,
      },
      {
        name: "anime-05-display",
        stage: "Sản phẩm hoàn thiện",
        prompt: (p) => `
          Completed ${p.type} on clean display surface.
          ${p.features}. Vibrant hand-painted colors, smooth resin finish.
          Product photography setup - soft even lighting, white backdrop.
          Collectible quality figure, adorable and detailed.
        `,
      },
      {
        name: "anime-06-shipping",
        stage: "Đóng gói giao hàng",
        prompt: (p) => `
          Careful packing of the ${p.type} in foam-lined box.
          Figure secured with foam cutout protection.
          Small gift box with GHN label. Tissue paper wrapping.
          Delicate item packaging. Clean shipping area.
        `,
      },
    ],
  },
  ...VN_PROJECTS,
};

// ============================================
// IMAGE GENERATION FUNCTION WITH RETRY
// ============================================

// ============================================
// GENERATE PROJECT SEQUENCE
// Strategy: Generate finished product FIRST, then use as reference
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

  // Find the "finished" step (last step or one marked as finished)
  const finishedStep = project.steps.find(s => s.name.includes("finished")) || project.steps[project.steps.length - 1];
  const finishedPath = path.join(projectDir, `${finishedStep.name}.png`);

  // Step 1: Generate FINISHED product first (no reference)
  if (!fs.existsSync(finishedPath)) {
    console.log(`\n🎯 FIRST: Generating finished product...`);
    const prompt = finishedStep.prompt(project.product);
    await generateImage(prompt, finishedPath);
    await pause(10000);
  } else {
    console.log(`\n⏭️  Finished product exists: ${finishedStep.name}`);
  }

  // Step 2: Generate all OTHER steps using finished image as reference
  for (let i = 0; i < project.steps.length; i++) {
    const step = project.steps[i];

    // Skip the finished step (already generated)
    if (step.name === finishedStep.name) continue;

    const outputPath = path.join(projectDir, `${step.name}.png`);

    // Skip if exists
    if (fs.existsSync(outputPath)) {
      console.log(`\n⏭️  Skipping ${step.name} (exists)`);
      continue;
    }

    console.log(`\n📍 Step ${i + 1}/${project.steps.length}: ${step.stage}`);

    // Build prompt with reference instruction
    const basePrompt = step.prompt(project.product);
    const refPrompt = `Based on this finished product image, show an earlier stage: ${basePrompt}`;

    await generateImage(refPrompt, outputPath, { referenceImagePath: finishedPath });

    // Rate limiting - 10 second delay between requests
    await pause(10000);
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
  case "singles":
    (async () => {
      for (const item of MISSING_SINGLES) {
        const out = path.join(OUTPUT_DIR, "projects", item.dir, `${item.name}.png`);
        await generateImage(item.prompt, out);
        await pause(8000);
      }
      console.log("Singles complete.");
    })();
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
