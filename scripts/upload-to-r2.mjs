import { S3Client, CreateBucketCommand, PutObjectCommand, ListObjectsV2Command, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { lookup } from 'mime-types';
import { requireEnv } from './lib/env.mjs';

// R2 Configuration - credentials come from .env.local (gitignored)
const ACCOUNT_ID = requireEnv('R2_ACCOUNT_ID');
const ACCESS_KEY_ID = requireEnv('R2_ACCESS_KEY_ID');
const SECRET_ACCESS_KEY = requireEnv('R2_SECRET_ACCESS_KEY');
const BUCKET_NAME = requireEnv('R2_BUCKET_NAME');

// R2 S3-compatible endpoint
const R2_ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Create S3 client for R2
const client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = join(dirPath, file);
    if (statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function createBucket() {
  try {
    console.log(`Creating bucket: ${BUCKET_NAME}...`);
    await client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`Bucket ${BUCKET_NAME} created successfully!`);
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou' || error.name === 'BucketAlreadyExists') {
      console.log(`Bucket ${BUCKET_NAME} already exists, continuing...`);
    } else {
      throw error;
    }
  }
}

async function setupCORS() {
  try {
    console.log('Setting up CORS...');
    await client.send(new PutBucketCorsCommand({
      Bucket: BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: [],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    }));
    console.log('CORS configured successfully!');
  } catch (error) {
    console.log('CORS setup note:', error.message);
  }
}

async function uploadFile(filePath, key) {
  const fileContent = readFileSync(filePath);
  const contentType = lookup(filePath) || 'application/octet-stream';

  try {
    await client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    console.log(`Uploaded: ${key}`);
    return true;
  } catch (error) {
    console.error(`Failed to upload ${key}:`, error.message);
    return false;
  }
}

async function main() {
  const assetsDir = join(process.cwd(), 'public', 'assets', 'generated');

  console.log('='.repeat(50));
  console.log('R2 CDN Upload Script');
  console.log('='.repeat(50));
  console.log(`Endpoint: ${R2_ENDPOINT}`);
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log(`Assets Dir: ${assetsDir}`);
  console.log('='.repeat(50));

  // Create bucket
  await createBucket();

  // Setup CORS
  await setupCORS();

  // Get all files
  const files = getAllFiles(assetsDir);
  console.log(`\nFound ${files.length} files to upload\n`);

  let uploaded = 0;
  let failed = 0;

  for (const filePath of files) {
    // Create key from relative path
    const relativePath = filePath.replace(join(process.cwd(), 'public'), '').replace(/\\/g, '/');
    const key = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;

    const success = await uploadFile(filePath, key);
    if (success) uploaded++;
    else failed++;
  }

  console.log('\n' + '='.repeat(50));
  console.log('Upload Complete!');
  console.log(`Uploaded: ${uploaded} files`);
  console.log(`Failed: ${failed} files`);
  console.log('='.repeat(50));

  // R2 public URL format
  console.log('\nPublic URL will be:');
  console.log(`https://pub-${ACCOUNT_ID}.r2.dev/${BUCKET_NAME}/assets/generated/...`);
  console.log('\nOr with custom domain, configure in Cloudflare Dashboard');
}

main().catch(console.error);
