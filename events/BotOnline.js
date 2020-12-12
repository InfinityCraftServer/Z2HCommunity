const Discord = require("discord.js")
const botsettings = require('../config.json');
const bot = new Discord.Client();
const sqlite = require('sqlite3').verbose();


bot.on('ready', async () => {
    console.log("Bot successvol opgestart")
    let db = new sqlite.Database('./data/economy.db', sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE)
    db.configure("busyTimeout", 60000)
    db.run(`CREATE TABLE IF NOT EXISTS data (userID TEXT NOT NULL, heroes INTEGER NOT NULL)`)
    db.close();
})

bot.login(botsettings.token);