import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState(""); // manage 'question'
  const [answer, setAnswer] = useState(""); // add 'answer' useState
  const [generatingAnswer, setGeneratingAnswer] = useState(false); // manage generating state

  async function generateAnswer(e) {
    //When func is called setGeneratingAnsser to true
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Generating your blog... \n Please wait a few seconds.");
    //Try-catch block
    try {
      //Response that comes from the gemini api 
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
          // In summary, import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT is fetching the value of the VITE_API_GENERATIVE_LANGUAGE_CLIENT environment variable, which could be used to configure API access or other settings in your Vite app.
          }`,
        // "POST" is used to send JSON data to the server.
        // Includes a body (e.g., data you're sending to the server)
        method: "post",
        data: {
          // The outermost object, likely a payload being sent to an API endpoint. 
          // It contains all the data that will be processed.
          contents: [
            {
              // The "contents" key is an array, implying there could be multiple content entries. 
              // Each entry contains an object with a "parts" array.
              parts: [
                // "parts" is another array inside the contents object. 
                // It is used to break down the content into smaller parts, such as requests or sections.
                { text: `Write a blog title about ${question}` } // Fix the data object
                // The "text" key holds the string or prompt being sent to the API.
                // The template literal (backticks: ` `) dynamically injects the value of the 'question' variable into the string.
                // For example, if 'question' is "climate change", the text will be: "Write a blog title about climate change".
              ]
            }
          ]
        }
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    //Sets the generating answer to false when answer is savesd in the setAnswer
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-50 to-green-100 h-screen p-3 flex flex-col justify-center items-center">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer">
            <h1 className="text-4xl font-bold text-green-500 mb-4 animate-bounce">Blog Generator</h1>
          </a>
          <textarea
            required
            className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-green-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the topic for the blog title"
          ></textarea>
          <button
            type="submit"
            className={`bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={generatingAnswer}
          >
            Generate Blog
          </button>
        </form>
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
          <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;
