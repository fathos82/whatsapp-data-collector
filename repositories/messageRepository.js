const db = require("../db/chats-db");
const Message = require("../entity/Message");

class MessageRepository {
    constructor() {
        this.db = db;
    }

    // Método para inserir uma nova mensagem no banco de dados
    async insert(message) {
        const { user_phone_number, from, body, timestamp } = message;
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO messages (user_phone_number,  \`from\`, body, timestamp) VALUES (?, ?, ?, ?)',
                [user_phone_number, from, body, timestamp],
                function (err) {
                    if (err) {
                        reject(new Error('Error inserting message: ' + err.message));
                    } else {
                        resolve(this.lastID); // Retorna o ID da nova mensagem inserida
                    }
                }
            );
        });
    }

    // Método para mostrar todas as mensagens no banco de dados
    async list() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM messages', (err, rows) => {
                if (err) {
                    reject(new Error('Error getting messages: ' + err.message));
                } else {
                    resolve(rows.map(msg => new Message(msg.user_phone_number, msg.from, msg.body, msg.timestamp))); // Retorna todas as mensagens
                }
            });
        });
    }


}

module.exports = MessageRepository
