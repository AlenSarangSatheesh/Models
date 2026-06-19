const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/pc/.gemini/antigravity-ide/brain/23200725-d2c1-4f7b-93c9-fdcf8bb6c568';
const destDir = path.join(__dirname, 'assets');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const files = [
    'honey_jar_hero_1781891348928.png',
    'honey_drops_scattered_1781891386961.png',
    'honey_dipper_about_1781891376579.png'
];

files.forEach(file => {
    const srcFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Successfully copied ${file} to assets/`);
    } else {
        console.error(`File not found: ${srcFile}`);
    }
});
