#!/usr/bin/env node

const fs = require('fs');

const RELEASE_MODE = !!process.env.RELEASE_MODE;

if (!RELEASE_MODE) {
  console.log('Run `npm run release` to publish the package');
  process.exit(1);
}

console.log('🔍 检查构建文件...');

// 检查必要的构建文件是否存在
const requiredFiles = ['dist/cjs/index.js', 'dist/esm/index.js', 'dist/index.d.ts'];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

if (missingFiles.length > 0) {
  console.error('❌ 缺少以下构建文件:');
  missingFiles.forEach((file) => console.error(`  - ${file}`));
  console.error('\n请先运行 npm run build');
  process.exit(1);
}

console.log('✅ 所有构建文件都存在');

// 检查package.json中的入口点
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const entryPoints = [packageJson.main, packageJson.module, packageJson.types, packageJson.unpkg, packageJson.jsdelivr].filter(Boolean);

console.log('📦 检查入口点文件...');
const missingEntryPoints = entryPoints.filter((file) => !fs.existsSync(file));

if (missingEntryPoints.length > 0) {
  console.error('❌ 缺少以下入口点文件:');
  missingEntryPoints.forEach((file) => console.error(`  - ${file}`));
  process.exit(1);
}

console.log('✅ 所有入口点文件都存在');
console.log('🚀 准备发布...');
