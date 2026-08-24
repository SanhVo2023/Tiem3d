// Shared Gemini ("Nano Banana") image generation used by every generate-* script.
// Extracted so the API key lives in exactly one place and the retry/backoff
// behaviour doesn't drift between scripts.
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { requireEnv, optionalEnv } from "./env.mjs";

export const MODEL = optionalEnv("GEMINI_IMAGE_MODEL", "gemini-3.1-flash-image");

let client = null;
function getClient() {
  if (!client) client = new GoogleGenAI({ apiKey: requireEnv("GEMINI_API_KEY") });
  return client;
}

/**
 * Generate one image and write it to outputPath.
 * Skips work if the file already exists unless `overwrite` is set, so a failed
 * batch can be re-run without paying to regenerate everything.
 *
 * @returns {Promise<"created"|"skipped"|"failed">}
 */
export async function generateImage(prompt, outputPath, options = {}) {
  const {
    referenceImagePath = null,
    retries = 3,
    overwrite = false,
    model = MODEL,
    aspectRatio = null,
  } = options;

  const filename = path.basename(outputPath);

  if (!overwrite && fs.existsSync(outputPath)) {
    console.log(`   ⏭  Exists, skipping: ${filename}`);
    return "skipped";
  }

  console.log(`\n📸 Generating: ${filename}${aspectRatio ? ` (${aspectRatio})` : ""}`);
  if (referenceImagePath) {
    console.log(`   📎 Reference: ${path.basename(referenceImagePath)}`);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      let contents;
      if (referenceImagePath && fs.existsSync(referenceImagePath)) {
        const base64Image = fs.readFileSync(referenceImagePath).toString("base64");
        contents = [
          { text: prompt.trim().replace(/\s+/g, " ") },
          { inlineData: { mimeType: "image/png", data: base64Image } },
        ];
      } else {
        contents = prompt.trim().replace(/\s+/g, " ");
      }

      const response = await getClient().models.generateContent({
        model,
        contents,
        config: {
          responseModalities: ["TEXT", "IMAGE"],
          ...(aspectRatio ? { imageConfig: { aspectRatio } } : {}),
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, buffer);
          console.log(`   ✅ Saved: ${outputPath}`);
          return "created";
        }
      }

      console.log(`   ❌ No image in response`);
      return "failed";
    } catch (error) {
      const errorMsg = error.message || String(error);

      if (
        errorMsg.includes("429") ||
        errorMsg.includes("RESOURCE_EXHAUSTED") ||
        errorMsg.includes("quota")
      ) {
        const waitTime = attempt * 60;
        console.log(`   ⏳ Rate limited. Waiting ${waitTime}s (retry ${attempt}/${retries})...`);
        await new Promise((r) => setTimeout(r, waitTime * 1000));
        continue;
      }

      console.error(`   ❌ Error: ${errorMsg}`);
      if (attempt < retries) {
        console.log(`   🔄 Retrying (${attempt}/${retries})...`);
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  }

  return "failed";
}

/** Small pause between calls so a long batch doesn't trip the rate limiter. */
export const pause = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

/** Tally helper for batch runs. */
export function summarise(results, label) {
  const created = results.filter((r) => r === "created").length;
  const skipped = results.filter((r) => r === "skipped").length;
  const failed = results.filter((r) => r === "failed").length;
  console.log(
    `\n${"=".repeat(56)}\n${label}: ${created} created, ${skipped} skipped, ${failed} failed\n${"=".repeat(56)}`
  );
  return { created, skipped, failed };
}
