import AvailableStrings from "../../content/Realtalk"
import { CommandInteraction } from 'discord.js'
import Redis from '../core/Redis'

const StringPositions = AvailableStrings.map((_, i) => i)

export default {

    command: {
        name: 'realtalk',
        description: '🔊 Real Talk from the Goat'
    },

    function: async function (int: CommandInteraction) {

        //? Get Set
        const key = `realtalk:${int.guildId}`
        const listLength = await Redis.scard(key)

        //? Create Set of Positions
        // Resets when expired or Empty
        if (listLength === 0) {
            await Redis.sadd(key, StringPositions)  // Create List
            await Redis.expire(key, 86400)          // Expire Set in 1 Day
        }

        //? Get Random Position
        const TextPos = await Redis.spop(key)
        const TextContent = AvailableStrings[TextPos]

        //? Send Reply
        int.reply({ content: TextContent })

        // Analytics
        Redis.incr(`usage:realtalk:text:${TextPos}`)
    }
}