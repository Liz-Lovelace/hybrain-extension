import Database from 'better-sqlite3';
const db = new Database('../../data/database.db', { verbose: console.log });

// Create a table
const createTable = db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
createTable.run();

// Insert a user
const insertUser = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
insertUser.run('John Doe', 30);

// Query users
const getUsers = db.prepare('SELECT * FROM users');
const users = getUsers.all();
console.log(users);
