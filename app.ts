import { join } from "path";
import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  utils,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { config } from "dotenv";
config();

import { button1 } from "./openaiFlow.js";
import { button2 } from "./geminiFlow.js";

const PORT = process.env.PORT ?? 3008;


const welcomeFlow = addKeyword<Provider, Database>(["Chatbot"])
  .addAnswer(`🙌 Hello welcome to the *Chatbot*`, { media: "./foto.png" })
  .addAnswer(
    "Choose an option:",
    {
      capture: true,
      buttons: [{ body: "ChatGPT 🚀" }, { body: "Gemini 🚄" }],
    },
    null,
    [button1, button2]
  );

const main = async () => {
  const adapterFlow = createFlow([welcomeFlow]);
  const adapterProvider = createProvider(Provider, {
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v20.0",
  });
  const adapterDB = new Database();

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  adapterProvider.server.post(
    "/v1/messages",
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end("sended");
    })
  );

  adapterProvider.server.post(
    "/v1/register",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("REGISTER_FLOW", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/samples",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("SAMPLES", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/blacklist",
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body;
      if (intent === "remove") bot.blacklist.remove(number);
      if (intent === "add") bot.blacklist.add(number);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok", number, intent }));
    })
  );

  httpServer(+PORT);
};

main();
