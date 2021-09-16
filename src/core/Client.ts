import { Client } from "discord.js";


// Calculate Intents
let intentSet: any = new Set()

// For Analytics: Guild Tracker
if (process.env.WEBHOOK_FAXSPITTIST) intentSet.add("GUILDS")


// Create Client
const BotClient = new Client({
    intents: Array.from(intentSet.values)   // Convert Set => Array
});
BotClient.login(process.env.TOKEN_FAXSPITTIST);

export default BotClient;