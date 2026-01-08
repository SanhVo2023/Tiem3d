import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

// API Key
const API_KEY = "AIzaSyCccyfS2aUkkdrXSJnzO7hk-z3CaeZaKmI";
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Models
const MODEL_PREMIUM = "gemini-2.5-flash-image"; // For all images (this works)
const MODEL_STANDARD = "gemini-2.5-flash-image"; // For all images

// Equipment Reference
const EQUIPMENT = {
  fdm: "Bambu Lab A1 Combo 3D printer with AMS system",
  resin: "Elegoo Saturn 4 Ultra 12K resin printer",
  industrial: "Large format industrial FDM printer",
};

// Unified Style - Classy Casual Vietnamese Small Business
const STYLE = `
Clean casual photography, smartphone quality.
Soft natural daylight from window, clean white or light wood desk.
Minimal props, tidy workspace. Close-up focus, shallow depth of field.
Warm natural tones, Instagram-worthy but authentic.
Small business owner aesthetic - neat, proud of their work.
Simple clean background. Photorealistic, modern Vietnamese style.
`;

// ============================================
// COMPLETE IMAGE LIBRARY
// ============================================
const IMAGES = {
  // ==========================================
  // HERO IMAGES - Use PREMIUM model
  // ==========================================
  hero: {
    model: MODEL_PREMIUM,
    images: [
      {
        name: "hero-main",
        ratio: "16:9",
        prompt: `Wide shot of a clean, organized 3D printing workshop with multiple ${EQUIPMENT.fdm} printers running. Warm natural light from large windows. A person checking on prints. Professional but approachable atmosphere. ${STYLE}`,
      },
      {
        name: "hero-detail",
        ratio: "16:9",
        prompt: `Close-up of a ${EQUIPMENT.fdm} printer mid-print, extruding orange filament. Sharp focus on the nozzle and fresh layers. Clean printer, tidy desk. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // WORKSPACE / EQUIPMENT
  // ==========================================
  workspace: {
    model: MODEL_STANDARD,
    images: [
      {
        name: "workspace-fdm-farm",
        ratio: "16:9",
        prompt: `Six ${EQUIPMENT.fdm} printers arranged neatly on white shelving, all running simultaneously. Clean organized workshop. Natural daylight. ${STYLE}`,
      },
      {
        name: "workspace-resin-station",
        ratio: "4:3",
        prompt: `Two ${EQUIPMENT.resin} printers on a clean white workbench. Purple UV glow visible. Wash and cure station nearby. Tidy setup. ${STYLE}`,
      },
      {
        name: "workspace-industrial",
        ratio: "4:3",
        prompt: `Large format industrial FDM printer printing a big architectural model. Clean industrial space. ${STYLE}`,
      },
      {
        name: "printer-bambu-closeup",
        ratio: "1:1",
        prompt: `Close-up of ${EQUIPMENT.fdm} with AMS multi-color system visible. Colorful filament spools loaded. Clean modern design. ${STYLE}`,
      },
      {
        name: "printer-resin-closeup",
        ratio: "1:1",
        prompt: `Close-up of ${EQUIPMENT.resin} screen showing print progress. Purple UV light glowing. Clean setup. ${STYLE}`,
      },
      {
        name: "workspace-overview",
        ratio: "16:9",
        prompt: `Overview of small Vietnamese 3D printing workshop. Multiple printers, clean desk with laptop, finished prints on display shelf. Warm inviting space. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // PROJECT JOURNEYS - Idea to Product
  // ==========================================
  projects: {
    model: MODEL_STANDARD,
    images: [
      // PROJECT 1: Custom Phone Stand
      {
        name: "project1-01-sketch",
        ratio: "1:1",
        prompt: `Hand-drawn sketch of a phone stand design on white paper. Pencil and eraser nearby. Clean desk. Natural light. ${STYLE}`,
      },
      {
        name: "project1-02-cad",
        ratio: "4:3",
        prompt: `Laptop screen showing 3D CAD model of a phone stand in Fusion 360. Clean desk setup. ${STYLE}`,
      },
      {
        name: "project1-03-printing",
        ratio: "1:1",
        prompt: `${EQUIPMENT.fdm} printing an orange phone stand, mid-print. Clean printer bed. ${STYLE}`,
      },
      {
        name: "project1-04-finished",
        ratio: "1:1",
        prompt: `Finished 3D printed phone stand in orange, with a phone placed on it. Clean white desk. ${STYLE}`,
      },

      // PROJECT 2: Anime Figure
      {
        name: "project2-01-reference",
        ratio: "1:1",
        prompt: `Tablet showing anime character reference image. Clean desk with stylus. ${STYLE}`,
      },
      {
        name: "project2-02-sculpt",
        ratio: "4:3",
        prompt: `Computer screen showing ZBrush with anime figure being sculpted. Dark UI, detailed model. ${STYLE}`,
      },
      {
        name: "project2-03-printing",
        ratio: "1:1",
        prompt: `${EQUIPMENT.resin} with anime figure being printed, visible through resin vat. Purple glow. ${STYLE}`,
      },
      {
        name: "project2-04-supports",
        ratio: "1:1",
        prompt: `Hands carefully removing support material from gray resin anime figure. Clean cutting mat. ${STYLE}`,
      },
      {
        name: "project2-05-finished",
        ratio: "1:1",
        prompt: `Finished gray resin anime figure on display stand. Beautiful detail visible. Clean background. ${STYLE}`,
      },

      // PROJECT 3: Mechanical Part
      {
        name: "project3-01-drawing",
        ratio: "4:3",
        prompt: `Engineering drawing of a mechanical bracket with dimensions. Printed on paper, on clean desk. ${STYLE}`,
      },
      {
        name: "project3-02-cad",
        ratio: "4:3",
        prompt: `Fusion 360 showing mechanical bracket with engineering dimensions. Professional CAD view. ${STYLE}`,
      },
      {
        name: "project3-03-printing",
        ratio: "1:1",
        prompt: `${EQUIPMENT.fdm} printing black PETG mechanical bracket. Clean print in progress. ${STYLE}`,
      },
      {
        name: "project3-04-testing",
        ratio: "1:1",
        prompt: `Hands holding finished black 3D printed bracket next to the original part it replaces. Comparison shot. ${STYLE}`,
      },

      // PROJECT 4: Cosplay Helmet
      {
        name: "project4-01-ref",
        ratio: "1:1",
        prompt: `Reference images of Iron Man helmet printed and pinned to wall. Planning stage. ${STYLE}`,
      },
      {
        name: "project4-02-printing",
        ratio: "4:3",
        prompt: `Large helmet piece being printed on industrial FDM printer. Big print bed. ${STYLE}`,
      },
      {
        name: "project4-03-assembly",
        ratio: "1:1",
        prompt: `Multiple 3D printed helmet pieces laid out on table, ready for assembly. Gray PLA parts. ${STYLE}`,
      },
      {
        name: "project4-04-sanding",
        ratio: "1:1",
        prompt: `Hands sanding a 3D printed helmet piece smooth. Sandpaper and dust visible. ${STYLE}`,
      },
      {
        name: "project4-05-painting",
        ratio: "1:1",
        prompt: `Airbrush painting red metallic paint on Iron Man helmet. Paint booth setup. ${STYLE}`,
      },
      {
        name: "project4-06-finished",
        ratio: "1:1",
        prompt: `Finished Iron Man helmet in metallic red and gold, LED eyes glowing. Display shot. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // PRODUCTS / SHOWCASE
  // ==========================================
  products: {
    model: MODEL_STANDARD,
    images: [
      // Figures
      {
        name: "product-figure-01",
        ratio: "3:4",
        prompt: `Gray resin 3D printed anime figure, unpainted, showing fine detail. Clean white background. ${STYLE}`,
      },
      {
        name: "product-figure-02",
        ratio: "3:4",
        prompt: `Detailed chibi character figure 3D printed in gray resin. Cute pose. Clean background. ${STYLE}`,
      },
      {
        name: "product-figure-03",
        ratio: "3:4",
        prompt: `3D printed mecha robot figure in gray, dynamic pose. Visible panel lines and details. ${STYLE}`,
      },
      // Functional
      {
        name: "product-gear",
        ratio: "1:1",
        prompt: `Functional 3D printed planetary gear set in colorful PETG. Assembled and working. Clean desk. ${STYLE}`,
      },
      {
        name: "product-enclosure",
        ratio: "1:1",
        prompt: `Custom 3D printed electronics enclosure in black, Raspberry Pi visible inside. Clean product shot. ${STYLE}`,
      },
      {
        name: "product-bracket",
        ratio: "1:1",
        prompt: `3D printed mounting bracket in black PETG, industrial quality. Clean background. ${STYLE}`,
      },
      // Art & Decor
      {
        name: "product-lamp",
        ratio: "3:4",
        prompt: `3D printed geometric lamp shade glowing warmly. Voronoi pattern casting shadows. ${STYLE}`,
      },
      {
        name: "product-vase",
        ratio: "3:4",
        prompt: `Spiral 3D printed vase in gradient orange-white, modern design. Single flower inside. ${STYLE}`,
      },
      {
        name: "product-sculpture",
        ratio: "1:1",
        prompt: `Abstract geometric 3D printed sculpture in white PLA. Modern art piece. ${STYLE}`,
      },
      // Dental/Medical
      {
        name: "product-dental",
        ratio: "4:3",
        prompt: `3D printed dental model in beige resin, showing teeth detail. Clinical but warm lighting. ${STYLE}`,
      },
      // Miniatures
      {
        name: "product-mini-01",
        ratio: "1:1",
        prompt: `Tiny detailed D&D miniature figure printed in gray resin. Coin for scale. ${STYLE}`,
      },
      {
        name: "product-mini-02",
        ratio: "1:1",
        prompt: `Set of 3D printed tabletop game miniatures arranged together. Detailed fantasy characters. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // PROCESS STEPS
  // ==========================================
  process: {
    model: MODEL_STANDARD,
    images: [
      {
        name: "process-upload",
        ratio: "1:1",
        prompt: `Smartphone showing file upload screen, finger tapping upload button. Clean simple shot. ${STYLE}`,
      },
      {
        name: "process-quote",
        ratio: "1:1",
        prompt: `Laptop showing quote/pricing spreadsheet for 3D printing order. Professional but simple. ${STYLE}`,
      },
      {
        name: "process-slicing",
        ratio: "4:3",
        prompt: `Computer screen showing PrusaSlicer with model being sliced, layer preview visible. ${STYLE}`,
      },
      {
        name: "process-printing",
        ratio: "1:1",
        prompt: `Close-up of 3D printer nozzle depositing material, layers visible. Sharp focus. ${STYLE}`,
      },
      {
        name: "process-quality",
        ratio: "1:1",
        prompt: `Hands using digital caliper to measure 3D printed part. Quality control. ${STYLE}`,
      },
      {
        name: "process-packing",
        ratio: "1:1",
        prompt: `Hands carefully packing 3D printed product in bubble wrap, shipping box ready. ${STYLE}`,
      },
      {
        name: "process-shipping",
        ratio: "1:1",
        prompt: `Packaged box with shipping label, ready for delivery. Clean desk. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // ZALO CHAT SCREENS
  // ==========================================
  zalo: {
    model: MODEL_STANDARD,
    images: [
      {
        name: "zalo-inquiry",
        ratio: "9:16",
        prompt: `Smartphone screenshot of Zalo chat. Customer sends photo asking "Anh ơi in cái này được không?". Vietnamese chat interface, blue theme. ${STYLE}`,
      },
      {
        name: "zalo-quote",
        ratio: "9:16",
        prompt: `Zalo chat screenshot showing shop sending price quote "150k, 2 ngày xong ạ" with thumbs up reaction. Vietnamese. ${STYLE}`,
      },
      {
        name: "zalo-progress",
        ratio: "9:16",
        prompt: `Zalo chat with shop sending progress photo of print "Đang in cho anh nè 🔥". Customer replies with heart emoji. Vietnamese. ${STYLE}`,
      },
      {
        name: "zalo-done",
        ratio: "9:16",
        prompt: `Zalo chat showing finished product photo with message "Xong rồi anh! Ship luôn nha". Happy reactions. Vietnamese. ${STYLE}`,
      },
      {
        name: "zalo-review",
        ratio: "9:16",
        prompt: `Zalo chat with customer sending photo of received product "Đẹp quá anh ơi! 5 sao" with star emojis. Vietnamese. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // SERVICES PAGES
  // ==========================================
  services: {
    model: MODEL_STANDARD,
    images: [
      // FDM Service
      {
        name: "service-fdm-hero",
        ratio: "16:9",
        prompt: `${EQUIPMENT.fdm} printing colorful multi-part object using AMS. Clean workshop setting. ${STYLE}`,
      },
      {
        name: "service-fdm-materials",
        ratio: "4:3",
        prompt: `Various FDM filament spools (PLA, PETG, ABS) in different colors arranged neatly. ${STYLE}`,
      },
      {
        name: "service-fdm-samples",
        ratio: "4:3",
        prompt: `Various FDM printed samples showing different materials and colors. Clean display. ${STYLE}`,
      },
      // Resin Service
      {
        name: "service-resin-hero",
        ratio: "16:9",
        prompt: `${EQUIPMENT.resin} with build plate rising, detailed prints visible. Purple UV glow. ${STYLE}`,
      },
      {
        name: "service-resin-detail",
        ratio: "1:1",
        prompt: `Extreme close-up of resin print showing microscopic detail, smooth surface. ${STYLE}`,
      },
      {
        name: "service-resin-wash",
        ratio: "4:3",
        prompt: `Resin wash and cure station with prints being processed. Clean setup. ${STYLE}`,
      },
      // Design Service
      {
        name: "service-design-hero",
        ratio: "16:9",
        prompt: `Designer working on 3D model in Blender on ultrawide monitor. Clean desk setup. ${STYLE}`,
      },
      {
        name: "service-design-tablet",
        ratio: "4:3",
        prompt: `Hands sketching on drawing tablet, 3D software on screen. Creative workspace. ${STYLE}`,
      },
      // Finishing Service
      {
        name: "service-finish-hero",
        ratio: "16:9",
        prompt: `Workbench with 3D prints in various finishing stages - raw, sanded, primed, painted. ${STYLE}`,
      },
      {
        name: "service-finish-paint",
        ratio: "1:1",
        prompt: `Airbrush applying paint to 3D printed figure. Fine detail work. ${STYLE}`,
      },
      // Batch Production
      {
        name: "service-batch-hero",
        ratio: "16:9",
        prompt: `Multiple identical 3D printed parts arranged in grid. Mass production showcase. ${STYLE}`,
      },
      {
        name: "service-batch-farm",
        ratio: "4:3",
        prompt: `Print farm with all printers running same object. Production efficiency. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // BACKGROUNDS & ASSETS
  // ==========================================
  backgrounds: {
    model: MODEL_STANDARD,
    images: [
      {
        name: "bg-abstract-layers",
        ratio: "16:9",
        prompt: `Abstract 3D print layer lines pattern, orange and white, blurred background texture. Minimal. ${STYLE}`,
      },
      {
        name: "bg-filament",
        ratio: "16:9",
        prompt: `Close-up of orange 3D printer filament coiled, shallow depth of field, abstract texture. ${STYLE}`,
      },
      {
        name: "bg-grid",
        ratio: "16:9",
        prompt: `3D printer bed grid pattern, clean geometric lines, subtle abstract background. ${STYLE}`,
      },
      {
        name: "bg-resin-glow",
        ratio: "16:9",
        prompt: `Abstract purple UV light glow through resin, ethereal background texture. ${STYLE}`,
      },
      {
        name: "texture-layers",
        ratio: "1:1",
        prompt: `Macro shot of 3D print layer lines texture, abstract pattern, can tile. ${STYLE}`,
      },
    ],
  },

  // ==========================================
  // PORTFOLIO GALLERY
  // ==========================================
  portfolio: {
    model: MODEL_STANDARD,
    images: [
      {
        name: "portfolio-01",
        ratio: "1:1",
        prompt: `Detailed dragon figurine 3D printed in gray resin. Epic pose. ${STYLE}`,
      },
      {
        name: "portfolio-02",
        ratio: "1:1",
        prompt: `Custom 3D printed drone frame in carbon-fiber PETG. Technical piece. ${STYLE}`,
      },
      {
        name: "portfolio-03",
        ratio: "1:1",
        prompt: `Architectural scale model 3D printed in white PLA. Building miniature. ${STYLE}`,
      },
      {
        name: "portfolio-04",
        ratio: "1:1",
        prompt: `Articulated 3D printed dragon toy, flexible joints. Playful design. ${STYLE}`,
      },
      {
        name: "portfolio-05",
        ratio: "1:1",
        prompt: `Custom 3D printed keycaps set for mechanical keyboard. Colorful. ${STYLE}`,
      },
      {
        name: "portfolio-06",
        ratio: "1:1",
        prompt: `3D printed prosthetic hand prototype in gray. Medical innovation. ${STYLE}`,
      },
      {
        name: "portfolio-07",
        ratio: "1:1",
        prompt: `Detailed castle diorama 3D printed for tabletop gaming. Fantasy setting. ${STYLE}`,
      },
      {
        name: "portfolio-08",
        ratio: "1:1",
        prompt: `Custom car dashboard mount 3D printed in black. Functional design. ${STYLE}`,
      },
    ],
  },
};

// Output directory
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "generated");

// ============================================
// IMAGE GENERATION FUNCTION
// ============================================
async function generateImage(prompt, aspectRatio, outputPath, model) {
  const filename = path.basename(outputPath);
  console.log(`\n[${model === MODEL_PREMIUM ? "PREMIUM" : "STANDARD"}] ${filename}`);
  console.log(`Ratio: ${aspectRatio}`);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");

        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);
        console.log(`✓ Saved: ${outputPath}`);
        return true;
      }
    }

    console.log("✗ No image in response");
    return false;
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return false;
  }
}

// ============================================
// GENERATE BY CATEGORY
// ============================================
async function generateCategory(categoryName) {
  const category = IMAGES[categoryName];
  if (!category) {
    console.log(`Category "${categoryName}" not found`);
    return;
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`GENERATING: ${categoryName.toUpperCase()}`);
  console.log(`${"=".repeat(50)}`);

  const categoryDir = path.join(OUTPUT_DIR, categoryName);

  for (const img of category.images) {
    const outputPath = path.join(categoryDir, `${img.name}.png`);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`\n⏭ Skipping ${img.name} (already exists)`);
      continue;
    }

    await generateImage(img.prompt, img.ratio, outputPath, category.model);

    // Rate limiting - longer delay for premium model
    const delay = category.model === MODEL_PREMIUM ? 5000 : 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

// ============================================
// GENERATE ALL
// ============================================
async function generateAll() {
  console.log("=".repeat(50));
  console.log("GENERATING ALL WEBSITE IMAGES");
  console.log("=".repeat(50));
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Premium model: ${MODEL_PREMIUM}`);
  console.log(`Standard model: ${MODEL_STANDARD}`);

  const categories = Object.keys(IMAGES);
  let totalImages = 0;

  for (const cat of categories) {
    totalImages += IMAGES[cat].images.length;
  }

  console.log(`\nTotal images to generate: ${totalImages}`);
  console.log(`Categories: ${categories.join(", ")}`);

  for (const category of categories) {
    await generateCategory(category);
  }

  console.log("\n" + "=".repeat(50));
  console.log("ALL DONE!");
  console.log("=".repeat(50));
}

// ============================================
// GENERATE SAMPLES
// ============================================
async function generateSamples() {
  console.log("=".repeat(50));
  console.log("GENERATING SAMPLES");
  console.log("=".repeat(50));

  const samplesDir = path.join(OUTPUT_DIR, "samples");
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
  }

  const samples = [
    {
      name: "sample-closeup-print",
      ratio: "1:1",
      prompt: `Close-up of a detailed gray resin 3D printed anime figure on a clean white desk. Soft natural window light. Simple composition. Shallow depth of field. ${STYLE}`,
      model: MODEL_STANDARD,
    },
    {
      name: "sample-hands-working",
      ratio: "1:1",
      prompt: `Close-up of hands carefully holding a freshly printed 3D miniature figure. Clean wooden desk. Soft natural lighting. ${STYLE}`,
      model: MODEL_STANDARD,
    },
    {
      name: "sample-printer",
      ratio: "4:3",
      prompt: `A ${EQUIPMENT.fdm} mid-print on a tidy desk. Clean setup. Soft natural daylight. Warm atmosphere. ${STYLE}`,
      model: MODEL_STANDARD,
    },
  ];

  for (const sample of samples) {
    const outputPath = path.join(samplesDir, `${sample.name}.png`);
    await generateImage(sample.prompt, sample.ratio, outputPath, sample.model);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n✓ Samples complete!");
}

// ============================================
// CLI
// ============================================
const args = process.argv.slice(2);
const command = args[0] || "help";

switch (command) {
  case "samples":
    generateSamples();
    break;
  case "all":
    generateAll();
    break;
  case "category":
    if (args[1]) {
      generateCategory(args[1]);
    } else {
      console.log("Usage: node generate-images.mjs category <name>");
      console.log("Categories:", Object.keys(IMAGES).join(", "));
    }
    break;
  case "list":
    console.log("Categories and image counts:");
    for (const [name, cat] of Object.entries(IMAGES)) {
      console.log(`  ${name}: ${cat.images.length} images (${cat.model === MODEL_PREMIUM ? "PREMIUM" : "standard"})`);
    }
    break;
  default:
    console.log("Usage:");
    console.log("  node generate-images.mjs samples         - Generate sample images");
    console.log("  node generate-images.mjs all             - Generate ALL images");
    console.log("  node generate-images.mjs category <name> - Generate specific category");
    console.log("  node generate-images.mjs list            - List all categories");
    console.log("\nCategories:", Object.keys(IMAGES).join(", "));
}
