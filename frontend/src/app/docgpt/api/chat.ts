export interface Chat {
    id: number,
    name: string,
    settings: ChatSettings,
    messages: ChatMessage[]
}

export interface ChatSettings {
    id?: number,
    language: any,
    model: any
}

export interface ChatMessage {
    id: number,
    content: string,
    origin: string
}