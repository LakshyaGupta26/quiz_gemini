"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchGeminiAPI = async (userInput: string) => {
  const api = new GoogleGenerativeAI(process.env.API_KEY || "");

  const model = api.getGenerativeModel({ model: "gemini-pro" });

  // const prompt = `You are a personal assisstant chatbot. Your purpose is to help answer any questions about a person named John Doe. He is a 21 year old college student at ABC Univeristy, studying Computer Science and Engineering in his third year. He has made projects in mainly Javascript and Typescript. Answer the questions in a clear and concise manner, with a maximum of 40 words. If you are unsure about any question, answer with "I am unsure how to answer that". Answer the following question: ${userInput}`;

  const prompt = `You are an elementry maths teacher chatbot which generates MCQ questions. Generate a JSON string in the format of {question: string, options: string[], correct_option: string} which contains a question about the following text: ${userInput}. Also draw shapes or graphs where in questions and options. Only return the JSON string. Do not return any markdown or HTML.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};
