"use client";

import { useState } from "react";
import { fetchGeminiAPI } from "./server/api";

export type AIQuestion = {
  question: string;
  options: string[];
  correct_option: string;
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState<AIQuestion>();
  const [selectedOption, setSelectedOption] = useState<string>("");
  return (
    <main className="flex flex-col items-center gap-4">
      <input
        className="bg-neutral-800 px-4 py-2 rounded text-white"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const res = await fetchGeminiAPI(userInput);
          console.log(res);
          const question: AIQuestion = JSON.parse(res);
          setOutput(question);
        }}
      >
        Ask question
      </button>
      {output && (
        <>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold">{output.question}</h1>
          <ul className="flex flex-col items-center gap-2">
            {output.options.map((option, i) => (
              <li key={i}>
                <button
                  className={
                    selectedOption === option
                      ? "bg-blue-600 p-2 rounded"
                      : "bg-neutral-800 p-2 rounded"
                  }
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      <button
        onClick={async () => {
          if (output && selectedOption === output.correct_option) {
            alert("Correct!");

            const res = await fetchGeminiAPI(userInput);
            console.log(res);
            const question: AIQuestion = JSON.parse(res);
            setOutput(question);

          } else {
            alert("Incorrect!");
          }

        }}
        className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700"
      >
        Submit
      </button>
      </>
      )}
    </main>
  );
}
