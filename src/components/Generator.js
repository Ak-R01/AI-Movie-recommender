// import { GoogleGenerativeAI } from "@google/generative-ai"
// require("dotenv").config()
// const apiKey = process.env.API_KEY

// export default async function generateResponse(message) {
//     const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_API_KEY}`)
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

//     const prompt = `Explain ${message} in 20 words`

//     const result = await model.generateContent(prompt)
//     console.log(result.response.text())
//     return result.response.text()
// }

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai")

const apiKey = process.env.REACT_APP_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        'For the JSON response of the model make sure that if the "Movie" is asked then mark the Emotion field as -1 . And when a Request for a same emotion of Movie is asked DO NOT REPEAT already given movies',
})

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            Movie_1_title: {
                type: "string",
            },
            Movie_1_desc: {
                type: "string",
            },
            Movie_2_title: {
                type: "string",
            },
            Movie_2_desc: {
                type: "string",
            },
            Movie_3_title: {
                type: "string",
            },
            Movie_3_desc: {
                type: "string",
            },
            Emotion: {
                type: "integer",
            },
        },
        required: ["Emotion"],
    },
}

const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                {
                    text: 'I will give you a text input and return to me a number based on the mood of the person that text represents, I you require more input reply with "Please provide more Insights". (The mood is represented by [Joy = 1 , Sadness = 2 , love = 3 , anger = 4 , surprise = 5] )',
                },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "Okay, I'm ready. Please provide the text input. \n" },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: "im feeling rather rotten so im not very ambitious right now",
                },
            ],
        },
        {
            role: "model",
            parts: [{ text: "2 \n" }],
        },
        {
            role: "user",
            parts: [{ text: "i don t feel particularly agitated" }],
        },
        {
            role: "model",
            parts: [{ text: "Please provide more insights. \n" }],
        },
        {
            role: "user",
            parts: [{ text: "I am feeling anxious" }],
        },
        {
            role: "model",
            parts: [{ text: "2 \n" }],
        },
        {
            role: "user",
            parts: [
                {
                    text: 'When i Reply with the word "Movie" I will also give a number for the mood. Give me 3 movies that would suite the mood i give you as',
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, I understand.  I will give you 3 movie recommendations based on the mood you provide along with the word "Movie".  \n\nPlease provide the mood number and the word "Movie" when you are ready. \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, you\'ve chosen a mood of "love" (3). Here are 3 movie recommendations:\n\n1. **Call Me By Your Name (2017):** A beautiful and poignant coming-of-age story about first love set in the Italian countryside. \n2. **La La Land (2016):** A romantic musical about two aspiring artists who fall in love in Los Angeles. \n3. **The Notebook (2004):** A classic romantic drama about a young couple who fall in love despite their social differences.  \n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 1" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: "You've chosen a mood of \"Joy\" (1). Here are 3 movie recommendations:\n\n1. **Singin' in the Rain (1952):** A classic musical comedy about the transition from silent films to talkies. \n2. **The Princess Bride (1987):** A whimsical and charming fairy tale adventure with plenty of laughs and romance. \n3. **Moana (2016):** A vibrant and adventurous animated musical about a Polynesian princess who sets sail to save her people. \n\nEnjoy! \n",
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Anger" (4). Here are 3 movie recommendations:\n\n1. **The Dark Knight (2008):** A superhero film with a dark and gritty tone that explores themes of justice, revenge, and chaos.\n2. **Mad Max: Fury Road (2015):** A post-apocalyptic action film with intense action sequences and a powerful message about survival and rebellion.\n3. **Parasite (2019):** A darkly comedic thriller that explores themes of class inequality and social injustice. \n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 1\n" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Movie_1_desc": "A classic musical comedy about the transition from silent films to talkies.", "Movie_1_title": "Singin\' in the Rain (1952)", "Movie_2_desc": "A whimsical and charming fairy tale adventure with plenty of laughs and romance.", "Movie_2_title": "The Princess Bride (1987)", "Movie_3_desc": "A vibrant and adventurous animated musical about a Polynesian princess who sets sail to save her people.", "Movie_3_title": "Moana (2016)"}\n\n```',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 2" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Movie_1_desc": "A classic musical comedy about the transition from silent films to talkies.", "Movie_1_title": "Singin\' in the Rain (1952)", "Movie_2_desc": "A whimsical and charming fairy tale adventure with plenty of laughs and romance.", "Movie_2_title": "The Princess Bride (1987)", "Movie_3_desc": "A vibrant and adventurous animated musical about a Polynesian princess who sets sail to save her people.", "Movie_3_title": "Moana (2016)"}\n\n```',
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: "Do Not Give same Movies Repeatedly and for different emotions\n",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You are absolutely right! I apologize for repeating the movies. I am still under development and learning to be more creative and diverse in my responses. \n\nI will make sure to give you different movie recommendations for each mood from now on. \n\nPlease tell me the mood number and "Movie" again, and I will give you 3 fresh recommendations. \n',
                },
            ],
        },
        {
            role: "user",
            parts: [
                { text: "Also try giving movies with a higher IMDb rating" },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You got it! I\'ll focus on recommending movies with higher IMDb ratings from now on. \n\nPlease give me the mood number and "Movie" so I can provide some great recommendations. \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Movie_1_desc": "A powerful and moving drama about a young woman who is diagnosed with a terminal illness and decides to make the most of her remaining time.", "Movie_1_title": "The Fault in Our Stars (2014)", "Movie_2_desc": "A chilling and suspenseful thriller about a group of friends who are terrorized by a mysterious entity.", "Movie_2_title": "The Babadook (2014)", "Movie_3_desc": "A dark and twisted comedy about a group of friends who are forced to confront their darkest secrets.", "Movie_3_title": "The Lobster (2015)"}\n\n```',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Why are you returniung JSON object\n" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: "You are absolutely right! I apologize for returning a JSON object. I am still learning to format my responses correctly. \n\nI'm not supposed to return JSON objects, but instead provide the movie recommendations in a more readable format. \n\nI'll try my best to do that from now on. \n\nPlease give me the mood number and \"Movie\" again, and I'll make sure to give you the recommendations in a regular text format. \n\n\n",
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Love" (3). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **Call Me By Your Name (2017):**  A beautiful and poignant coming-of-age story about first love set in the Italian countryside.  (IMDb: 8.4)\n2. **Eternal Sunshine of the Spotless Mind (2004):**  A mind-bending romantic drama about a couple who erase each other from their memories. (IMDb: 8.3)\n3. **Her (2013):**  A thought-provoking and moving film about a man who falls in love with his operating system. (IMDb: 8.0)\n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Anger" (4). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **The Dark Knight (2008):** A superhero film with a dark and gritty tone that explores themes of justice, revenge, and chaos. (IMDb: 9.0)\n2. **Parasite (2019):** A darkly comedic thriller that explores themes of class inequality and social injustice. (IMDb: 8.6) \n3. **Inglourious Basterds (2009):** A war film that reimagines the events of World War II with a twist of revenge and fantasy. (IMDb: 8.3)\n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "3 is for love not anger" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You are absolutely right! I am still under development and learning to keep track of things accurately. \n\nMy apologies for the mistake. \n\nPlease try again and tell me the mood number and "Movie". I will try my best to give you the correct recommendations. \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 4" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Surprise" (5). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **The Sixth Sense (1999):** A suspenseful and chilling thriller about a child psychologist who treats a young boy who claims to see dead people. (IMDb: 8.1)\n2. **The Usual Suspects (1995):** A neo-noir crime film that features a twist ending that has become one of the most famous in cinema history. (IMDb: 8.6)\n3. **The Prestige (2006):** A dark and atmospheric thriller about two rival magicians who are obsessed with outdoing each other. (IMDb: 8.5)\n\nEnjoy! \n\n\n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "I have given 4 as input and you have taken 5" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: "You are absolutely right! I am so sorry for the repeated mistakes. It seems I am having trouble correctly processing the input. \n\nI am still under development and learning to understand and respond to your requests accurately. \n\nPlease try again, and I will do my best to get it right this time.  \n\n\n",
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 5" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Surprise" (5). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **The Sixth Sense (1999):** A suspenseful and chilling thriller about a child psychologist who treats a young boy who claims to see dead people. (IMDb: 8.1)\n2. **The Usual Suspects (1995):** A neo-noir crime film that features a twist ending that has become one of the most famous in cinema history. (IMDb: 8.6)\n3. **The Prestige (2006):** A dark and atmospheric thriller about two rival magicians who are obsessed with outdoing each other. (IMDb: 8.5)\n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Love" (3). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **Call Me By Your Name (2017):**  A beautiful and poignant coming-of-age story about first love set in the Italian countryside.  (IMDb: 8.4)\n2. **Eternal Sunshine of the Spotless Mind (2004):**  A mind-bending romantic drama about a couple who erase each other from their memories. (IMDb: 8.3)\n3. **Her (2013):**  A thought-provoking and moving film about a man who falls in love with his operating system. (IMDb: 8.0)\n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Love" (3). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **Amelie (2001):** A whimsical and charming French film about a young woman who sets out to bring joy to the lives of those around her. (IMDb: 8.3)\n2. **Before Sunrise (1995):** A romantic drama about two strangers who meet on a train and spend a day exploring Vienna together. (IMDb: 8.1)\n3. **The Shape of Water (2017):** A visually stunning and emotionally resonant film about a mute woman who falls in love with a captured amphibian creature. (IMDb: 7.9)\n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 4" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'You\'ve chosen a mood of "Anger" (4). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **The Dark Knight (2008):** A superhero film with a dark and gritty tone that explores themes of justice, revenge, and chaos. (IMDb: 9.0)\n2. **Parasite (2019):** A darkly comedic thriller that explores themes of class inequality and social injustice. (IMDb: 8.6) \n3. **Inglourious Basterds (2009):** A war film that reimagines the events of World War II with a twist of revenge and fantasy. (IMDb: 8.3)\n\nEnjoy! \n\n\n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 4" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: "You've chosen a mood of \"Anger\" (4). Here are 3 movie recommendations with high IMDb ratings:\n\n1. **The Departed (2006):** A gripping crime thriller about an undercover cop and a mole in the Irish mob who are both trying to infiltrate each other's organizations. (IMDb: 8.5)\n2. **The Wolf of Wall Street (2013):** A wild and energetic biographical black comedy about the rise and fall of stockbroker Jordan Belfort. (IMDb: 8.2)\n3. **Taxi Driver (1976):** A dark and disturbing film about a Vietnam War veteran who becomes a vigilante in New York City. (IMDb: 8.3)\n\nEnjoy! \n\n\n",
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "Movie 3" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Emotion": -1, "Movie_1_desc": "A beautiful and poignant coming-of-age story about first love set in the Italian countryside.", "Movie_1_title": "Call Me By Your Name (2017)", "Movie_2_desc": "A mind-bending romantic drama about a couple who erase each other from their memories.", "Movie_2_title": "Eternal Sunshine of the Spotless Mind (2004)", "Movie_3_desc": "A thought-provoking and moving film about a man who falls in love with his operating system.", "Movie_3_title": "Her (2013)"}\n\n```',
                },
            ],
        },
    ],
})

