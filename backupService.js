const ChatService = require("./chatService");
const Message = require("./entity/Message");
const User = require("./entity/User");


class BackupService{
    NUMBER_PREFIX = '+55 ';
    MSG_LIMIT = 50;

    constructor(){
        this.chatService = new ChatService();
        this.timeLastBackup = Date.now();
    }


    async backup(all_chats) {

        for (const chat of all_chats) {
            const contact = await chat.getContact();
            if (contact.isUser) {

                const messages = await chat.fetchMessages({limit: this.MSG_LIMIT});
                // Filter messages: includes the messages tha was not backed
                const unbackedUpMessages = this.filterMessagesBacked(messages);

                if (unbackedUpMessages.length > 0){
                    const user = await this.registerUser(contact)
                    console.log(`Performing backup for User: ${user.name}, Phone Number: ${user.phone}`);

                    // FINALY BACKUP CURRENT CHAT ACCORDING CURRENT USER
                    console.log(`Found ${unbackedUpMessages.length} unbacked up messages for User: ${user.name}`);

                    await this.backupCurrentChat(user, unbackedUpMessages);

                    console.log(`Backup completed for User: ${user.name}`);

                }
            }
            // Update Time of Last Backup:
            this.timeLastBackup = Date.now();
        }
    }
    async backupCurrentChat(user, unbackedUpMessages) {
        const messagesToBackup = []
        for (const msg of unbackedUpMessages) {
            const senderContact = (await msg.getContact())
            const senderNumber = this.normalizeNumber(await senderContact.getFormattedNumber())

            messagesToBackup.push(
                new Message(
                    user.phone,
                    senderNumber === user.phone ? senderContact.name : "Dguste",
                    msg.body,
                    msg.timestamp
                ));
        }
            await this.chatService.registerMessages(messagesToBackup);
    }

    async registerUser(contact) {
        const name = contact.name;
        const phoneNumber = this.normalizeNumber(await contact.getFormattedNumber())

        // Add User IF NOT EXISTS:
        const user = new User(phoneNumber, name);
        await this.chatService.registerUser(user)
        return user;
    }
    normalizeNumber(number) {
        return number.replace(this.NUMBER_PREFIX, '').replace(/[-\s]/g, '');
    }

    filterMessagesBacked(messages){
        return  messages.filter(msg => {
            return (msg.timestamp * 1000) >= this.timeLastBackup && msg.body !== '';
        });
    }
}

module.exports = BackupService