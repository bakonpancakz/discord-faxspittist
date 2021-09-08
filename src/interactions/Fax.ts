import { CommandInteraction, MessageAttachment } from "discord.js";
import { readdirSync, readFileSync } from "fs";


// Read Image Directory and store images in memory
// Prevents Disk Seeking, and they aren't too large
const ImageDir = __dirname + "/../../content/fax-images/"
const imageList = readdirSync(ImageDir)
    .map(filename => { return readFileSync(ImageDir + filename) })


export default function (int: CommandInteraction) {
    // Get Random Image
    const ImageFile = imageList[Math.floor(Math.random() * imageList.length)];

    // Create Attachment
    const Attachment = new MessageAttachment(ImageFile, "fax.png")

    // Send Reply
    int.reply({ files: [Attachment] })

}