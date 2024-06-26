const axios = require('axios');
const fs = require('fs');
const path = require('path');
const rename = require('./rename')
const extractColumnDataFromCsv = require('./csv-extractor');

function getFilePath(url, downloadFolder) {
    let fileName = path.basename(url);
    let filePath = path.resolve(downloadFolder, fileName);
    while (fs.existsSync(filePath)) {
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

    urls = urls.filter((url) => url.toString().startsWith('http') || url.toString().startsWith('https') || url.toString().startsWith('www'));

    const downloadPromises = urls.map(url => downloadImage(url, downloadFolder));
    return Promise.all(downloadPromises);
}

const downloadFolder = 'downloads';

async function multiImageDownloader({
    urls=[],
    targetFolder=downloadFolder,
    // args used for csv
    csv="", 
    startRow,
    endRow,
    columnName="", 
}) {
    let source = urls
    if (csv) {
        if (!csv.endsWith('.csv')) {
            console.error('Error: CSV file must have .csv extension');
            return;
        }
        await extractColumnDataFromCsv(csv, columnName, startRow, endRow)
        .then((results) => {
            source = results
        })
        .catch((error) => {
            console.error('Error extracting column data:', error);
        });
    }
    downloadImages(source, targetFolder)
    .then(() => {
        console.log('All images downloaded!');
    })
    .catch((err) => {
        console.error('Error downloading images:', err);
    });
}

module.exports = multiImageDownloader