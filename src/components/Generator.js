import { GoogleGenerativeAI } from "@google/generative-ai"
// require("dotenv").config()
// const apiKey = process.env.API_KEY

export default async function generateResponse(message) {
    const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_API_KEY}`)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Explain ${message} in 20 words`

    const result = await model.generateContent(prompt)
    console.log(result.response.text())
    return result.response.text()
}
