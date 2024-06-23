const MessageRepository = require("./repositories/messageRepository");
const UserRepository = require("./repositories/userRepository");

class ChatService {
    constructor() {
        this.messageRepository = new MessageRepository();
        this.userRepository = new UserRepository();
    }

    async registerMessages(messages) {
        const phone = messages[0].user_phone_number
        if (await this.userRepository.exists(phone)){ // CHECK IF USER EXISTS
            for (const message of messages) {
                await this.messageRepository.insert(message);
            }
        }

    }

     async registerUser(user) {
         if (!(await this.userRepository.exists(user.phone))){
             await this.userRepository.insert(user);
         }

     }
}

module.exports = ChatService;
