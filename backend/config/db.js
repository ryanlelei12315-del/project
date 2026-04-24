const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Initialize the database connection
const dbPath = path.join(__dirname, '../database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Execute schema to create tables and seed initial data
const schemaPath = path.join(__dirname, '../models/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// better-sqlite3 uses exec to run multiple statements at once
db.exec(schema);

console.log('Database connected and schema initialized.');

module.exports = db;
