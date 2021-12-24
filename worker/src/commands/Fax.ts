import { InteractionResponse } from "../Utils"
const CacheTTL = 60 * 60 * 24 * 7   // 1 Week
const ImageCount = 152

export default async function Fax(i: Interaction) {

    //? (1.) Get Unused Image List
    //* (1a.) Query KV Storage
    const KEYNAME = `fx:${i.guild_id}`;
    let FreeImages: undefined | Array<number> = await CFKV.get(KEYNAME, "json") || [];

    //* (1b.) Create New Image List (If it doesn't exist already)
    if (!FreeImages || FreeImages.length === 0) {
        FreeImages = []
        for (var x = 1; x <= ImageCount; x++) FreeImages.push(x);
    }

    //? (2.) Choose a Random Image
    const ImageId = FreeImages[Math.floor(Math.random() * FreeImages.length)];

    //? (3.) Remove Used Image
    delete FreeImages[ImageId];
    FreeImages = FreeImages.filter(
        i => { if (i) return i }
    );

    //? (4.) Upload New List(s)
    CFKV.put(
        KEYNAME,
        JSON.stringify(FreeImages),
        { expirationTtl: CacheTTL }     // Reset TTL because its still in use
    )

    //? (5.) Return Response
    return InteractionResponse({
        type: 4,
        data: {
            content: BUCKET_URL + ImageId + ".png"
        }
    })
}