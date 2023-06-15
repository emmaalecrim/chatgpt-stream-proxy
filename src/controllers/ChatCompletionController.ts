import { WebSocket } from "ws";
import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config'

import getMessages from "../utils/prompts/helpers";

const decoder = new TextDecoder("utf-8")

const ChatCompletionController = async (ws: WebSocket, parsedData: any) => {
    try {
        const { data, type } = parsedData
        const { messages } = getMessages(type, data)
        // TOOD: move to config file
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        const openai = new OpenAIApi(configuration);
        const stream = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            // @ts-ignore - not sure why this is throwing an error
            messages,
            stream: true,
        }, { responseType: "stream" })
        // @ts-expect-error - typing bs
        for await (const chunk of stream.data) {
            decoder.decode(chunk).trim().split('data: ')
                .filter((dataStr) => !!dataStr) // remove empty strings
                .filter((dataStr) => !!!dataStr.includes('[DONE]')) // remove done messages
                .map((dataStr) => JSON.parse(dataStr))
                .forEach((message) => {
                    if (message?.choices[0].delta?.content) ws.send(message?.choices[0].delta?.content)
                })
        }
    } catch (e: any) {
        ws.send(JSON.stringify({ error: e.message }))
    }
}

export default ChatCompletionController 