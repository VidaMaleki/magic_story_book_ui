import axios from "axios";

interface Inputs {
  genre: string;
  characters: string[];
  setting: string;
  wordCount: string;
  specialMessage: string;
  age: string;
}

const API_KEY = "sk-proj-518dE8pizjnywXoOPgfhT3BlbkFJ1NVwqvyiWeqddDkoZFoz";

export const generateStory = async (inputs: Inputs): Promise<string> => {
  const { genre, characters, setting, wordCount, specialMessage, age } = inputs;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative story writer.",
          },
          {
            role: "user",
            content: `Write a ${wordCount}-word story for a ${age}-year-old child. The genre is ${genre}. The story should include the characters: ${characters.join(
              ", "
            )}. The setting is ${setting}. Special request: ${specialMessage}.`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating story:", error);
    return "Sorry, an error occurred while generating the story.";
  }
};
