import { CommandInteraction, MessageAttachment } from 'discord.js'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import Redis from '../core/Redis'

const ImageIndex = {}
const ImageDirectory = join(__dirname, '/../../../content/fax-images')
const ImageFilenames = readdirSync(ImageDirectory)
const ImageFiles = ImageFilenames.map((filename, position) => {

    //? Index filename to Array Position
    ImageIndex[filename] = position

    //? Read Images and store them in memory
    //? Prevents Synchronous Disk Reading
    return {
        name: filename,
        file: readFileSync(join(ImageDirectory, filename))
    }

})

export default {

    command: {
        name: 'fax',
        description: '📠 Facts from the Goat'
    },

    function: async function (int: CommandInteraction) {

        //? Get Set
        const key = `fax:${int.guildId}`
        const listLength = await Redis.scard(key)

        //? Create Set of Filenames
        // Resets when expired or Empty
        if (listLength === 0) {
            await Redis.sadd(key, ImageFilenames)   // Create List
            await Redis.expire(key, 86400)          // Expire Set in 1 Day
        }

        //? Get Random Filename
        const ImageKey = await Redis.spop(key)
        const ImagePosition = ImageIndex[ImageKey]
        const Image = ImageFiles[ImagePosition]

        //? Send Reply
        const Attachment = new MessageAttachment(Image.file, Image.name)
        int.reply({ files: [Attachment] })

        // Analytics
        Redis.incr(`usage:fax:image:${ImageKey}`)
    }
}