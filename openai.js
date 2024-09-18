import { config } from "dotenv";
import OpenAI from "openai";

config();
const api = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: api,
});

export async function runCompletion(prompt, text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 100,
    temperature: 0.7,
    messages: [
      { role: 'system', content:prompt},
      { role: 'user', content:text}
    
    ],
  });
  return response.choices[0].message.content;
}

// const response = await runCompletion("Eres un vendedor de autos", 'Que sabes?');
// console.log(response);
