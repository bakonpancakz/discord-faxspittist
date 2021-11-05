import SlashCommands, { SlashCommand } from './Loader'
import { CommandInteraction } from 'discord.js'
import Client from './Client'
import Redis from './Redis'

//? Index Slash Functions by Command Name
const slashCommands: { [key: string]: SlashCommand } = {}
SlashCommands.map(s => slashCommands[s?.command?.name] = s)

//? Route Interaction(s) to Function(s)
Client.on('interactionCreate', async (int: CommandInteraction) => {

    //? Find Command
    const command: SlashCommand = slashCommands[int.commandName]
    if (!command) return int.reply({
        ephemeral: true,
        content: "Unknown Command"
    })

    //? Route Command
    command.function(int)

    // Analytics
    Redis.sadd(`usage:guild`, int.guildId)
    Redis.incr(`usage:${int.commandName}:guild:${int.guildId}`)
    Redis.incr(`usage:${int.commandName}`)
})