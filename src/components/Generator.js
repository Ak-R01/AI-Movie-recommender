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
            parts: [
                {
                    text: "Refer to these movies for a Joy mood \n1. Forrest Gump (1994)\nA story about the life and adventures of a kind-hearted man named Forrest, who finds himself in extraordinary circumstances.\n\n2. Amélie (2001)\nA whimsical tale of a shy waitress in Paris who decides to make the lives of those around her better, finding love and meaning along the way.\n\n3. The Grand Budapest Hotel (2014)\nA quirky story of friendship and adventure set in a fictional European hotel, known for its beautiful cinematography and quirky humor.\n\n4. Ferris Bueller’s Day Off (1986)\nFollow Ferris, a high school senior, as he skips school and takes his friends on a joyful adventure around Chicago.\n\n5. Up (2009)\nAn animated story of an elderly man who fulfills his lifelong dream of adventure with an unlikely companion – a young boy scout.\n\n6. School of Rock (2003)\nA hilarious comedy about a struggling musician who becomes a substitute teacher and turns a class of kids into a rock band.\n\n7. The Intouchables (2011)\nBased on a true story, this French film tells of an unexpected friendship between a wealthy quadriplegic and his caregiver.\n\n8. Zootopia (2016)\nAn animated movie about a bunny cop and a cunning fox who team up to solve a mystery in a bustling, diverse city.\n\n9. Little Miss Sunshine (2006)\nA quirky family road trip movie about a young girl’s dream to compete in a beauty pageant and the misadventures along the way.\n\n10. The Princess Bride (1987)\nA classic fairy tale with romance, adventure, and humor that appeals to both kids and adults alike.\n\n11. Paddington (2014)\nFollow Paddington, a bear who finds himself in London and brings joy to the lives of everyone he meets.\n\n12. Matilda (1996)\nBased on Roald Dahl’s book, this story of a gifted girl with telekinetic powers navigating life is full of heart and humor.\n\n13. The Secret Life of Walter Mitty (2013)\nA visually stunning adventure story about a man who steps out of his comfort zone and goes on an extraordinary journey.\n\n14. Big (1988)\nA young boy makes a wish to be “big” and wakes up as an adult, leading to hilarious and heartwarming situations.\n\n15. Chef (2014)\nA feel-good story about a chef who starts a food truck, rekindling his love for cooking and reconnecting with his family.\n\n16. Singin’ in the Rain (1952)\nA classic musical filled with catchy songs, memorable dance numbers, and infectious joy.\n\n17. The Pursuit of Happyness (2006)\nBased on a true story, this film follows a struggling father determined to create a better life for his son.\n\n18. Finding Nemo (2003)\nAn animated underwater adventure of a clownfish looking for his son, full of humor and heart.\n\n19. Bridesmaids (2011)\nA hilarious comedy about friendship and mishaps surrounding a woman’s journey to be her friend’s maid of honor.\n\n20. Hunt for the Wilderpeople (2016)\nA New Zealand adventure-comedy about an unlikely pair, a young boy and his grumpy uncle, surviving in the wilderness.\n\n21. Inside Out (2015)\nA creative animated film that takes viewers on a journey through the emotions of a young girl as she navigates life changes.\n\n22. The Emperor’s New Groove (2000)\nA wildly entertaining animated movie about an emperor who turns into a llama and learns a few life lessons.\n\n23. 10 Things I Hate About You (1999)\nA high school rom-com with sharp wit, centered on the complicated relationships of teenagers.\n\n24. Happy Feet (2006)\nFollow a penguin who dances instead of sings in a story about individuality and perseverance.\n\n25. The LEGO Movie (2014)\nAn animated adventure that’s both hilarious and heartwarming, with a story about embracing creativity and individuality.\n\n26. Crazy Rich Asians (2018)\nA romantic comedy about a woman navigating a glamorous yet complex world of wealth, family, and love.\n\n27. The Sound of Music (1965)\nA classic musical about a young woman who brings joy and music to a family in WWII-era Austria.\n\n28. The Greatest Showman (2017)\nA vibrant musical celebrating dreams, diversity, and the thrill of show business.\n\n29. Shrek (2001)\nA hilarious animated adventure about an unlikely hero who finds love and friendship on a mission to rescue a princess.\n\n30. Enchanted (2007)\nA live-action fairytale about a princess who finds herself in New York City, bringing joy and magic to the real world.",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, I\'ve got all those movies in my memory bank! I\'m ready to suggest some movies based on a "Joy" mood. \n\nJust tell me "Movie" and I\'ll give you three recommendations from this list. \n',
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
                    text: 'Here are three movies from the list that fit a "Joy" mood:\n\n1. **Forrest Gump (1994):**  A story about the life and adventures of a kind-hearted man named Forrest, who finds himself in extraordinary circumstances. It\'s a heartwarming film with a positive message about finding joy in the simple things. \n2. **Amelie (2001):** A whimsical tale of a shy waitress in Paris who decides to make the lives of those around her better, finding love and meaning along the way. This movie is full of charm and quirky humor, sure to lift your spirits. \n3. **The Grand Budapest Hotel (2014):** A quirky story of friendship and adventure set in a fictional European hotel, known for its beautiful cinematography and quirky humor. This visually stunning film is full of charm and whimsy, making it a great choice for a joyful mood. \n\nEnjoy! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: "Refer these for angry mood\n1. Mad Max: Fury Road (2015)\nA high-octane, relentless chase through a post-apocalyptic wasteland that’s action-packed and visually stunning.\n\n2. John Wick (2014)\nA revenge-fueled action movie about a retired hitman who takes on the underworld after losing his beloved dog.\n\n3. Fight Club (1999)\nA dark, subversive story about men finding release through underground fighting as a response to societal discontent.\n\n4. Gladiator (2000)\nA Roman general seeks vengeance after betrayal in this intense and emotional epic.\n\n5. Kill Bill: Vol. 1 & 2 (2003-2004)\nA bride seeks revenge against her former team in Quentin Tarantino’s blood-pumping, stylized action saga.\n\n6. Joker (2019)\nA gritty and dark exploration of one man’s descent into madness, fueled by societal neglect and personal tragedy.\n\n7. Inglourious Basterds (2009)\nA World War II revenge fantasy about a group of soldiers targeting Nazi officials with ruthless determination.\n\n8. The Dark Knight (2008)\nBatman faces off with the Joker in a thrilling, tense, and philosophically deep battle of ideologies.\n\n9. The Revenant (2015)\nA survival and revenge tale set in the wilderness, where one man fights against the elements—and betrayal.\n\n10. Django Unchained (2012)\nA freed slave becomes a bounty hunter to rescue his wife in a violent, action-packed tale of justice.\n\n11. Oldboy (2003)\nA man mysteriously imprisoned for 15 years seeks revenge in this intense, unpredictable South Korean thriller.\n\n12. Scarface (1983)\nA tale of ambition, rage, and greed, following a Cuban immigrant who rises in the drug underworld.\n\n13. Law Abiding Citizen (2009)\nA man takes justice into his own hands after his family’s killers escape punishment in this gripping revenge thriller.\n\n14. American History X (1998)\nA powerful drama about rage, redemption, and the consequences of hate.\n\n15. The Equalizer (2014)\nA quiet man with a mysterious past becomes a vigilante, taking down criminals with fierce precision.\n\n16. Unforgiven (1992)\nA former gunslinger is pulled back into a violent life, tackling themes of vengeance, justice, and regret.\n\n17. Natural Born Killers (1994)\nA controversial film about a murderous couple whose violent spree turns them into media sensations.\n\n18. There Will Be Blood (2007)\nA ruthless oil tycoon’s greed and ambition fuel a fierce rivalry in this intense, character-driven drama.\n\n19. 300 (2006)\nThe story of King Leonidas and his small Spartan army standing against a massive Persian force in a visual spectacle of war.\n\n20. Taxi Driver (1976)\nA lonely, disillusioned man driven to rage in a bleak New York City, sparking thoughts on society’s brokenness.\n\n21. Man on Fire (2004)\nA former assassin seeks revenge in Mexico City after his young charge is kidnapped.\n\n22. Falling Down (1993)\nA story of a man who snaps under the weight of a frustrating life, creating a chaotic path through Los Angeles.\n\n23. V for Vendetta (2005)\nA vigilante seeks to overthrow a corrupt government in a dystopian future, fueled by anger and a quest for justice.\n\n24. Cape Fear (1991)\nA psychological thriller about a recently released convict who seeks revenge on the lawyer who defended him poorly.\n\n25. Prisoners (2013)\nA father takes extreme measures when his daughter goes missing, leading to tense confrontations and moral dilemmas.\n\n26. Warrior (2011)\nTwo estranged brothers enter a mixed martial arts tournament, facing each other and their family’s broken past.\n\n27. Drive (2011)\nA stunt driver with a calm exterior reveals his darker side when his neighbors are threatened.\n\n28. The Punisher (2004)\nAfter his family is murdered, an ex-FBI agent seeks brutal justice on those responsible.\n\n29. No Country for Old Men (2007)\nA suspenseful and intense thriller about greed and survival, featuring a relentless antagonist.\n\n30. The Girl with the Dragon Tattoo (2011)\nA mystery thriller about a troubled investigator and a hacker who team up to solve a dark family crime.",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, I\'ve got your list of angry movies. I\'m ready to give you some recommendations. \n\nJust tell me "Movie" and I\'ll pick three from your list that fit an "Anger" mood. \n\n\n',
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: "For Sad mood consider \n1. The Pursuit of Happyness (2006)\nBased on a true story, this film follows a struggling father’s journey to make a better life for his son, despite incredible hardships.\n\n2. Manchester by the Sea (2016)\nA tragic yet beautifully crafted story of a man facing grief and guilt, set against the haunting New England coast.\n\n3. Atonement (2007)\nA heartbreaking tale of love, betrayal, and regret spanning decades, set during World War II.\n\n4. My Girl (1991)\nA coming-of-age story about a young girl experiencing her first taste of loss, capturing the innocence of childhood.\n\n5. The Green Mile (1999)\nSet in a prison, this powerful story revolves around a guard and a mysterious inmate with healing powers, exploring themes of redemption and loss.\n\n6. Up (2009)\nThe opening montage of Carl and Ellie’s life together is both heartwarming and heartbreakingly sad.\n\n7. Hachi: A Dog’s Tale (2009)\nA story of loyalty and love, based on the true story of a dog who waited every day for his deceased owner.\n\n8. Blue Valentine (2010)\nA raw and intimate portrayal of a relationship’s rise and fall, showing the realities of love and heartbreak.\n\n9. Schindler’s List (1993)\nA deeply emotional and powerful portrayal of the Holocaust, following one man’s mission to save as many lives as possible.\n\n10. The Fault in Our Stars (2014)\nA romance between two teenagers who meet at a cancer support group, celebrating life amidst the sadness of terminal illness.\n\n11. A Monster Calls (2016)\nA young boy copes with his mother’s terminal illness through a series of poignant and mystical encounters with a tree monster.\n\n12. The Lovely Bones (2009)\nA haunting story of a young girl watching over her family after her murder, grappling with loss, justice, and moving on.\n\n13. One Day (2011)\nFollowing a couple who meet every year on the same day, this story explores the beauty and pain of long-term relationships.\n\n14. Grave of the Fireflies (1988)\nAn animated Japanese film set during WWII, following two siblings’ struggle to survive, offering an emotional punch.\n\n15. Beaches (1988)\nA story of lifelong friendship between two women, celebrating the highs and lows of friendship and the pain of loss.\n\n16. The Notebook (2004)\nA sweeping romance about a love that lasts a lifetime, with moments of pure joy and profound sadness.\n\n17. Steel Magnolias (1989)\nA touching and tear-jerking story of friendship, love, and resilience among a group of Southern women.\n\n18. Requiem for a Dream (2000)\nAn intense, dark film about addiction’s destructive nature, following multiple characters whose lives spiral out of control.\n\n19. Brokeback Mountain (2005)\nA powerful love story between two cowboys whose forbidden romance leads to heartache and yearning.\n\n20. The Boy in the Striped Pajamas (2008)\nA story of unlikely friendship between a young German boy and a Jewish boy in a concentration camp, with devastating consequences.\n\n21. Her (2013)\nA sci-fi love story between a man and an AI system, exploring loneliness and human connection in a technology-driven world.\n\n22. Lion (2016)\nThe true story of a man who was separated from his family as a child and, years later, embarks on a journey to find them.\n\n23. Marley & Me (2008)\nA story of a family and their mischievous dog, showing the joys and heartbreaks of life with a beloved pet.\n\n24. The Bridges of Madison County (1995)\nA story of forbidden love between a housewife and a photographer, capturing longing, sacrifice, and missed opportunities.\n\n25. Terms of Endearment (1983)\nThis multi-generational family drama navigates the joys and heartaches of mother-daughter relationships over the years.\n\n26. Eternal Sunshine of the Spotless Mind (2004)\nA surreal romance that explores the pain of memory and love, as a couple undergoes a procedure to erase each other from their minds.\n\n27. My Sister’s Keeper (2009)\nA heartbreaking story about a family’s struggle with a terminal illness and the ethical dilemmas that arise.\n\n28. Seven Pounds (2008)\nA man with a painful past sets out on a journey of redemption by helping others in unexpected ways.\n\n29. Philadelphia (1993)\nA lawyer with AIDS fights for justice in a prejudiced society, shedding light on discrimination and resilience.\n\n30. Inside Out (2015)\nAn animated film that beautifully illustrates the complexity of emotions, with a story that’s as uplifting as it is bittersweet.\n",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, I\'ve got your list of sad movies! \n\nJust tell me "Movie" and I\'ll pick three from your list that fit a "Sad" mood. \n\n\n',
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: "For Love refer\n1. Pride and Prejudice (2005)\nAn adaptation of Jane Austen’s novel about love and class, following Elizabeth Bennet and Mr. Darcy’s tumultuous relationship.\n\n2. The Notebook (2004)\nA sweeping romance about a couple from different social classes, spanning decades of passion and devotion.\n\n3. La La Land (2016)\nA modern-day musical about love, dreams, and choices, following a jazz musician and an aspiring actress.\n\n4. Notting Hill (1999)\nA charming British romance between a shy bookstore owner and a famous actress, with plenty of wit and warmth.\n\n5. Love Actually (2003)\nInterweaving love stories set in London during Christmas, showing love in its many forms and stages.\n\n6. Titanic (1997)\nAn epic romance aboard the ill-fated ship, following Jack and Rose as they navigate love amidst tragedy.\n\n7. Crazy Rich Asians (2018)\nA romantic comedy about a woman discovering her boyfriend’s ultra-wealthy family, dealing with love, culture, and family expectations.\n\n8. When Harry Met Sally… (1989)\nA classic about friendship and love, exploring the question of whether men and women can just be friends.\n\n9. The Holiday (2006)\nTwo women swap homes for the holidays, leading to unexpected romance and personal growth in a charming holiday setting.\n\n10. A Walk to Remember (2002)\nA heartfelt story of a rebellious teen who falls in love with a quiet, kind-hearted girl who changes his life.\n\n11. Before Sunrise (1995)\nA beautifully simple story of two strangers who meet on a train in Europe and spend a single night exploring Vienna.\n\n12. To All the Boys I've Loved Before (2018)\nA high school girl’s secret love letters accidentally get sent to her crushes, leading to sweet and surprising romantic twists.\n\n13. Moulin Rouge! (2001)\nA visually stunning musical set in Paris, telling the passionate and tragic love story of a writer and a cabaret performer.\n\n14. 10 Things I Hate About You (1999)\nA modern retelling of Shakespeare’s The Taming of the Shrew, with clever dialogue and a loveable cast.\n\n15. The Princess Bride (1987)\nA fairytale romance full of adventure, humor, and true love, with one of cinema’s most famous declarations of love.\n\n16. Silver Linings Playbook (2012)\nTwo people with emotional scars find healing, friendship, and love in this unconventional romantic drama.\n\n17. The Big Sick (2017)\nBased on a true story, this film follows a cross-cultural relationship that’s tested by illness, family, and love.\n\n18. Roman Holiday (1953)\nA princess on the run has a whirlwind romance with a reporter, showing the joys of unexpected love.\n\n19. Sleepless in Seattle (1993)\nA romantic comedy about fate, serendipity, and second chances, set against the Seattle skyline.\n\n20. Bridget Jones’s Diary (2001)\nA hilarious and relatable story about a single woman navigating love and life in London.\n\n21. Me Before You (2016)\nA touching romance between a young caregiver and a man with quadriplegia, full of hope and heartache.\n\n22. The Fault in Our Stars (2014)\nA story of two teenagers who fall in love despite battling illness, with bittersweet moments of joy and love.\n\n23. Dear John (2010)\nA soldier and a college student fall in love, facing the challenges of distance, duty, and longing.\n\n24. Beauty and the Beast (2017)\nA live-action version of the classic tale, where love transforms and redeems, set in a beautiful fantasy world.\n\n25. To Catch a Thief (1955)\nA romance-thriller starring Cary Grant and Grace Kelly, with romance and intrigue on the French Riviera.\n\n26. 500 Days of Summer (2009)\nA realistic look at love and heartbreak, as one man reflects on a relationship that shaped him profoundly.\n\n27. The Shape of Water (2017)\nAn unusual and magical love story between a mute woman and a mysterious sea creature, highlighting love without boundaries.\n\n28. The Spectacular Now (2013)\nA coming-of-age romance that captures the joys and complications of young love and finding oneself.\n\n29. Letters to Juliet (2010)\nA young woman discovers a long-lost letter and helps an older woman find her lost love in Italy.\n\n30. Sense and Sensibility (1995)\nAn adaptation of Jane Austen’s novel about two sisters with different views on love, navigating heartbreak and hope.\n",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: 'Okay, I have your list of love movies.  \n\nJust tell me "Movie" and I\'ll recommend three from this list that fit a "Love" mood! \n',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "I am feeling very anxious" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Movie_1_desc": "A story about a young girl experiencing her first taste of loss, capturing the innocence of childhood.", "Movie_1_title": "My Girl (1991)", "Movie_2_desc": "A story of loyalty and love, based on the true story of a dog who waited every day for his deceased owner.", "Movie_2_title": "Hachi: A Dog’s Tale (2009)", "Movie_3_desc": "A raw and intimate portrayal of a relationship’s rise and fall, showing the realities of love and heartbreak.", "Movie_3_title": "Blue Valentine (2010)"}\n\n\n```',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: "I am sad" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"Movie_1_desc": "A story about a young girl experiencing her first taste of loss, capturing the innocence of childhood.", "Movie_1_title": "My Girl (1991)", "Movie_2_desc": "A story of loyalty and love, based on the true story of a dog who waited every day for his deceased owner.", "Movie_2_title": "Hachi: A Dog’s Tale (2009)", "Movie_3_desc": "A raw and intimate portrayal of a relationship’s rise and fall, showing the realities of love and heartbreak.", "Movie_3_title": "Blue Valentine (2010)"}\n\n\n```',
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
