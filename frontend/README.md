# Apollo Chatbot 🚀

A modern AI-powered chatbot application built with React and TypeScript, designed to assist JAMB students with university recommendations and application guidance.

## 📋 Project Overview

Apollo is an intelligent chatbot initially conceived to help JAMB (Joint Admissions and Matriculation Board) students upload their results and receive personalized university recommendations along with application guidance. Currently functioning as a general-purpose chatbot while the specialized features are being developed.

### 🎯 Planned Features

- **JAMB Result Analysis**: Upload and analyze JAMB results
- **University Recommendations**: AI-powered suggestions based on scores and preferences
- **Application Guidance**: Step-by-step guidance for university applications
- **Custom Backend Integration**: Currently learning backend development to implement proprietary backend solution

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database

- **Supabase** - Backend-as-a-Service for authentication and data storage
- **Google Authentication** - Secure user authentication

### AI Integration

- **Google Generative AI** - Chatbot intelligence and natural language processing
- **OpenAI** - Additional AI capabilities

### State Management & Forms

- **Redux Toolkit** - Application state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### UI/UX Libraries

- **Lucide React** - Modern icon library
- **React Icons** - Additional icon components
- **React Hot Toast** - Elegant notifications
- **LDRS** - Loading indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd apollo-web-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create .env.local file with your API keys
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Start the development server

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
apollo-web-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── store/         # Redux store configuration
│   ├── services/      # API services and integrations
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── ...config files
```

## 🔧 Development Status

**Current Phase**: General chatbot functionality with Google Authentication
**Next Phase**: Backend development and JAMB-specific features implementation
**Future Goals**: Complete university recommendation system for Nigerian students

## 🤝 Contributing

This project is currently in active development. Contributions, suggestions, and feedback are welcome!

## 📝 License

This project is private and not yet licensed for public use.

---

**Note**: This project is being actively developed as a learning experience in full-stack development, with particular focus on AI integration and educational technology.
