/* eslint-disable react/prop-types */
import  { createContext, useState, useRef, useCallback } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [shouldContinue, setShouldContinue] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRefs = useRef([]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const delayPara = useCallback(
    (index, nextWord) => {
      if (!shouldContinue) return;

      const timeoutId = setTimeout(() => {
        if (shouldContinue) {
          setResultData((prev) => prev + nextWord);
        }
      }, 75 * index);
      timeoutRefs.current.push(timeoutId);
    },
    [shouldContinue]
  );

  const newChat = () => {
    clearTimeouts();
    setLoading(false);
    setShowResult(false);
    setShouldContinue(true);
    setResultData("");
    setError(null);
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    stopProcessing();
    newChat();

    setInput("");
    setLoading(true);
    setShowResult(true);

    if (!prevPrompts.includes(prompt)) {
      setPrevPrompts((prev) => [...prev, prompt]);
    }

    setRecentPrompt(prompt);

    try {
      let response = await run(prompt);
      response = response.replace(/^##\s*/, "");

      // Format the response
      let formattedResponse = response
        .split("**")
        .map((part, index) => (index % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .replace(/\*/g, "<br/>")
        .replace(/```[^\n]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n+/g, '<br/>');

      const responseArray = formattedResponse.split(" ");
      responseArray.forEach((nextWord, index) =>
        delayPara(index, nextWord + " ")
      );
    } catch (err) {
      console.error("Error processing prompt:", err);
      setError(
        err.message.includes("RECITATION")
          ? "The response was blocked due to policy reasons. Please try rephrasing your prompt."
          : "An error occurred while processing your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const stopProcessing = () => {
    setShouldContinue(false);
    setLoading(false);
    clearTimeouts();
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    stopProcessing,
    error,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;