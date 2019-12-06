const pool = require('mysql2/promise').createPool({host: server.config.db_host, user: server.config.db_username, password: server.config.db_password, database: server.config.db_name, connectionLimit: server.config.db_connectionLimit});

pool.getConnection().then(conn => {
    console.log(`${server.chalk.green('[Database]')} Connected successfully.`);
    server.loadModules();
    conn.release();
    return;
}).catch(err => {
    console.log(`Err: ${err}`);
    switch(err.code){
        case 'PROTOCOL_CONNECTION_LOST':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: Database connection was closed.')}`);
            break;
        case 'ER_CON_COUNT_ERROR':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: Database has too many connections.')}`);
            break;
        case 'ECONNREFUSED':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: Check your connection details (packages/swift-core/database.js) or make sure your MySQL server is running.')}`);
            break;
        case 'ER_BAD_DB_ERROR':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: The database name you\'ve entered does not exist.')}`);
            break;
        case 'ER_ACCESS_DENIED_ERROR':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: Check your MySQL username and password and make sure they\'re correct.')}`);
            break;
        case 'ENOENT':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: There is no internet connection. Check your connection and try again.')}`);
            break;
        case 'ENOTFOUND':
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: Database host not found.')}`);
            break;
        default:
            console.log(`${server.chalk.green('[Database]')} ${server.chalk.red('Error: ' + err.code)}`);
            break;
        }
});

module.exports = pool;