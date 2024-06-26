const fs = require('fs');
const csv = require('csv-parser');

function extractColumnDataFromCsv(filePath, columnName, startRow=0, endRow=-1) {
    return new Promise((resolve, reject) => {
        const results = [];
        let currentRow = 0;

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            currentRow++;
            if (currentRow >= startRow && (endRow === -1 || currentRow <= endRow)) {
                results.push(row[columnName]);
            }
        })
        .on('end', () => {
            resolve(results);
        })
        .on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = extractColumnDataFromCsv