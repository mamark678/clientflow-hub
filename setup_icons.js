const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const targetDir = path.join(__dirname, 'clientflow-extension', 'icons');
const sizes = ['16', '48', '128'];

if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found: ${sourcePath}`);
    process.exit(1);
}

if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
}

sizes.forEach(size => {
    const dest = path.join(targetDir, `icon${size}.png`);
    fs.copyFileSync(sourcePath, dest);
    console.log(`Copied to ${dest}`);
});

console.log('Icon setup complete.');
