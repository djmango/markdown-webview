const fs = require('fs-extra');
const path = require('path');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
fs.ensureDirSync(distDir);

// Function to get all files in a directory
function getFiles(dir) {
    return fs.readdirSync(dir).filter(file => fs.statSync(path.join(dir, file)).isFile());
}

// Get all files
const allFiles = getFiles(srcDir);
const jsFiles = allFiles.filter(file => file.endsWith('.js'));
const cssFiles = allFiles.filter(file => file.endsWith('.css'));

// Concatenate and minify JS files
const jsContent = jsFiles.map(file => fs.readFileSync(path.join(srcDir, file), 'utf8')).join('\n');
const minifiedJs = UglifyJS.minify(jsContent).code;
fs.writeFileSync(path.join(distDir, 'bundle.js'), minifiedJs);

// Concatenate and minify CSS files
const cssContent = cssFiles.map(file => fs.readFileSync(path.join(srcDir, file), 'utf8')).join('\n');
const minifiedCss = new CleanCSS().minify(cssContent).styles;
fs.writeFileSync(path.join(distDir, 'styles.css'), minifiedCss);

console.log('Build completed successfully!');
