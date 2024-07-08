const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0hNcnZGY1NmaERISWxnQ0VXOUxCTXpJcklya21wdnlna3puN2JtUG1sRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnBNeU9pMGtNTmo1blRGYTl4NURQdVN1MS82MWMxVHd6M0NGanJWVjBXVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS2U4UEw5c0RycldMVzcyb3g4YXNQMjRmZ25LbkQ4K2MwblhXbCtMbFYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzM2tiVko3RkUvUzNKZzluQytZZ0hENkNRSEU0ZjV0MVVGOS9nS3FUM2lzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1DUFNiR29RMVpUdzVTaitkdVlyR2dHcmxnMEVlQWV0Mk5uSWVIQVlzR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImMyZWphRzJjQ2JqbXV3cHFuVGNGSTdzSFgvYUtzUFVIZElNOTREWm9vbm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZaaFFjWWlSMUdxY1N4R0grNjlCYklBS1RNcXlMWXIxTTgxNnI2UVdIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVVQc3JrL1BJb0J3UjNPYWFBMUpZMFdSeDBzZ0k3enpDd01IRFpSWGxTUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpMZEdGZHNoZlIyR2pSUGpPTTF0UWFSQnB2WURncDZCNllIRG9uZVlSZG02WU9zTXRJSDFUQjk2UVhPZUl5OWxwdmtDVDNUUnJ2Vkc0UFBSZVpYakN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJQUEZrbEIxeWh5b1NiSUNFN0VOMjJwTkVERXhDU3RmRnIzUTZtMHNnRkQ4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQTkxVYXZmZ1FmcVRnY3lvdHlSZGlBIiwicGhvbmVJZCI6IjhkNGQ1NjNlLTEzOTUtNDQ2OS1iMmQwLTA3MWZkYjFmZDE0ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQ3ZLR3cwcHpOVGVqK3VGZ2dVbzE0VGxudGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzdmOERQTHdzWjQ3S0gxcTdnaWVCUEI2cVBJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQyQldKNE03IiwibWUiOnsiaWQiOiIyNTQxMDIwNzQwNjQ6NTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3QmlaZ0JFUEtHc0xRR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5rQmY5WFNFZjdOUWFIVkNxQXNTVnQ0NnNlUUpMRnQrNnpQYzZFZ09CbTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkN0ZWVmbk15TXdpcC9Tc3VvQ0xmdUlXR3BqQm5QTkdIek1TdmpwZVFaQzZSaklsV0ZNSUhVcHVuVXJEcFlPSktWTnhyRk1FQis5M2NqMzdVTFdlSERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJweitRZ0E4ZVZSM05vL25rUWROODUyaEtpcGh2UGdYcGN4ZjcxaDBIb2NUaWltNEd5d0dEU21WUklibDA4SCtBVXNuaXZ5Nlp1blh3RndMQmFGZ2lBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwMjA3NDA2NDo1MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUWkFYL1YwaEgrelVHaDFRcWdMRWxiZU9ySGtDU3hiZnVzejNPaElEZ1p0In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNDUxOTY3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxMcSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "drex",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'MEGATRON-BOT',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
