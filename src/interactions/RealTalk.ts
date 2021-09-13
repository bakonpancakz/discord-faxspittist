import { CommandInteraction } from "discord.js";
import { join } from "path";

// Load Realktalk.json Strings
const strings = require(join(__dirname, "/../../content/realtalk.json"))


export default function (int: CommandInteraction) {
    // Get Random String
    const realString = strings[Math.floor(Math.random() * strings.length)];

    // Send Reply
    int.reply({ content: realString })

}