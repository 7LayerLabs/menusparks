# Reference Project Analysis: MenuSpark Standalone

**Source:** https://github.com/7LayerLabs/apprecreation
**Date Analyzed:** October 11, 2025

## What It Is

MenuSpark Standalone is a flexible, AI-powered menu optimization tool for restaurants that works with multiple AI providers. It helps restaurants generate innovative recipes and manage menu creation using artificial intelligence.

## Core Capabilities

1. **Multi-Provider AI Support**
   - OpenAI
   - Anthropic Claude
   - Google Gemini
   - Local endpoints

2. **Recipe Generation Modes**
   - Inventory-based recipe generation (use what you have)
   - Creative recipe brainstorming (concept to recipe)
   - Menu analysis

3. **Professional Kitchen Workflow**
   - Mise en Place documentation
   - Pre-Service Prep instructions
   - Pick-up/Service instructions

4. **Client Profile Management**
   - Multiple client profiles
   - Local browser storage
   - Client-specific configurations

5. **Recipe Export**
   - PDF export
   - Image export
   - Print-friendly formatting

## Tech Stack

```json
{
  "Frontend": "React 18.2.0",
  "Build Tool": "Vite 5.0.8",
  "Language": "TypeScript 5.2.2",
  "Styling": "Tailwind CSS 3.3.0",
  "Icons": "Lucide React 0.294.0",
  "PDF Generation": "jsPDF 2.5.1 + html2canvas 1.4.1",
  "AI SDKs": [
    "openai: 4.20.0",
    "@anthropic-ai/sdk: 0.15.0",
    "axios: 1.6.2 (for custom endpoints)"
  ]
}
```

## Project Structure

```
src/
├── components/       # React UI components
├── lib/             # Utility libraries & shared code
├── services/        # AI service integrations & API logic
├── utils/           # Helper functions
├── App.tsx          # Main application component
├── index.css        # Global styles
├── main.tsx         # React entry point
└── types.ts         # TypeScript type definitions
```

## Key Configuration Options

### Recipe Generation
- **Style:** Creative, Classic, Hybrid
- **Complexity:** Basic, Intermediate, Chef-level
- **Decade Focus:** 1950s - 2020s (for Classic/Hybrid)
- **Restaurant Types:** Italian, Food Truck, Fine Dining, Kids Menu, etc.
- **Themes:** Valentine's Day, Fall, etc.
- **Ingredient Control:** Must-have and exclude lists
- **Kitchen Equipment:** Customize based on available equipment

## Installation & Setup

```bash
# 1. Clone repository
git clone https://github.com/7LayerLabs/apprecreation

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with AI provider credentials

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
```

## Key Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

## Unique Features to Leverage

1. **Flexible AI Provider System**
   - Easy to swap between different AI models
   - Support for local/custom endpoints
   - Cost optimization through provider selection

2. **Professional Recipe Output Format**
   - Structured for real kitchen operations
   - Includes social media copy generation
   - Export options for sharing with team

3. **Local-First Data Storage**
   - No backend required for basic functionality
   - Client profiles in localStorage
   - Privacy-focused approach

4. **Multi-Client Support**
   - Restaurant consultants can manage multiple clients
   - Sandboxed data per client
   - Easy context switching

## What We'll Improve in Our Build

Based on the PRD, our version will enhance:

1. **Better inventory upload handling** (multiple formats including images)
2. **Improved modification workflow** with inline editing
3. **Enhanced client profile management** (menu awareness, equipment tracking)
4. **More granular recipe requests** (specify exact count per meal type)
5. **Richer output format** with structured workflow sections
6. **Better error handling and loading states**

## Reference Files to Review

When building, we should reference:
- `/src/services/aiService.ts` - AI integration patterns
- `/src/types.ts` - Type definitions for recipes, profiles, etc.
- `/src/components/` - UI component patterns
- `/.env.example` - Configuration structure
- `/package.json` - Dependencies and versions
