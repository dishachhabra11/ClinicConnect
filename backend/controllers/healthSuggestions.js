import dotenv from "dotenv";
import { Mistral } from "@mistralai/mistralai";

// Load environment variables
dotenv.config();

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "", // API Key from .env file
});

async function run(req, res) {
  let symptoms = req.body.symptoms;
  console.log(symptoms);
  try {
    const result = await mistral.chat.complete({
      model: "mistral-small-latest", // Check if this is the correct model name
      messages: [
        {
          content: `I am having ${symptoms}. What healthcare tips can you suggest for me , you also suggest diet not to intake or exercises ?,  provide each suggestion with title and desctiption of sugggestion , seperate title and description by a $ and each suggestion is seperated by a @ sign so i can display it in a list format and do no give extra information , directly give the tips`,
          role: "user",
        },
      ],
    });

    // Display the result
    console.log("Health Suggestions:", result.choices[0].message.content);
    return res.status(200).json({ message: result.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching health suggestions:", error);
  }
}

export default run;
