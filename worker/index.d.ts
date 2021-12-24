import { InteractionResponseType, InteractionType } from "discord-interactions";

export { };

declare global {
    // @cloudflare/workers-types
    const CFKV: KVNamespace;
    const APPLICATION_ID: string;
    const APPLICATION_SECRET: string;
    const APPLICATION_PUBLICKEY: string;
    const BUCKET_URL: string;

    interface Interaction {
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
        message?: Message
    }

    interface InteractionResponse {
        type: InteractionResponseType
        data?: Message,
    }

    interface Message {
        tts?: boolean
        content?: string
        flags?: number
        components?: Array<MessageComponent>
        embeds?: Array<MessageEmbed>
    }
    interface MessageEmbed {
        title?: string
        rich?: "rich" | "image" | "video" | "gifv" | "article" | "link"
        description?: string
        url?: string
        timestamp?: string
        color?: number
        footer?: {
            text?: string
            icon_url?: string
            proxy_icon_url?: string
        }
        image?: {
            url?: string
            proxy_url?: string
            height?: number
            width?: number
        }
        thumbnail?: {}
        video?: {
            url?: string
            proxy_url?: string
            height?: number
            width?: number
        }
        provider?: {
            name?: string
            url?: string
        }
        author?: {
            name?: string
            url?: string
            icon_url?: string
            proxy_icon_url?: string
        }
        fields?: Array<{
            name: string
            value: string
            inline: boolean
        }>
    }

    interface MessageComponent {
        type?: 1 | 2 | 3
        custom_id?: string
        disabled?: boolean
        style?: number
        label?: string
        url?: string
        emoji?: PartialEmoji
        placeholder?: string
        min_values?: number
        max_values?: number
        components?: Array<MessageComponent>
        options?: Array<{
            label: string
            value: string
            description: string
            emoji: PartialEmoji
            default: boolean
        }>
    }

    interface PartialEmoji {
        id?: string
        name?: string
        animated?: boolean
    }

}