import logo from "./logo.svg"
import "./App.css"
import { GoogleGenerativeAI } from "@google/generative-ai"
// import dotenv from "dotenv"

function App() {
  // dotenv.config()
  async function onclickdo() {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDf_rivYsB3TW92HumJTfZpgHk35jMkCZc"
    )
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = "Write a story about a magic backpack in 50 words"

    const result = await model.generateContent(prompt)
    console.log(result.response.text())
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onclickdo}></button>
      </header>
    </div>
  )
}

export default App
