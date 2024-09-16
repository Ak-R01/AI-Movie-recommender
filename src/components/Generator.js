import { GoogleGenerativeAI } from "@google/generative-ai"

export default async function generateResponse(message) {
    const genAI = new GoogleGenerativeAI(
        "AIzaSyDf_rivYsB3TW92HumJTfZpgHk35jMkCZc"
    )
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Explain ${message} in 20 words`

    const result = await model.generateContent(prompt)
    console.log(result.response.text())
    const response = result.response.text()
    return result.response.text()
}
