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

export const extractContentFromResponse = (responseContent: string): string => {
  const parts = responseContent.split("content=");
  if (parts.length > 1) {
      return parts[1].split(", refusal")[0].trim();
  } else {
      return "No content found";
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
