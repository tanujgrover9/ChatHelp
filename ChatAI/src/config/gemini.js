/* eslint-disable no-unused-vars */



import { api } from "../config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = api;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default run;

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.API_KEY;
// console.log(apiKey)

// const genAI = new GoogleGenerativeAI({ apiKey });

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   try {
//     const result = await chatSession.sendMessage(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// }

// export default run;

// import { GoogleGenerativeAI }  from "@google/generative-ai";

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// async function run() {
//     const prompt = "Write a story about an AI and magic"

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }

//   export default run;
