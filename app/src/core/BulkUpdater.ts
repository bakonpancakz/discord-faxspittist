import SlashCommands from './Loader'
import { Guild } from 'discord.js'
import Client from './Client'
import axios from 'axios'

//? Reference
const SlashCommandStructures = SlashCommands.map(c => c.command)

//? Updater Function
async function UpdateGuild(guild: Guild) {

    //? Reference Variables
    const apiURL = Client.options.http?.api
    const appId = Client.application?.id
    const apiOpt = {
        'headers': {
            'authorization': 'Bot ' + Client.token
        }
    }

    //? Overwrite Slash Commands
    axios.put(
        `${apiURL}/applications/${appId}/guilds/${guild.id}/commands`,
        SlashCommandStructures,
        apiOpt
    )
        .then(() => {
            //? Log Event
            console.debug(`[BKUPDR] Updated Guild ${guild.id}`)
        })
        .catch(err => {

            //? Retry Method Depending on Status Code
            switch (err?.response?.status) {

                // Recoverable Error(s)

                case 429: //? Rate Limit | AutoRetry

                    // Reference
                    const retry_after = err?.response?.data?.retry_after

                    //! Log Event & Retry
                    console.warn(`[BKUPDR] ${guild.id} - Rate Limited | Retrying in ${retry_after}ms`)

                    //? Retry ( Auto Delay )
                    setTimeout(() => UpdateGuild(guild), retry_after)
                    break


                case 500: //? Server Error | Retry

                    //? Log Event
                    console.error(`[BKUPDR] ${guild.id} - Server Error`, err?.response)

                    //? Retry ( 10 Second Delay )
                    setTimeout(() => UpdateGuild(guild), 10 * 1000)
                    break

                // Unrecoverable Error(s)

                case 400: //? Bad Request | Exit

                    //? Log Event
                    console.error(`[BKUPDR] ${guild.id} - Bad Request | Ensure that all slash commands are valid`, err?.response?.data)

                    //! Exit (Production Only)
                    if (process.env.NODE_ENV === 'production') process.exit(1)
                    break


                case 401: //? Unauthorized | Exit

                    //! Log Event & Exit
                    console.error(`[BKUPDR] ${guild.id} - Unauthorized`)
                    process.exit(1)
                    break

                // Ignored Errors

                case 403: //? Forbidden | Exit

                    //! Log Event
                    console.error(`[BKUPDR] ${guild.id} - Forbidden | Ensure that bot has 'applications.commands' permission in this guild.`)
                    break

                default: //? Other | Ignore
                
                    console.error(`[BKUPDR] ${guild.id} - Unknown Error`, err?.response)
                    break

            }
        })
}

//? Update Slash Commands on all Guilds
Client.on('ready', async () => {
    Client.guilds.cache.forEach(UpdateGuild)
})