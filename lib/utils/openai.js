"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = void 0;
const openai_1 = require("openai");
// TOOD: move to config file
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const sendMessages = (messages, config = {}, model = "gpt-3.5-turbo") => openai
    .createChatCompletion(Object.assign({ model,
    messages, stream: true }, config))
    .then((res) => { var _a, _b, _c; return (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content; });
exports.sendMessages = sendMessages;
//# sourceMappingURL=openai.js.map