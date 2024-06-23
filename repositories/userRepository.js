// UserRepository.js


const db = require("../db/chats-db");
const User = require("../entity/User");
const Message = require("../entity/Message");
const {error} = require("qrcode-terminal");
const {READONLY} = require("sqlite3");

class UserRepository {
    constructor() {
        this.db = db;
    }

    // Método para inserir um novo usuário no banco de dados
    async insert(user) {
        try {
            const { phone, name } = user;
            await this.db.run('INSERT INTO users (phone, name) VALUES (?, ?)', [phone, name]);
        } catch (error) {
            throw new Error('Error inserting user: ' + error.message);
        }
    }

    async getByPhoneNumber(phone) {
        try {

            const user = await this.db.get('SELECT * FROM users WHERE phone =?', phone);
            console.log(user)
        } catch (error) {
            throw new Error('Error inserting user: ' + error.message);
        }
    }

    async list() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(new Error('Error getting users: ' + err.message));
                } else {
                    resolve(rows.map(user => new User(user.phone, user.name)));
                }
            });
        });
    }
    async exists(phone) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE phone = ?', [phone], (err, user) => {
                if (err) {
                    reject(new Error('Erro ao obter usuário: ' + err.message));
                } else {
                    resolve(!!user);
                }
            });
        });
    }

}

module.exports = UserRepository;
