import axios from "axios";

export const getSignedUrl = async (imagePath: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/images/signed-url`,
    {
      params: { imagePath },
    }
  );
  return response.data.signedUrl;
};

export const extractContent = (str: string) => {
  const contentMatch = str.match(/content=(.*?),\s*refusal=null/);
  return contentMatch ? contentMatch[1] : null;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
