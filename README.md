# Magic Story Book
- [Magic story Book - Backend](https://github.com/VidaMaleki/MagicStoryBook_backend)

**Magic Story Book** is an interactive web application that allows children and parents to create personalized, AI-generated storybooks. Users can choose story elements like genre, characters, environment, and a special message to generate a magical story using OpenAI's language model.

This repository contains the frontend of the application, built with **React (Vite)**.

## ✨ Features

- 🎨 Clean and playful UI designed for kids and parents
- 🧙‍♂️ Personalize stories using:
  - Genre (e.g., adventure, mystery, fairy tale)
  - Main character(s)
  - Environment or place
  - A special message (e.g., a moral or dedication)
- 📖 AI-generated story displayed in real time
- ⚡ Fast performance using Vite as the build tool

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Java Spring Boot *(developed by teammate)*
- **AI Integration:** OpenAI API (GPT-based)

## 📂 Project Structure

magic-story-book-frontend/ ├── public/ ├── src/ │ ├── components/ │ ├── pages/ │ ├── services/ │ ├── App.jsx │ └── main.jsx ├── .gitignore ├── index.html ├── package.json └── vite.config.js

bash
Copy
Edit

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   <pre lang="markdown">
   git clone https://github.com/VidaMaleki/magic_story_book_ui.git
   cd magic-story-book-frontend </pre>
Install dependencies:

  `npm install`

Start the development server:

  `npm run dev`

The app will be available at http://localhost:5173/

🔗 Backend Integration
The frontend communicates with a Java Spring Boot backend, which handles:

Story generation using OpenAI
API endpoints for submitting user input and returning story content
Ensure the backend server is running and the API base URL is configured correctly in your frontend service files (e.g., using an .env file or a config object).

🤝 Team
Frontend Developer: Vida Ghorbannezhad Maleki


