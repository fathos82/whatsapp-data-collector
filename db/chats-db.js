const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('messages-db.db');

db.run('PRAGMA foreign_keys = ON');

// Create the User Table
db.run(`CREATE TABLE IF NOT EXISTS users (
    phone TEXT PRIMARY KEY,
    name TEXT
)`);

db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_phone_number TEXT,
        \`from\` TEXT,
        body TEXT,
        timestamp INTEGER,
        FOREIGN KEY(user_phone_number) REFERENCES users(phone)
    )
`);

module.exports = db;
