const { Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const assert = require("node:assert");
const BackupService = require('./BackupService');
const {join} = require("node:path");



const client = new Client({

    authStrategy: new LocalAuth(),

    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');
});






//  "name": "untitled3",

client.initialize()
const backupService = new BackupService();

cron.schedule('0 */5 * * *', async () => {
    try {
        console.log('Starting backup service...');
        const chats = await client.getChats();
        await backupService.backup(chats);
        console.log('Backup service finished successfully.');
    } catch (error) {
        console.error('An error occurred during backup:', error);
    }
});