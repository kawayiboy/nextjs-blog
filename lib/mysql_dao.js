import mysql from 'mysql2/promise'


let connPool = undefined;
async function connect(){
    if(connPool)
        return connPool;
    
    connPool = await mysql.createPool({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9635004',
        password: 'lWA2egDb6f',
        database: 'sql9635004',
    });
    return connPool;
} 

// const pool = mysql.createPool({
//     host: 'sql9.freemysqlhosting.net',
//     user: 'sql9635004',
//     password: 'lWA2egDb6f',
//     database: 'sql9635004',
//   });

function formatDate(day) {
    return `${day.getFullYear()}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`
}

export async function insertData(title, content) {
    const pool = await connect();
    const dateFormatted = formatDate(new Date());

    const query = `INSERT INTO nextjspost(title, content, create_ts) VALUES('${title}', '${content}', '${dateFormatted}')`;
    return pool.execute(query)
        .then(([rows]) => {
            console.log('Data inserted successfully:', rows);
        })
        .catch(error => {
            throw error;
        });
};



// SELECT (QUERY) operation
export async function getData() {
    const pool = await connect();

    const query = 'SELECT * FROM nextjspost';
    const [results, fields] = await pool.execute(query);
    console.log(results, results);

    return results.map(row => {
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            date: formatDate(new Date(row.create_ts.toString()))
        };
    });

};

// FIND operation with a specific condition
export async function findDataById(id) {
    const pool = await connect();

    const query = `SELECT * FROM nextjspost WHERE id=${id}`;
    const [results, fields] = await pool.execute(query);
    console.log('findDataById', results)
    return results.map(row => {
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            date: formatDate(new Date(row.create_ts.toString()))
        };
    })[0];
};

export async function getAllIds() {
    const pool = await connect();

    const query = `SELECT id FROM nextjspost`;
    let [results, fields] = await pool.execute(query);
    results = results.map(item => ({ id: item.id.toString() }))
    console.log('getAllIds', results)
    return results;
};

// DELETE operation
export async function deleteData(id) {
    const pool = await connect();

    const query = `DELETE FROM nextjspost WHERE id=${id}`;
    return pool.execute(query)
        .then(([rows]) => {
            console.log('Data deleted successfully:', rows);
        })
        .catch(error => {
            throw error;
        });
};