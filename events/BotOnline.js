const Discord = require("discord.js")
const botsettings = require('../config.json');
const bot = new Discord.Client();
const sqlite = require('sqlite3').verbose();


bot.on('ready', async () => {
    console.log("Bot successvol opgestart")
    let db = new sqlite.Database('./data/economy.db', sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE)
    db.configure("busyTimeout", 60000)
    db.run(`CREATE TABLE IF NOT EXISTS data (userID TEXT NOT NULL UNIQUE, heroes INTEGER NOT NULL)`)
    db.run(`CREATE TABLE IF NOT EXISTS cooldowns (userid TEXT NOT NULL UNIQUE, work TIME, rob TIME, gamble TIME, daily TIME, weekly TIME, monthly TIME)`)
    db.run(`CREATE TABLE IF NOT EXISTS stocks_data (userid TEXT NOT NULL UNIQUE, "Among us" TEXT NOT NULL DEFAULT "0", "Minecraft TEXT NOT NULL DEFAULT "0", Discord TEXT NOT NULL DEFAULT "0", Twitch TEXT NOT NULL DEFAULT "0", Youtube TEXT NOT NULL DEFAULT "0"")`)
    db.run(`CREATE TABLE IF NOT EXISTS stock_market ("Among us" TEXT NOT NULL DEFAULT "40", "Minecraft TEXT NOT NULL DEFAULT "1215", Discord TEXT NOT NULL DEFAULT "144", Twitch TEXT NOT NULL DEFAULT "880", Youtube TEXT NOT NULL DEFAULT "5516"")`)
    db.close();
})

bot.login(botsettings.token);