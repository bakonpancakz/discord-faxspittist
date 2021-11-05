import * as discord from 'discord.js'

//? Create Client
const Client = new discord.Client({ intents: [] })

Client.login(String(process.env.FAX_TOKEN))
    .then(() => {

        //? Log Event
        console.debug(`[CLIENT] Logged in as ${Client?.user?.tag}`)

    })
    .catch(err => {

        //! Log Event & Exit
        console.error(`[CLIENT] Failed to login, please ensure that your token is valid.`, err)

    })

export default Client