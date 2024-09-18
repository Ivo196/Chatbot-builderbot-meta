import { addKeyword } from "@builderbot/bot";
import {runCompletion} from "./openai.js"


 export const button1 = addKeyword("ChatGPT").addAnswer(
    "Hi, I'm ChatGPT model 🙌🏻, How can I help you?",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const promp =
        "Tu eres un asistente que vas a usar el maximo de tu capacidad para responder las preguntas o cunsultas que te hagan, trata de ser lo mas claro y conciso posible, NUNCA RESPONDAS CON PREGUNTAS, simplemente di o sugiere algo si no tienes toda la información ";
      const consulta = ctx.body;
      const res = await runCompletion(promp, consulta);
      
      return await flowDynamic(res);
    }
);


  
