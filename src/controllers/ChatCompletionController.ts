import { WebSocket } from "ws";
import { Configuration, OpenAIApi } from "openai";

import getMessages from "../utils/prompts/helpers";

const ChatCompletionController = async (ws: WebSocket, parsedData: any) => {
    try {
        const { data, type } = parsedData
        const { messages } = getMessages(type, data)
        // TOOD: move to config file
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY || "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"
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            // @ts-ignore - not sure why this is throwing an error
            messages,
            stream: true,
        },
        )


    } catch (e) {
        console.log(e)
    }
}

export default ChatCompletionController 