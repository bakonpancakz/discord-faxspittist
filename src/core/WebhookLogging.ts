import Client from "./Client";
import { MessageEmbed, WebhookClient } from "discord.js";

const WebhookURL = process.env.WEBHOOK_FAXSPITTIST


if (WebhookURL) {
    console.info("[WebhookLogging] Detected Webhook, Enabling Logging!")
    
    let captainHook = new WebhookClient({ "url": WebhookURL })

    Client.on("guildCreate", (guild) => {

        // Create Webhook Embed
        let content = new MessageEmbed({
            title: "Guild | Joined!",
            description: `
            > **ID:** ${guild.id}
            > **Name:** ${guild.name}
            > **Large:** ${guild.large}
            `,
            color: parseInt("379C6F", 16),
            thumbnail: {
                url: guild.iconURL()
            },
            footer: {
                "text": `New Server Count: ${Client.guilds.cache.size}`
            },
            timestamp: new Date()
        })

        // Send Embed to Webhook
        captainHook.send({ embeds: [content] })

    })

    Client.on("guildDelete", (guild) => {

        // Create Webhook Embed
        let content = new MessageEmbed({
            title: "Guild | Leave",
            description: `
            > **ID:** ${guild.id}
            > **Name:** ${guild.name}
            > **Large:** ${guild.large}
            `,
            color: parseInt("E91E63", 16),
            thumbnail: {
                url: guild.iconURL()
            },
            footer: {
                "text": `New Server Count: ${Client.guilds.cache.size}`
            },
            timestamp: new Date()
        })

        // Send Embed to Webhook
        captainHook.send({ embeds: [content] })

    })
}