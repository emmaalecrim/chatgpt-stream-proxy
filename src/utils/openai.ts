import { Configuration, OpenAIApi } from "openai";

// TOOD: move to config file
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

type messageConfig = {
  temperature?: number;
};

const sendMessages = (
  messages: any[],
  config: messageConfig = {},
  model: string = "gpt-3.5-turbo"
) =>
  openai
    .createChatCompletion({
      model,
      messages,
      stream: true,
      ...config,
    })
    .then((res) => res?.data?.choices[0]?.message?.content);

export { sendMessages };