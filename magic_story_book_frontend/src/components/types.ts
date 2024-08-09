export interface Inputs {
  genre: string;
  characters: string[];
  setting: string;
  wordRange: string;
  specialMessage: string;
  ageRange: string;
  title: string;
}

export interface Story {
  id: number;
  title: string;
  image: string;
  content: string;
}

export interface LibraryProps {
  title: string;
  image: string;
  content: string;
}

export interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}