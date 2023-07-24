const fs = require('fs');
import csv from 'csv-parser';
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
import csvWriter from 'csv-write-stream';

const csvFilePath = 'data.csv';

export const readCsvData = () => {
    const data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });
};

export async function readCsvDataById(id) {
    const data = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });
    console.log('id', data)
    console.log('data', data)
    return data.filter((item) => item.id === id)[0];
};


export async function getAllIds() {
    const data = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });

    return data.map((item) => item.id);
};


// Function to append data to the CSV file
export const appendCsvData = (title, content) => {
    let writer;
    if (!fs.existsSync(csvFilePath))
        writer = csvWriter({ headers: ["id", "date", "title", "content"] });
    else
        writer = csvWriter({ sendHeaders: false });

    const currentTimestamp = Date.now();

    const today = new Date();
    const dateFormatted = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    writer.pipe(fs.createWriteStream(csvFilePath, { flags: 'a' }));
    writer.write({
        id: currentTimestamp,
        date: dateFormatted,
        title: title,
        content: content
    });
    writer.end();
};

export async function deleteById(id) {


    const data = await readCsvData();

    const filteredData = data.filter(row => row.id !== id);

    let writer = csvWriter({ headers: ["id", "date", "title", "content"] });
    writer.pipe(fs.createWriteStream(csvFilePath));
    filteredData.map(row => {
        writer.write({
            id: row.id,
            date: row.date,
            title: row.title,
            content: row.content
        });
    })
    writer.end();
}