import axios from 'axios'
import * as fs from 'fs'
import Client from '../core/Client'

const fileLocation = './.clearglobal'

Client.on('ready', async () => {

    //? Check if Global Commands should be checked
    if (process.env.FAX_SKIPGLOBAL || fs.existsSync(fileLocation))
        return console.debug('[CLRGBL] Global commands previously cleared, skipping...')

    console.debug('[CLRGBL] Checking for Global Commands')

    //? Reference Variables
    const apiURL = Client.options.http?.api
    const appId = Client.application?.id
    const apiOpt = {
        'headers': {
            'authorization': 'Bot ' + Client.token
        }
    }

    //? Clear Global Commands
    axios.put(`${apiURL}/applications/${appId}/commands`, [], apiOpt)
        .then(() => {
            try {
                //? Write .clearglobal File
                console.debug('[CLRGBL] Global Commands Cleared')
                fs.writeFileSync(fileLocation, '')

            } catch (err) {
                //! Warn Error
                console.warn('[CLRGBL] Unable to write .clearglobal file, this function may run again on restart.')
            }
        })
        .catch(err => {
            //! Log Error
            console.error(`[CLRGBL] Unable to Clear Global Commands`, err)
        })
})