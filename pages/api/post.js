
const fs = require('fs');
// import { appendCsvData, deleteById } from '../../lib/csv-data';

import { insertData,deleteData } from '../../lib/mysql_dao';

function writeTextToFile(title, content) {
    // Get today's date
    const today = new Date();
    const dateFormatted = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const currentTimestamp = Date.now();

    // Create the text to be written to the file
    const text = `---\ntitle: '${title}'\ndate: '${dateFormatted}'\n---\n${content.replace('\n', '\n\n')}`;

    // Write the text to the file
    fs.appendFile(`posts/post${currentTimestamp}.md`, text, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Text written to file successfully!');
        }
    });
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, content } = req.body;
        // writeTextToFile(title, content);
        // appendCsvData(title, content);
        await insertData(title, content);

        return res.status(200).json({ message: 'Form submitted successfully!' });
    } else if (req.method === 'DELETE') {
        // const { id } = req.body;
        // const filePath = `posts/${id}.md`;
        // console.log(filePath);
        // fs.unlink(filePath, (err) => {
        //     if (err) {
        //         console.error('Error deleting the file:', err);
        //     } else {
        //         console.log('File deleted successfully.');
        //     }
        // });

        const { id } = req.body;
        // deleteById(id);
        await deleteData(id);
        return res.status(202).json({});
    }
    else {
        res.status(405).end();
    }
}