// import logo from "./logo.svg"
import "./App.css"
// import { GoogleGenerativeAI } from "@google/generative-ai"
// import dotenv from "dotenv"
// import Chat from "./components/Chat"
import Background from "./components/background"

function App() {
    console.log(process.env.REACT_APP_API_KEY)
    return (
        <>
            {/* <Chat message="PLease Onigashimas retared" name="Fuckar"></Chat> */}
            <Background></Background>
        </>
    )
}

export default App
