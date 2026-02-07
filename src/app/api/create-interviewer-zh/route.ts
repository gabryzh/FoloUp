import {
    INTERVIEWERS_ZH,
    RETELL_AGENT_GENERAL_PROMPT_ZH,
    RETELL_CHINESE_VOICES,
} from "@/lib/constants";
import { logger } from "@/lib/logger";
import { InterviewerService } from "@/services/interviewers.service";
import { type NextRequest, NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
    apiKey: process.env.RETELL_API_KEY || "",
});

export async function GET(res: NextRequest) {
    logger.info("create-interviewer-zh request received");

    try {
        // 创建中文 LLM 模型
        const newModel = await retellClient.llm.create({
            model: "gpt-4o",
            general_prompt: RETELL_AGENT_GENERAL_PROMPT_ZH,
            general_tools: [
                {
                    type: "end_call",
                    name: "end_call_1",
                    description: "当用户说再见、拜拜、结束等告别语时结束通话。",
                },
            ],
        });

        // 创建小明 (男声)
        const xiaomingAgent = await retellClient.agent.create({
            response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
            voice_id: RETELL_CHINESE_VOICES.MALE,
            agent_name: "小明",
            language: "zh-CN",
        });

        const xiaomingInterviewer = await InterviewerService.createInterviewer({
            agent_id: xiaomingAgent.agent_id,
            ...INTERVIEWERS_ZH.XIAOMING,
        });

        // 创建小丽 (女声)
        const xiaoliAgent = await retellClient.agent.create({
            response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
            voice_id: RETELL_CHINESE_VOICES.FEMALE,
            agent_name: "小丽",
            language: "zh-CN",
        });

        const xiaoliInterviewer = await InterviewerService.createInterviewer({
            agent_id: xiaoliAgent.agent_id,
            ...INTERVIEWERS_ZH.XIAOLI,
        });

        logger.info("Chinese interviewers created successfully");

        return NextResponse.json(
            {
                xiaomingInterviewer,
                xiaoliInterviewer,
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error("Error creating Chinese interviewers:");
        console.error(error);

        return NextResponse.json(
            { error: "Failed to create Chinese interviewers" },
            { status: 500 }
        );
    }
}
