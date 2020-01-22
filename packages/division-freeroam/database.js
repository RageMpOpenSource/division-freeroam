const pool = require('mysql2/promise').createPool({host: server.config.db_host, user: server.config.db_username, password: server.config.db_password, database: server.config.db_name, connectionLimit: server.config.db_connectionLimit, multipleStatements: true});

pool.getConnection().then(conn => {
    console.log(`${server.chalk.green('[Database]')} Connected successfully.`);
    server.loadCore();
    server.loadModules();
    conn.release();
    return;
}).catch(err => {
    switch(err.code){
        case 'PROTOCOL_CONNECTION_LOST':
            server.logger.error('Database connection was closed.');
            break;
        case 'ER_CON_COUNT_ERROR':
            server.logger.error('Database has too many connections.');
            break;
        case 'ECONNREFUSED':
            server.logger.error('Check your connection details (packages/swift-core/database.js) or make sure your MySQL server is running.');
            break;
        case 'ER_BAD_DB_ERROR':
            server.logger.error('The database name you\'ve entered does not exist.');
            break;
        case 'ER_ACCESS_DENIED_ERROR':
            server.logger.error('Check your MySQL username and password and make sure they\'re correct.');
            break;
        case 'ENOENT':
            server.logger.error('There is no internet connection. Check your connection and try again.');
            break;
        case 'ENOTFOUND':
            server.logger.error('Database host not found.');
            break;
        default:
            server.logger.error(err);
            break;
        }
});

module.exports = pool;