# 🚀 Cogniva - Instant AI Learning Platform

> **Part of IB's Dev World Project Series**

An AI-powered learning companion that delivers personalized tutoring for any subject in 2-60 minute focused sessions. Perfect for students cramming before exams, professionals preparing for interviews, or anyone needing instant knowledge access.

## ✨ Key Features

- 🤖 **Custom AI Companions** - Create personalized tutors in 60 seconds
- 🎙️ **Voice-Powered Learning** - Natural conversations with AI tutors using Vapi
- ⚡ **Instant Access** - From 2-minute quick reviews to 60-minute deep dives
- 📚 **7 Core Subjects** - Interview, Coding, CS Fundamentals, Math, Science, Communication, ML
- 📈 **Progress Tracking** - Gamified learning journey with detailed analytics
- 💾 **Personal Library** - Your custom tutors available 24/7

## 🎯 Perfect For

- Students preparing for exams with limited time
- Job seekers needing quick interview preparation
- Professionals requiring focused skill refreshers
- Anyone wanting personalized learning on-demand

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase
- **Voice AI**: Vapi
- **Payments**: Stripe
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm/yarn/pnpm/bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cogniva.git
   cd cogniva
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Vapi Voice AI
   VAPI_API_KEY=your_vapi_api_key

   # Stripe
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### Creating Your First AI Companion

1. **Sign up/Login** using Clerk authentication
2. **Navigate to "Build & Personalize"** section
3. **Choose your subject** from 7 core categories
4. **Configure your tutor** - name, description, voice, teaching style
5. **Set session duration** (2-60 minutes)
6. **Click "Build Your Companion"** - ready in seconds!

### Starting a Learning Session

1. **Go to your Companion Library**
2. **Select any companion**
3. **Click "Launch Lesson"**
4. **Start voice conversation** with your AI tutor
5. **Learn naturally** through conversation

## 🎨 Project Structure

```
cogniva/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── companions/        # Companion management
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                 # Utility functions
├── public/              # Static assets
└── types/               # TypeScript definitions
cogniva-saas/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API Routes
│   │   └── sentry-example-api/
│   │       └── route.ts   # Example API endpoint
│   ├── companions/        # AI Companion Management
│   │   ├── [id]/         # Dynamic companion routes
│   │   │   └── page.tsx  # Individual companion page
│   │   ├── new/          # Create new companion
│   │   │   └── page.tsx
│   │   └── page.tsx      # Companions listing
│   ├── my-journey/       # User progress tracking
│   │   └── page.tsx
│   ├── sign-in/          # Authentication
│   │   └── [[...sign-in]]/
│   │       └── page.tsx  # Clerk auth integration
│   ├── subscription/     # Subscription management
│   │   └── page.tsx
│   ├── sentry-example-page/  # Error monitoring
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── global-error.tsx  # Global error boundary
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable React Components
│   ├── ui/              # Shadcn/ui Component Library
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── textarea.tsx
│   ├── CTA.tsx          # Call-to-action component
│   ├── CompanionCard.tsx    # AI companion card
│   ├── CompanionComponent.tsx   # Main companion interface
│   ├── CompanionForm.tsx    # Companion creation form
│   ├── CompanionsList.tsx   # List of companions
│   ├── NavItems.tsx     # Navigation items
│   ├── Navbar.tsx       # Main navigation
│   ├── SearchInput.tsx  # Search functionality
│   └── SubjectFilter.tsx    # Subject filtering
├── lib/                 # Core Business Logic
│   ├── actions/         # Server actions
│   │   └── companion.actions.ts  # Companion CRUD operations
│   ├── supabase.ts      # Supabase client configuration
│   ├── utils.ts         # Utility functions
│   └── vapi.sdk.ts      # Vapi SDK integration
├── types/               # TypeScript Definitions
│   ├── index.d.ts       # Global type definitions
│   └── vapi.d.ts        # Vapi-specific types
├── constants/           # Application Constants
│   ├── index.ts         # General constants
│   └── soundwaves.json  # Audio visualization data
├── public/              # Static Assets
│   ├── icons/           # SVG icons
│   │   ├── bookmark-filled.svg
│   │   ├── bookmark.svg
│   │   ├── coding.svg
│   │   ├── maths.svg
│   │   ├── mic-off.svg
│   │   ├── mic-on.svg
│   │   └── [other icons]
│   ├── images/          # Static images
│   │   ├── cta.svg
│   │   ├── logo.svg
│   │   └── limit.svg
│   └── readme/          # Documentation assets
├── middleware.ts        # Next.js middleware
├── instrumentation.ts   # Monitoring setup
├── sentry.*.config.ts   # Error monitoring config
└── components.json      # Shadcn/ui configuration
```

## 💡 How It Works
@@ -138,17 +202,16 @@
## 🚀 Deployment

### Deploy on Vercel (Recommended)
Push to GitHub repository
Connect to Netlify - netlify.com/start
Add environment variables in Netlify dashboard under Site settings > Environment variables
Deploy - Automatic deployment on every push

1. **Push to GitHub** repository
2. **Connect to Vercel/netlify** - [vercel.com/new](https://vercel.com/new)
3. **Add environment variables** in Vercel dashboard
4. **Deploy** - Automatic deployment on every push
Alternative Deployment Options

### Alternative Deployment Options

- **Netlify**: Connect your repo and deploy
- **Railway**: Simple deployment with database included
- **Docker**: Use provided Dockerfile for containerization
Vercel: Connect your repo for seamless Next.js deployment
Railway: Simple deployment with database included
Docker: Use provided Dockerfile for containerization

## 🤝 Contributing

@@ -159,11 +222,7 @@
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

6. 
## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
@@ -174,10 +233,10 @@

## 📞 Contact & Support

- **Developer**: Ikram Banadar - Part of IB's Dev World
- **Email**: ikrambanadar04@gmail.com
- **Twitter**: [@YourTwitter]
- **Developer**: Ikram Banadar - IB's Dev World
- **Email**: ikrambanadar04@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ikrambanadarwebdev/
 
