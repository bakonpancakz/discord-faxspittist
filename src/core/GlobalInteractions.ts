import axios from "axios";
import Bot from "./Client";
const interactions = require("../../content/interactions.json")


Bot.on("ready", () => {

    const axiosUrl = `https://discord.com/api/applications/${Bot.application.id}/commands`
    const axiosOptions = { "headers": { "Authorization": `Bot ${Bot.token}` } }


    // Create Command Interaction
    axios.get(axiosUrl, axiosOptions)
        .then(response => {

            const globalInts: Array<any> = response.data;

            // Validate Global Command is Created
            interactions.forEach(int => {

                // Search for Global Command by Name
                const commandFound = globalInts.find(gint => { return gint.name == int.name })

                if (!commandFound) {

                    // Create New Command
                    axios.post(axiosUrl, int, axiosOptions)

                        .then(() => {
                            console.info(`Set Global Command: ${int.name}`)
                        })

                        // Send Error Message to Console
                        .catch(err => {
                            console.error(`Failed to Set Global Command: ${int.name}`, err)
                        })

                }

            })

        })

        // Send Warning to Console
        // Might not be important as we are only validating
        // that the Global Interactions are set.
        .catch(err => {
            console.warn("Failed to Validate Global Commands", err)
        })


    // Bot Ready :)
    console.info("Bot Ready!")
});