import { parse } from "postcss";
import React, { useState, useRef, useEffect } from "react";
// import "./ChatPage.css";
import loadingGif from "../assets/load-32_256.gif"
import ReactMarkdown from "react-markdown";

const MyAi = () => {
  // const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showResponse1, setShowResponse1] = useState([]);
  const [initialQueryText, setInitialQueryText] = useState();
  const [loaderToggle, setloaderToggle] = useState(false);
  const [errorLostNet, seterrorLostNet] = useState(false);
  const chatEndRef = useRef(null);


  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialQueryText]);

  const handleSend = async () => {



    setInitialQueryText(input)

    if (input.trim() === "") return;


    setloaderToggle(true)










    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
      "contents": [{
        "parts": [{ "text": input }]
      }]
    });

    try {
      let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA5hdlGKKy82-a8rK_jzUo0DUDhotKXkas", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      // Check if the response is successful (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      seterrorLostNet(false)
      let data = await response.json(); // safer than text + JSON.parse
      let responseResult = data?.candidates?.[0]?.content?.parts?.[0]?.text
      setShowResponse1([...showResponse1, { result: responseResult, question: input }])



    } catch (error) {
      console.error("❌ API Call Failed:", error.message);
      // You can also show error message in UI
      seterrorLostNet(true)
    }

    setInput("");
    setInitialQueryText("")
    setloaderToggle(false)

  };

  console.log(showResponse1)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000); // Hide after 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chat-container">

      <div className="chat-header">Welcome To Sam's  🤖 Ai</div>
      <div className="chat-body">


        {showResponse1.length !== 0 || loaderToggle ? showResponse1?.map((msg, index) => {

          return <>

            <div className="flex justify-end  w-[100%]">
              <span className="question-text">
                {msg?.question}
              </span>

            </div>
            <div key={index} className={`chat-message   `}>
              <ReactMarkdown>
                {msg?.result}
              </ReactMarkdown>
            </div>
          </>
        }) : <div className="flex justify-center h-[90%] items-center text-[30px]">
          👋 Welcome to the Chat!
        </div>}
        {errorLostNet  && <div className=" flex justify-center     text-[red] text-[20px]">
          Something   Went Wrong ❌
          <br />
          Please refrace the page
        </div>}
        <div className="flex justify-end  w-[100%]">
        <span className="question-text"> {initialQueryText}
          </span>
        </div>
        {loaderToggle && <div>
          <img src={loadingGif} alt="Loading..." width="70" />
        </div>}

        {/* <div ref={chatEndRef} /> */}
      </div>
      <div className="chat-footer">
        <textarea
          type="textarea"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div >
  );
};

export default MyAi;
