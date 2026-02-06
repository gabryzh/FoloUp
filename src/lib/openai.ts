import { OpenAI } from "openai";

// 使用 MiniMax API (兼容 OpenAI 格式)
export const openai = new OpenAI({
    apiKey: process.env.MINIMAX_API_KEY,
    baseURL: "https://api.minimaxi.com/v1",
    maxRetries: 5,
    dangerouslyAllowBrowser: true,
});

// 默认模型
export const DEFAULT_MODEL = "codex-MiniMax-M2.1";
