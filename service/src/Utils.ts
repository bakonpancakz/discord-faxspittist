import Fax from "./commands/Fax";
import Realtalk from "./commands/Realtalk";
import { InteractionResponse } from "./typings";

export const CacheTTL = 60 * 60 * 24 * 7   // 1 Week
export const Commands = [
    Realtalk,
    Fax,
]

/**
 * Returns a Response for a JSON Object with Headers and custom Status if given
 * @param body - Response Body
 * @param statusCode - Status Code
 * @returns {Response}
 */
export function ToJSONResponse(statusCode: number, body: any): Response {
    return new Response(
        JSON.stringify(body),
        {
            status: statusCode,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}

/**
 * Converts an Interaction to a JSON Response accepted by Discord
 * @param response - Interaction Response
 * @returns {Response}
 */
export function ToInteractionResponse(response: InteractionResponse): Response {
    return ToJSONResponse(200, response)
}


/**
 * 
 * @param env 
 * @returns {string} - The Access Token
 */
export async function GetAccessToken(env: Env): Promise<string> {
    return new Promise(async ok => {
        // Check cache for the current token
        let kvkey = "app_token"
        let token = await env.CFKV.get(kvkey, "text")
        if (token) return ok(token.toString())

        // Get frehs access token from discord
        const resp = await fetch(
            "https://discord.com/api/v8/oauth2/token",
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "authorization": `Basic ${btoa(`${env.APPLICATION_ID}:${env.APPLICATION_SECRET}`)}`
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "applications.commands.update"
                }),
            }
        )
        const Body: {
            access_token: string
            expires_in: number
        } = await resp.json() as any

        // Store token in cache
        env.CFKV.put(kvkey, Body.access_token, { expirationTtl: Body.expires_in })
        return ok(Body.access_token)
    });
}