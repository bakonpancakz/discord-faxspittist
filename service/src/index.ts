import { InteractionResponseType, InteractionType, verifyKey } from "discord-interactions"
import { Commands, GetAccessToken, ToInteractionResponse, ToJSONResponse } from "./Utils"
import { Interaction } from "./typings"

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const requestURL = new URL(req.url, 'http://localhost')

		// Handle discord user interaction
		if (requestURL.pathname === '/interactions') {

			// Validate Request came from Discord
			const RequestBody = await req.text()
			const HSignature = req.headers.get("x-signature-ed25519")
			const HTimestamp = req.headers.get("x-signature-timestamp")
			if (!HSignature || !HTimestamp) {
				return ToJSONResponse(401, "Invalid Headers")
			}
			const isValidRequest = verifyKey(
				RequestBody,
				HSignature,
				HTimestamp,
				env.APPLICATION_PUBLICKEY,
			)
			if (!isValidRequest) {
				return ToJSONResponse(401, "Invalid Request")
			}

			// Handle Interaction
			const int: Interaction = JSON.parse(RequestBody)
			switch (int.type) {
				// Required for discord to verify the interaction endpoint
				case InteractionType.PING:
					return new Response(
						JSON.stringify({ type: InteractionResponseType.PONG })
					)

				// Route command to its handler
				case InteractionType.APPLICATION_COMMAND:
					const someCommand = Commands.find(c => c.structure.name == int.data.name)
					return someCommand
						? await someCommand.command(int, env)
						: ToInteractionResponse({
							type: 4,
							data: {
								content: "Unknown Command"
							}
						})
			}
		}

		// Send slash commands to discord
		if (requestURL.pathname === '/deploy') {
			const token = await GetAccessToken(env)
			const resp = await fetch(
				`https://discord.com/api/applications/${env.APPLICATION_ID}/commands`,
				{
					method: "PUT",
					headers: {
						"authorization": `Bearer ${token}`,
						"content-type": "application/json",
					},
					body: JSON.stringify(Commands.map(c => c.structure)),
				}
			)
			return ToJSONResponse(resp.status, await resp.json())
		}

		// 404 Handler
		return ToJSONResponse(404, "Endpoint Not Found")
	},
}
