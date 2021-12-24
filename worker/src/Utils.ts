export function JSONResponse(body: any, status?: number) {

    //* Turns Response in a JSON String
    //* with appropriate Header(s)
    return new Response(
        JSON.stringify(body),
        {
            status: status ? status : 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}

export function InteractionResponse(response: InteractionResponse): Response {
    return JSONResponse(response); // Type Passthrough
}

const KEYNAME = "fx:credentials"
export async function GetAccessToken(): Promise<string> {
    return new Promise(async (res) => {

        //? (1.) Retrieve token from KV Cache
        let token = await CFKV.get(KEYNAME, "text");
        if (token) return res(token.toString());

        //? (2.) Generate new Credential Token
        const Token = await (await fetch(
            "https://discord.com/api/v8/oauth2/token",
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "authorization": `Basic ${btoa(`${APPLICATION_ID}:${APPLICATION_SECRET}`)}`
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "applications.commands"
                }),
            }
        )).json();

        //? (3.) Store Token in KV Cache
        await CFKV.put(
            KEYNAME, Token.access_token,
            { "expirationTtl": Token.expires_in - 10 }
        );

        // Return New Access token
        res(Token.access_token);
    });
}