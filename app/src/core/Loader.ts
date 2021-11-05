import * as path from 'path'
import * as fs from 'fs'

export interface SlashCommand {
    command: any,
    function: Function
}

const commandDirectory = path.join(__dirname, '../commands')
const SlashCommands: Array<SlashCommand> = []

//? Read Commands Directory
fs.readdirSync(commandDirectory).forEach(filename => {
    try {

        //? Require Module
        const fPath = path.join(commandDirectory, filename)
        const module = require(fPath)?.default

        //? Validate Module
        if (!module?.function) throw 'Module Missing Function'
        if (!module?.command) throw 'Module Missing Command Structure'

        //? Load Command
        SlashCommands.push(module)
        if (process.env.NODE_ENV !== 'production')
            console.debug(`[CMDLDR] Loaded: ${filename}`)

    } catch (err) {

        //? Log Event 
        console.error(`[CMDLDR] Failed: ${filename}`, err)

        //! Exit (Production Only)
        if (process.env.NODE_ENV === 'production')
            process.exit(1)
    }

})

export default SlashCommands