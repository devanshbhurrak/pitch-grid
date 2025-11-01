# PitchGrid

<div align="center">
  <img src="public/logo.png" alt="PitchGrid Logo" width="200"/>
  <p>Connect. Pitch. Grow.</p>
</div>

## 🎯 Overview

PitchGrid is a dynamic platform empowering entrepreneurs to showcase their startups, connect with fellow founders, and participate in virtual pitch competitions. Built with modern web technologies, it offers a seamless experience for startup enthusiasts.

## ✨ Key Features

- **Pitch Creation & Management**
  - Rich markdown editor for detailed pitches
  - Multi-media support (images, links)
  - Real-time preview
  - Category tagging system

- **Discovery & Engagement**
  - Advanced search functionality
  - Filtering by categories
  - View analytics
  - Engagement metrics

- **User Experience**
  - Secure GitHub authentication
  - Customizable user profiles
  - Startup portfolio showcase
  - Mobile-responsive design

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Radix UI
- React MD Editor

### Backend & Data
- Sanity CMS
- NextAuth.js
- Edge Functions

### DevOps & Monitoring
- Vercel Deployment
- Sentry Error Tracking
- GitHub Actions

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pitchgrid.git
cd pitchgrid
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Create .env.local file with:
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_token
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
pitchgrid/
├── app/                    # Next.js app router
│   ├── (root)/            # Main routes
│   ├── api/               # API endpoints
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # Reusable UI
│   └── features/         # Feature components
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript types
└── sanity/              # Sanity configuration
```

## 💾 Data Models

### Startup Schema
```typescript
{
  title: string;
  description: string;
  category: Reference;
  image: Image;
  pitch: PortableText;
  views: number;
  author: Reference;
  createdAt: DateTime;
}
```

### Author Schema
```typescript
{
  name: string;
  username: string;
  email: string;
  image: Image;
  bio: string;
  githubId: string;
  startups: Reference[];
}
```

## 🔒 Authentication Flow

1. User initiates login
2. Redirect to GitHub OAuth
3. GitHub returns user data
4. Create/update author profile
5. Establish session with NextAuth.js



## 🙏 Acknowledgments

- Next.js team for the incredible framework
- Sanity.io for the flexible CMS
- TailwindCSS team for the utility-first CSS
- Vercel for hosting and deployment
- All contributors to this project

---

<div align="center">
  Made with ❤️ by Devansh Bhurrak
</div>