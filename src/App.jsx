import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading..");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBwRJ-crKN8cyEXD_6Tj36dF9dxJcclZRc",
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <>
      <div className="w-full"></div>
      <h1 className="bg-blue-300">Chat AI</h1>
      <textarea
        className="border rounded w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask anything to me"
      ></textarea>
      <button onClick={generateAnswer}>Generate answer</button>
      <pre> {answer}</pre>
    </>
  );
}

export default App;
