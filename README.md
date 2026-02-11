# SoloBite

**Your fridge, one plate, fully fueled.**

SoloBite is an AI-powered Progressive Web App that generates nutritionally-complete, single-portion recipes for solo diners. It calculates personalized nutrition targets, knows what's already in your pantry, and suggests meals that minimize waste and grocery spending.

## The Problem

Solo diners face a unique set of challenges that recipe apps ignore:
- Standard recipes serve 4-6 — scaling down breaks ratios and wastes ingredients
- Buying for one means half the vegetables rot before you use them
- No one tracks whether Tuesday's leftover dal can become Wednesday's dal paratha
- Generic "healthy eating" advice doesn't account for individual calorie/protein needs

## What SoloBite Does

### Personalized Nutrition Onboarding
7-step setup captures body stats, activity level, and goals. Calculates daily TDEE and per-meal macro targets using the Mifflin-St Jeor equation.

### Smart Single Input
One input field — type what you have, snap a photo of your fridge, or use voice. The AI figures out the intent and generates a recipe matched to your profile.

### Tiered Pantry System
- **Always available** (6+ month shelf life) — rice, spices, oil
- **Usually available** (2-4 week shelf life) — onions, garlic, tomatoes

Drag-and-drop items between tiers. The AI won't suggest buying what you already have.

### Weekly Meal Planning
Cross-optimized 7-day plans where Sunday's leftover chicken becomes Monday's sandwich filling. Generates a consolidated grocery list with estimated costs.

### Delta Suggestions
Every recipe shows: "Add paneer for Rs 40 to boost protein by 12g" — so you make informed trade-offs.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4
- **AI:** OpenRouter API (Gemini 2.0 Flash)
- **Video:** YouTube Data API v3
- **Storage:** localStorage (no backend DB)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- OpenRouter API key ([get one here](https://openrouter.ai/keys))
- YouTube Data API key (optional, for recipe videos)

### Setup

```bash
git clone https://github.com/rashis-git/SoloBite.git
cd SoloBite
npm install
```

Create a `.env.local` file:

```
OPENROUTER_API_KEY=your_openrouter_key
YOUTUBE_API_KEY=your_youtube_key
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Mode

If no API key is configured or the AI call fails, SoloBite falls back to built-in demo recipes so the app always works.

## Project Structure

```
src/
  app/
    api/
      detect-ingredients/   # Image -> ingredient list (vision AI)
      generate-recipe/      # Profile + input -> single recipe
      plan-week/            # Profile + prefs -> 7-day meal plan
      search-videos/        # Recipe name -> YouTube links
    page.tsx                # Entry point (onboarding or home)
  components/
    OnboardingWizard.tsx    # 7-step nutrition setup
    HomeScreen.tsx          # Smart input + quick picks + leftovers
    RecipeCard.tsx          # Recipe display with nutrition rings
    WeeklyPlanView.tsx      # Meal plan + grocery list + ingredient threads
    NutritionRing.tsx       # SVG ring visualization
  lib/
    ai-client.ts            # OpenRouter API wrapper
    prompts.ts              # AI prompt templates
    nutrition.ts            # TDEE/BMR calculator
    pantry-defaults.ts      # Pantry staples by cuisine palette
    demo-data.ts            # Fallback demo recipes
    types.ts                # TypeScript interfaces
    storage.ts              # localStorage helpers
```

## Deploy to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables (`OPENROUTER_API_KEY`, `YOUTUBE_API_KEY`)
4. Deploy

## License

MIT
