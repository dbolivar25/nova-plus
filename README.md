# Nova+ AI Journal App

Nova+ is a personal development and journaling web application designed to help users reflect on their experiences, track their growth, and receive personalized insights. This application creates a sanctuary for self-reflection with an AI companion that provides guidance based on journal entries.

## Tech Stack

- **Next.js**: App Router for modern React applications
- **Clerk**: Authentication and user management
- **Shadcn UI**: Beautiful, accessible component library
- **TailwindCSS**: Utility-first CSS framework
- **Zod**: TypeScript-first schema validation
- **BAML**: AI function integration for journal analysis
- **Framer Motion**: Animation library for smooth UI transitions
- **Supabase**: Database and storage (coming soon)

## Features

- **User Authentication**: Secure sign-up and login with Clerk
- **Onboarding Process**: Personalized survey to understand user goals and habits
- **Journal Entry System**: Calendar-based interface for daily journaling
- **AI Assistant "Nova"**: Contextual chat interface with personalized responses
- **Weekly Feedback**: Pattern recognition and personalized recommendations
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- pnpm (v8.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd nova-plus
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```
   # Create a .env.local file with your Clerk API keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Notes

- All data is currently stored in localStorage for demonstration purposes
- BAML integration for AI analysis is in development
- Database integration with Supabase coming soon

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: UI components, including shadcn components in `components/ui/`
- `lib/`: Utility functions and shared code
- `hooks/`: Custom React hooks
- `baml/`: (Coming soon) BAML functions for AI analysis

## License

MIT

## Acknowledgments

- This project is inspired by the original Nova AI Journal concept
- Built with [shadcn/ui](https://ui.shadcn.com/)
- Authentication powered by [Clerk](https://clerk.com/)
