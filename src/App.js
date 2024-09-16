// import logo from "./logo.svg"
import "./App.css"
// import { GoogleGenerativeAI } from "@google/generative-ai"
// import dotenv from "dotenv"
// import Chat from "./components/Chat"
import Background from "./components/background"

function App() {
    // dotenv.config()
    // async function onclickdo() {
    //   const genAI = new GoogleGenerativeAI(
    //     "AIzaSyDf_rivYsB3TW92HumJTfZpgHk35jMkCZc"
    //   )
    //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    //   const prompt = "Write a story about a magic backpack in 50 words"

    //   const result = await model.generateContent(prompt)
    //   console.log(result.response.text())
    // }
    return (
        <>
            {/* <Chat message="PLease Onigashimas retared" name="Fuckar"></Chat> */}
            <Background></Background>
        </>
    )
}

export default App
