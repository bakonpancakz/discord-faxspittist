import { Client } from "discord.js";

// No Intents are required 
// as we are just listening for Interaction Creations
const Bot = new Client({ intents: [] });
Bot.login(process.env.TOKEN_FAXSPIT);

export default Bot;