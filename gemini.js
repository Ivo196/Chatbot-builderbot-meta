import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runCompletion2(prompt, text) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const res = await model.generateContent(`Propmt = ${prompt} /n Consulta o pregunta= ${text}`);
  return res.response.text()
}
