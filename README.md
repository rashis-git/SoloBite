<div align="center">

# 🍳 SoloBite

### Your fridge, one plate, fully fueled.

AI-powered recipes built for **one** — personalized nutrition, zero waste, zero leftovers rotting in the back of your fridge.

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

**[Live Demo](#) · [Features](#-features) · [Quick Start](#-quick-start) · [How It Works](#-how-it-works)**

</div>

<br/>

## 😤 The Problem

Ever tried cooking for one? Here's what that looks like:

| Pain Point | What Actually Happens |
|---|---|
| 🍲 Recipes serve 4-6 | You eat the same dal for 3 days straight |
| 🥬 Buying for one | Half your veggies rot before you touch them |
| 📊 "Eat healthy" advice | Generic. Doesn't know your weight, goals, or that you hate baingan |
| 🧮 Calorie tracking | A separate app, separate effort, separate headache |
| 🤔 "What to cook?" fatigue | Decision paralysis at 8 PM after a long day |

**SoloBite fixes all of this in one app.**

<br/>

## ✨ Features

### 🎯 Personalized Nutrition Engine
> Not generic "2000 cal/day" advice

7-step onboarding captures your body stats, activity level, and goals. Calculates **your** daily TDEE and per-meal macro targets using the Mifflin-St Jeor equation.

### 💬 One Smart Input
> Type. Snap. Speak. Done.

```
"I have eggs and some leftover rice"     → Egg fried rice (single portion)
📸 Photo of your fridge                   → Recipe from what it sees
🎤 "Something quick with high protein"   → 15-min paneer bhurji
```

No mode selection. No 20 questions. The AI figures out what you need.

### 🏪 Tiered Pantry System
> Because you won't type "salt" every time

| Tier | Examples | Shelf Life |
|------|----------|-----------|
| 🟢 **Always have** | Rice, oil, spices, dal | 6+ months |
| 🟡 **Usually have** | Onions, garlic, tomatoes | 2-4 weeks |

Drag-and-drop items between tiers during onboarding. The AI won't ask you to buy what's already in your kitchen.

### 📅 Weekly Meal Planning
> Sunday's leftover chicken → Monday's sandwich filling

Cross-optimized 7-day plans where ingredients thread across meals. Comes with a consolidated grocery list and estimated costs.

### 💡 Delta Suggestions
> Every recipe tells you what's possible

```
"Add paneer (+₹40) → +12g protein"
"Swap rice for quinoa → -80 cal, +6g protein"
```

Small upgrades, informed trade-offs.

### 🎥 YouTube Integration
Every recipe links to relevant cooking videos so you can watch along while you cook.

<br/>

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- [OpenRouter API key](https://openrouter.ai/keys) (free tier available)
- YouTube Data API key *(optional)*

### Setup

```bash
# Clone the repo
git clone https://github.com/rashis-git/SoloBite.git
cd SoloBite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add your keys to `.env.local`:
```env
OPENROUTER_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
```

```bash
# Run it
npm run dev
```

Open **http://localhost:3000** and start cooking! 🎉

> **💡 No API key?** SoloBite falls back to built-in demo recipes — the app always works.

<br/>

## 🔧 How It Works

```
┌─────────────────────────────────────────────────┐
│               LANDING PAGE (/)                   │
│  Hero + Features + Stats + How It Works + CTA    │
│  → "Get Started" → /login (Google OAuth)         │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│                  ONBOARDING                      │
│  Name → Body Stats → Activity → Diet →           │
│  Kitchen → Pantry (drag & drop) → Targets        │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│            HOME SCREEN (/app)                    │
│                                                  │
│  ┌─────────────────────┐  ┌──────────────────┐  │
│  │ 💬 Input / 📸 / 🎤   │  │ ⚡ Quick picks   │  │
│  │ 🍲 Leftovers        │  │ 💪 Protein       │  │
│  │ 📅 Plan My Week     │  │ 🍲 Comfort       │  │
│  └─────────────────────┘  └──────────────────┘  │
│     (main column)            (sidebar)           │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│              AI RECIPE ENGINE                    │
│                                                  │
│  User input + Profile + Pantry + Time of day     │
│          → OpenRouter (Gemini Flash)             │
│          → Personalized single-portion recipe    │
│          → Nutrition rings + Delta suggestions   │
│          → YouTube video links                   │
└─────────────────────────────────────────────────┘
```

<br/>

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── detect-ingredients/   🖼️  Image → ingredient list
│   │   ├── generate-recipe/      🍽️  Profile + input → recipe
│   │   ├── plan-week/            📅  7-day cross-optimized plan
│   │   └── search-videos/        🎥  Recipe → YouTube links
│   ├── app/                      🔒  Auth-gated route group
│   │   ├── page.tsx              🏠  Home screen
│   │   └── settings/page.tsx     ⚙️  User settings
│   ├── landing/page.tsx          🌐  Public landing page
│   ├── login/page.tsx            🔑  Split-layout login
│   ├── page.tsx                  🚦  Smart router (landing vs redirect)
│   └── middleware.ts             🛡️  Route protection
├── components/
│   ├── LandingPage.tsx           🌐  Landing page assembly
│   ├── landing/                  🎨  7 landing sections
│   │   ├── Navbar.tsx, Hero.tsx, Features.tsx,
│   │   ├── Stats.tsx, HowItWorks.tsx,
│   │   ├── CTASection.tsx, Footer.tsx
│   ├── OnboardingWizard.tsx      📋  7-step nutrition setup
│   ├── HomeScreen.tsx            🏠  Smart input (2-col desktop)
│   ├── RecipeCard.tsx            🍳  Recipe + nutrition sidebar
│   ├── WeeklyPlanView.tsx        📅  Multi-col meal plan
│   ├── SettingsView.tsx          ⚙️  2-col settings grid
│   └── NutritionRing.tsx         🔴  SVG ring visualization
└── lib/
    ├── ai-client.ts              🤖  OpenRouter API wrapper
    ├── prompts.ts                💬  AI prompt templates
    ├── nutrition.ts              📊  TDEE/BMR calculator
    ├── pantry-defaults.ts        🏪  Staples by cuisine palette
    ├── demo-data.ts              🎭  Fallback demo recipes
    ├── types.ts                  📝  TypeScript interfaces
    ├── storage.ts                💾  Supabase profile persistence
    └── supabase/                 🔐  Auth client + server helpers
```

<br/>

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | SSR + API routes in one project |
| **Language** | TypeScript | Type safety across the stack |
| **Styling** | Tailwind CSS 4 | `@theme inline` design tokens, utility-first |
| **Typography** | Epilogue + DM Sans | Distinctive display + readable body pairing |
| **Colors** | Amber / Teal / Cream | Warm food-app aesthetic (SepetBox-inspired) |
| **Auth** | Supabase (Google OAuth) | Managed auth, server-side sessions |
| **AI** | OpenRouter → Gemini 2.0 Flash | Fast, cheap, multimodal (text + images) |
| **Videos** | YouTube Data API v3 | Recipe video search |
| **Storage** | Supabase (profiles) + localStorage | Server-persisted profiles, local UI state |
| **Deploy** | Vercel | One-click from GitHub |

<br/>

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `YOUTUBE_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy ✅

<br/>

## 📄 License

MIT — do whatever you want with it.

<br/>

<div align="center">

---

Built with ☕ and too many solo dinners.

**[⬆ Back to top](#-solobite)**

</div>
