import { InteractionResponseType } from "discord-interactions";

export interface FaxCommand {
    command: (int: Interaction, env: Env) => Promise<Response>
    structure: {
        name: string
        description: string
    }
}

export interface FaxRoute {
    path: string;
    handler: (req: Request, env: Env, ctx: ExecutionContext) => Promise<Response>
}

export interface InteractionResponse {
    type: InteractionResponseType
    data: {
        content: string
    }
}

export interface Interaction {
    id: string
    application_id: string
    type: InteractionType
    token: string
    version: number
    guild_id?: string
    channel_id?: string
    data: {
        id: string
        name: string
        type: InteractionType
    }
    user?: {
        id: string
        username: string
        discriminator: number
        bot?: boolean
        system?: boolean
        banner?: string
        accent_color?: number
    }
    member?: {
        nick?: string
        avatar?: string
        roles: Array<string>
        joined_at: string
        premium_since?: string
        deaf: boolean
        mute: boolean
        pending?: boolean
        permissions?: string
        communication_disabled_until?: string
    }
}