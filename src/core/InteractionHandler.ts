import Client from "./Client";
import { readdirSync } from "fs";
import { join } from "path";
const Location = join(__dirname, "/../interactions/");
const modules = {}

// Load Interactions
readdirSync(Location).forEach(filename => {
    if (filename.endsWith(".js")) {
        // Load Module
        const module = require(Location + filename).default

        // Convert Filename to interaction name
        const moduleName = filename.split(".", 1).toString().toLowerCase()

        // Store Module in Object
        modules[moduleName] = module
        console.info("[InteractionHandler] Loaded Module:", filename)
    }
})

Client.on("interactionCreate", async (int) => {
    if (!int.isCommand()) return;

    // Find Function
    let mod: Function = modules[int.commandName]

    // Run Function or send message
    mod
        ? mod(int)
        : int.reply({ content: `Attempted to Run Command. But it doesn't exist.` })

});