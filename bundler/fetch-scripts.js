const axios = require('axios').default;
const fs = require('fs-extra');
const path = require('path');

const resources = [
    'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/markdown-it-texmath@1.0.0/texmath.min.js',
    'https://cdn.jsdelivr.net/npm/markdown-it-texmath@1.0.0/css/texmath.min.css',
    'https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js',
    'https://cdn.jsdelivr.net/npm/markdown-it-sub@2.0.0/dist/markdown-it-sub.min.js',
    'https://cdn.jsdelivr.net/npm/markdown-it-sup@2.0.0/dist/markdown-it-sup.min.js',
    'https://cdn.jsdelivr.net/npm/markdown-it-footnote@4.0.0/dist/markdown-it-footnote.min.js'
];

async function fetchAndSave(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filename = path.basename(url);
        const filePath = path.join(__dirname, 'src', filename);
        await fs.outputFile(filePath, response.data);
        console.log(`Successfully saved ${filename}`);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
    }
}

async function fetchAllResources() {
    await fs.ensureDir(path.join(__dirname, 'src'));
    await Promise.all(resources.map(fetchAndSave));
}

fetchAllResources().then(() => {
    console.log('All resources have been fetched and saved.');
}).catch((error) => {
    console.error('An error occurred:', error);
});
