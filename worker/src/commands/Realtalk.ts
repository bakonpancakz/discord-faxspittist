import { InteractionResponse } from "../Utils"
import { RealMessages } from "../data/RealMessages"
const CacheTTL = 60 * 60 * 24 * 7   // 1 Week
const QuoteCount = RealMessages.length

export default async function RealTalk(i: Interaction) {

    //? (1.) Get Unused Quote Array
    const KEYNAME = `rt:${i.guild_id}`;
    let FreeQuotes: undefined | Array<number> = await CFKV.get(KEYNAME, "json") || [];

    //* (1a.) Create New Image List (If it doesn't exist already)
    if (!FreeQuotes || FreeQuotes.length === 0) {
        FreeQuotes = []
        for (var x = 1; x <= QuoteCount; x++) FreeQuotes.push(x);
    }

    //? (2.) Choose a Random Quote
    const QuoteId = FreeQuotes[Math.floor(Math.random() * FreeQuotes.length)];
    const QuoteText = RealMessages[QuoteId];

    //? (3.) Remove Used Quote
    delete FreeQuotes[QuoteId];
    FreeQuotes = FreeQuotes.filter(
        i => { if (i) return i }
    );

    //? (4.) Upload New Array
    CFKV.put(
        KEYNAME,
        JSON.stringify(FreeQuotes),
        { expirationTtl: CacheTTL }     // Reset TTL because its still in use
    )

    //? (5.) Return Response
    return InteractionResponse({
        type: 4,
        data: {
            content: QuoteText
        }
    })
}