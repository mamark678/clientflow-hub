const fs = require('fs');
const path = require('path');

// Hardcoded paths to avoid shell argument parsing issues
const sourcePath = String.raw`C:\Users\andre\.gemini\antigravity\brain\4af058b7-ba2b-4240-a81a-aebef1d368ec\clientflow_logo_new_1768114089059.png`;
const extensionDir = path.join(__dirname, 'clientflow-extension');
const iconsDir = path.join(extensionDir, 'icons');

console.log(`Source: ${sourcePath}`);
console.log(`Target Dir: ${iconsDir}`);

try {
    if (!fs.existsSync(sourcePath)) {
        console.error('ERROR: Source file does not exist!');
        process.exit(1);
    }

    if (!fs.existsSync(iconsDir)) {
        console.log('Creating icons directory...');
        fs.mkdirSync(iconsDir, { recursive: true });
    }

    const sizes = ['16', '48', '128'];
    sizes.forEach(size => {
        const dest = path.join(iconsDir, `icon${size}.png`);
        fs.copyFileSync(sourcePath, dest);
        console.log(`SUCCESS: Copied to ${dest}`);
    });

} catch (err) {
    console.error('FATAL ERROR:', err);
}
