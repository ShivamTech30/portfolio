import React, { useState, useRef, useEffect } from "react";
import loadingGif from "../assets/load-32_256.gif";
import ReactMarkdown from "react-markdown";

const MyAi = () => {
  const [input, setInput] = useState("");
  const [showResponse1, setShowResponse1] = useState([]);
  const [initialQueryText, setInitialQueryText] = useState("");
  const [loaderToggle, setloaderToggle] = useState(false);
  const [errorLostNet, seterrorLostNet] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialQueryText, showResponse1]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const currentInput = input;
    setInitialQueryText(currentInput);
    setloaderToggle(true);
    setInput("");

    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    const bodyContent = JSON.stringify({
      "contents": [{
        "parts": [{ "text": currentInput }]
      }]
    });

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA5hdlGKKy82-a8rK_jzUo0DUDhotKXkas", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      seterrorLostNet(false);
      const data = await response.json();
      const responseResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setShowResponse1(prev => [...prev, { result: responseResult, question: currentInput }]);
    } catch (error) {
      console.error("❌ API Call Failed:", error.message);
      seterrorLostNet(true);
    } finally {
      setInitialQueryText("");
      setloaderToggle(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Welcome To Sam's 🤖 Ai</div>
      <div className="chat-body">
        {showResponse1.length !== 0 || loaderToggle ? (
          showResponse1.map((msg, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-end w-[100%] mb-2">
                <span className="question-text">
                  {msg?.question}
                </span>
              </div>
              <div className="chat-message mb-4">
                <ReactMarkdown>
                  {msg?.result}
                </ReactMarkdown>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="flex justify-center h-[90%] items-center text-[30px]">
            👋 Welcome to the Chat!
          </div>
        )}
        {errorLostNet && (
          <div className="flex justify-center text-[red] text-[20px] my-2">
            Something Went Wrong ❌
            <br />
            Please refresh the page
          </div>
        )}
        {initialQueryText && (
          <div className="flex justify-end w-[100%] mb-2">
            <span className="question-text">{initialQueryText}</span>
          </div>
        )}
        {loaderToggle && (
          <div className="flex items-center my-2">
            <img src={loadingGif} alt="Loading..." width="70" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-footer">
        <textarea
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MyAi;
