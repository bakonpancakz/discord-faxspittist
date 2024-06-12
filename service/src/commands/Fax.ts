import { InteractionResponseType } from "discord-interactions"
import { CacheTTL, ToInteractionResponse } from "../Utils"
import { FaxCommand } from "../typings"

const ImageCount = 152

const Fax: FaxCommand = {
    structure: {
        name: "fax",
        description: "📠 Facts from the Goat"
    },
    command: async (int, env) => {

        // Fetch used item list
        let key = `usable_fax_${int.guild_id}`
        let usableList: Array<number> | null = await env.CFKV.get(key, 'json')
        if (!usableList || usableList.length === 0) {
            // Create new list of usable items
            usableList = []
            for (var x = 1; x <= ImageCount; x++) usableList.push(x)
        }

        // Choose a Random Item
        const imageId = usableList[Math.floor(Math.random() * usableList.length)];

        // Update List
        usableList.splice(imageId, 1)
        env.CFKV.put(key, JSON.stringify(usableList), { expirationTtl: CacheTTL })

        // Respond to Interaction
        return ToInteractionResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                // Discord automatically converts URL into Image Previews
                content: env.BUCKET_URL + imageId.toString().padStart(ImageCount.toString().length, '0') + ".png"
            }
        })
    },
}
export default Fax