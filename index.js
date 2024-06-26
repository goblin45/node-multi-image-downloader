const axios = require('axios');
const fs = require('fs');
const path = require('path');

const rename = require('./rename')

function getFilePath(url, downloadFolder) {
    let fileName = path.basename(url);
    let filePath = path.resolve(downloadFolder, fileName);
    if (fs.existsSync(filePath)) {
        fileName = rename(fileName)
        filePath = path.resolve(downloadFolder, fileName);
    }
    return filePath;
}

async function downloadImage(url, downloadFolder) {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });

        let filePath = getFilePath(url, downloadFolder);

        response.data.pipe(fs.createWriteStream(filePath));

        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                resolve(filePath);
            });

            response.data.on('error', (err) => {
                reject(err);
            });
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error);
        throw new Error(error);
    }
}

async function downloadImages(urls, downloadFolder) {
    if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder);
    }

    const downloadPromises = urls.map(url => downloadImage(url, downloadFolder));
    return Promise.all(downloadPromises);
}

// Example usage
const urls = [
    'https://static.inaturalist.org/photos/1312662/medium.jpg',
    'https://static.inaturalist.org/photos/2027968/medium.jpg',
    'https://static.inaturalist.org/photos/8966799/medium.jpg',
    'https://static.inaturalist.org/photos/4579782/medium.jpeg'
];

const downloadFolder = '../downloads';

downloadImages(urls, downloadFolder)
.then(() => {
    console.log('All images downloaded!');
})
.catch((err) => {
    console.error('Error downloading images:', err);
});


// module.exports = multiImageDownloader