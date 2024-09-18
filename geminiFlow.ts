import { addKeyword } from "@builderbot/bot";
import { runCompletion2 } from "./gemini.js"


 export const button2 = addKeyword("Gemini").addAnswer(
    "Hi, I'm Gemini model 🙌🏻, How can I help you?",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const prompt =
        "Tu eres un asistente que vas a usar el maximo de tu capacidad para responder las preguntas o cunsultas que te hagan, trata de ser lo mas claro y conciso posible,NUNCA RESPONDAS CON PREGUNTAS, simplemente di o sugiere algo si no tienes toda la información ";
      const consulta = ctx.body;
      const res = await runCompletion2(prompt, consulta);
      return await flowDynamic(res);
    }
);

  