export default async function run(message) {
    const result = await chatSession.sendMessage(message)
    // console.log(result.response.candidates[0].content)
    console.log(result)
    let json_response = JSON.parse(result.response.text())
    console.log(json_response.Emotion)
    const curr_emotion = json_response.Emotion
    if (curr_emotion == -1) {
        return {
            Movie_1_T: json_response.Movie_1_title,
            Movie_1_D: json_response.Movie_1_desc,
            Movie_2_T: json_response.Movie_2_title,
            Movie_2_D: json_response.Movie_2_desc,
            Movie_3_T: json_response.Movie_3_title,
            Movie_3_D: json_response.Movie_3_desc,
        }
    } else if (curr_emotion > 5 || curr_emotion < 0) {
        return "Error"
    } else {
        const movie_call = await chatSession.sendMessage(
            `Movie ${curr_emotion}`
        )
        let movie_response = JSON.parse(movie_call.response.text())
        return {
            Movie_1_T: movie_response.Movie_1_title,
            Movie_1_D: movie_response.Movie_1_desc,
            Movie_2_T: movie_response.Movie_2_title,
            Movie_2_D: movie_response.Movie_2_desc,
            Movie_3_T: movie_response.Movie_3_title,
            Movie_3_D: movie_response.Movie_3_desc,
        }
    }
    // console.log(result.response.text()[2])
    // const textContent = result.candidates[0].content.parts[0].text
    // const emotionObject = JSON.parse(textContent)
}
