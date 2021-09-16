import { Client } from "discord.js";


// Calculate Intents
let intentSet: any = new Set()

// For Analytics: Guild Tracker
if (process.env.WEBHOOK_FAXSPITTIST) intentSet.add("GUILDS")


// Create Client
let Bot = new Client({ intents: Array.from(intentSet.values) });
Bot.login(process.env.TOKEN_FAXSPIT);

export default Bot;