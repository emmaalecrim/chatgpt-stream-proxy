import { WebSocket } from "ws";
import { sendMessages } from "../utils/openai";
import 'dotenv/config'
import getMessages from "../utils/prompts/helpers";

// const decoder = new TextDecoder("utf-8")

const ChatCompletionController = async (ws: WebSocket, parsedData: any) => {
    try {
        const { data, type } = parsedData
        const { messages, config } = getMessages(type, data)
        const stream = await sendMessages(messages, config)
        // @ts-expect-error - typing bs
        for await (const chunk of stream) {
            ws.send(chunk)
        }
    } catch (e: any) {
        ws.send(JSON.stringify({ error: e.message }))
    }
}

export default ChatCompletionController 