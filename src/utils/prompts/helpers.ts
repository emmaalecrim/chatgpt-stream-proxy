import prompts, { messengerArgs, promptTypes } from "./prompt-base/index";


const getMessages = (
    type: promptTypes,
    args: messengerArgs
): { messages: object[]; config?: object; metadata: object } => {
    // @ts-ignore - typing bs
    const messenger = prompts[type];
    return messenger(args);
};

export default getMessages;


