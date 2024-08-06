// api/storyService.ts
import axios from 'axios';
import { Inputs } from '../components/types';

export const createStory = async (inputs: Inputs, token: string) => {
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }
  console.log('inputs:', inputs, 'token:', token);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/stories/create`,
      {
        genre: inputs.genre,
        setting: inputs.setting,
        characters: inputs.characters,
        title: inputs.title,
        specialMessage: inputs.specialMessage,
        ageRange: inputs.ageRange, 
        wordRange: inputs.wordRange, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error('Error creating story: ' + error.response.data.error);
    } else {
      throw new Error('Error creating story: ' + (error as Error).message);
    }
  }
};
