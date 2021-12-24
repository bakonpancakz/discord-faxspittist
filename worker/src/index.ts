import { InteractionResponseType, InteractionType, verifyKey } from "discord-interactions"
import { GetAccessToken, InteractionResponse, JSONResponse } from "./Utils";
import { Router } from "itty-router"

import { Structures } from "./data/Structures";
import RealTalk from "./commands/Realtalk";
import Fax from "./commands/Fax";

const app = Router()
app.post("/interactions", async (_, ev: FetchEvent) => {

    //* Retreive Values
    const RequestBody = await ev.request.text();
    const HSignature = ev.request.headers.get("x-signature-ed25519");
    const HTimestamp = ev.request.headers.get("x-signature-timestamp");

    if (!HSignature || !HTimestamp) return new Response(
        "400: Missing Required Header(s)",
        { status: 400 }
    );

    //* Validate Request
    const isValidRequest = verifyKey(
        RequestBody,
        HSignature,
        HTimestamp,
        APPLICATION_PUBLICKEY,
    );

    if (isValidRequest !== true) return new Response(
        "401: Unable to Validate Request", { status: 401 }
    );

    //* Route Request
    const i: Interaction = JSON.parse(RequestBody);
    switch (i.type) {

        //* Required for Discord to Verify Bot | DO NOT REMOVE
        case InteractionType.PING:
            return new Response(
                JSON.stringify({ type: InteractionResponseType.PONG })
            );

        //* Application Command Router
        case InteractionType.APPLICATION_COMMAND:
            switch (i.data.name) {

                //* Valid Command(s)
                case "fax": return Fax(i);
                case "realtalk": return RealTalk(i);

                //* Invalid Command
                default: return InteractionResponse({
                    type: 4,
                    data: {
                        content: "Unknown Command"
                    }
                });
            }

    }
});

app.patch("/deploy", async () => {

    //* Make Discord API Request
    const Token = await GetAccessToken();
    const Res = await fetch(
        `https://discord.com/api/applications/${APPLICATION_ID}/commands`,
        {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${Token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(Structures),
        }
    );

    //* Return Response
    return JSONResponse(await Res.json(), Res.status);

});

//* Event Handler(s)
app.all("*", () => new Response("404: Not Found", { status: 404 }));        //! 404 Handler
addEventListener("fetch", e => e.respondWith(app.handle(e.request, e)));    //? Event Handler