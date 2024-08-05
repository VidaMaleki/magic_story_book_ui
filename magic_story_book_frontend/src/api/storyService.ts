import axios from 'axios';
import { Inputs } from '../components/types';

export const createStory = async (inputs: Inputs) => {
  // Retrieve the token from localStorage (or sessionStorage) where it was stored after login
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/stories/create`,
    {
      genre: inputs.genre,
      setting: inputs.setting,
      characters: inputs.characters,
      title: inputs.title,
      specialMessage: inputs.specialMessage,
      age: inputs.age,
      wordCount: inputs.wordCount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
