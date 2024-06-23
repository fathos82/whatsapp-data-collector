class Message {
    constructor(user_phone_number, from, body, timestamp) {
        this.user_phone_number = user_phone_number;
        this.from = from;
        this.body = body;
        this.timestamp = timestamp;
    }
}

module.exports = Message;
