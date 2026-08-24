// Loads secrets from .env.local (gitignored) so no key is ever hardcoded in a
// tracked script. Uses Node's built-in env-file loader — no dependency needed.
import * as fs from "node:fs";
import * as path from "node:path";

const ENV_FILE = path.join(process.cwd(), ".env.local");

let loaded = false;

export function loadEnv() {
  if (loaded) return;
  loaded = true;

  if (!fs.existsSync(ENV_FILE)) {
    console.error(
      `\nMissing .env.local\n\n` +
        `Copy .env.local.example to .env.local and fill in your keys:\n` +
        `  cp .env.local.example .env.local\n`
    );
    process.exit(1);
  }

  process.loadEnvFile(ENV_FILE);
}

/**
 * Read a required variable, exiting with a useful message rather than sending
 * `undefined` to an API and getting an opaque 400 back.
 */
export function requireEnv(name) {
  loadEnv();
  const value = process.env[name];
  if (!value || value.startsWith("your_")) {
    console.error(`\nMissing ${name} in .env.local\n`);
    process.exit(1);
  }
  return value;
}

export function optionalEnv(name, fallback) {
  loadEnv();
  return process.env[name] || fallback;
}
