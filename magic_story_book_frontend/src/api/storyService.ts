
import { Inputs } from '../components/types';

export const createStory = async (inputs: Inputs, token: string, userId: number) => {
  const url =  `${import.meta.env.VITE_BACKEND_URL}/api/stories/create`;

  const data = {
    genre: inputs.genre,
    setting: inputs.setting,
    characters: inputs.characters,
    title: inputs.title,
    specialMessage: inputs.specialMessage,
    ageRange: inputs.ageRange, 
    wordRange: inputs.wordRange,
    userId: userId 
  };

  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('errorData:', errorData.error);
      throw new Error('Error creating story: ' + errorData.error);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Error creating story: ' + (error as Error).message);
  }
};
