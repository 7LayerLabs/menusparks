# Product Requirements Document: MenuSpark

**Version:** 1.0
**Date:** October 11, 2025
**Author:** World-Class Senior Frontend Engineer
**Status:** In Development

## 1. Introduction & Vision

### 1.1. Overview
MenuSpark is an AI-powered culinary assistant designed specifically for professional chefs, kitchen managers, and restaurant owners. It serves as a creative partner that transforms existing food inventory into profitable, innovative, and practical daily specials and new menu items. By leveraging the power of the Gemini API, MenuSpark helps kitchens reduce food waste, overcome creative blocks, and streamline the menu development process.

### 1.2. Problem Statement
Professional kitchens constantly face the dual challenge of managing perishable inventory to minimize waste and consistently creating exciting new dishes to keep their menus fresh and customers engaged. The process of conceptualizing new recipes that are both creative and constrained by available ingredients is time-consuming and mentally taxing.

### 1.3. Vision
To become the indispensable digital sous chef for every professional kitchen, empowering culinary creativity, maximizing profitability through intelligent inventory utilization, and simplifying the art of menu innovation.

## 2. Target Audience & Personas

**Persona 1: The Executive Chef ("Chef Anya")**
- **Role:** Oversees the entire kitchen, responsible for menu engineering, food costing, and maintaining the restaurant's culinary reputation.
- **Goals:** Wants to create unique, signature dishes that fit her restaurant's brand. Needs to control food costs and use up inventory before it spoils. Is often short on time for creative development.
- **Needs:** A tool that can quickly generate high-quality, on-brand recipe ideas that are practical for her team to execute.

**Persona 2: The Sous Chef / Kitchen Manager ("Marco")**
- **Role:** Manages day-to-day kitchen operations, including inventory tracking and preparing daily specials.
- **Goals:** Needs to quickly come up with specials based on what's available in the walk-in cooler.
- **Needs:** A fast, reliable way to turn a list of on-hand ingredients into appealing, executable recipes that the line cooks can prepare consistently.

**Persona 3: The Restaurant Consultant ("Consultant Chloe")**
- **Role:** Works with multiple restaurant clients to develop concepts, menus, and operational workflows.
- **Goals:** Needs to manage distinct culinary profiles, equipment lists, and saved ideas for each client.
- **Needs:** A centralized platform to manage her work across different clients, saving their unique constraints and preferences to deliver tailored menu concepts.

## 3. Features & Functionality

### 3.1. Core Feature: AI-Powered Recipe Generation
The heart of MenuSpark is its ability to generate complete, professional-grade recipes.

- **FR-1.1: Generation from Inventory:** Users can upload one or more ingredient inventory lists (supports .txt, .csv, .md, images, etc.). The AI will generate recipes strictly adhering to the provided list, minimizing the need to order new stock.

- **FR-1.2: Generation from Concept ("Idea Spark"):** Users can input a simple concept (e.g., "a fall-themed dessert with apples and bourbon"). The AI will first brainstorm several high-level ideas (name + description). The user can then select their favorite idea to develop into a full recipe.

- **FR-1.3: Recipe Modification:** Users can request modifications to any generated recipe via a text prompt (e.g., "Make this gluten-free," "Swap the protein for fish"). The AI will regenerate the recipe with the requested changes while respecting all original constraints.

### 3.2. Customization & Control
Users have granular control over the generation process to ensure recipes meet their exact needs.

- **FR-2.1: Recipe Request Definition:** Specify the exact number of recipes required for various meal types (e.g., 2 Appetizers, 3 Dinners).

- **FR-2.2: Style & Complexity:**
  - **Style:** Choose between Creative (completely original), Classic (modern takes on known dishes), or Hybrid (innovative twists on classics).
  - **Complexity:** Define the operational difficulty as Basic, Intermediate, or Chef-level.
  - **Decade Focus:** For Classic and Hybrid styles, optionally focus inspiration on a specific decade (1950s - 2020s).

- **FR-2.3: Contextual Constraints:**
  - **Restaurant Style:** Select one or more styles (e.g., Italian, Food Truck, Fine Dining, Kids Menu) to ensure recipes match the restaurant's brand and operational model.
  - **Theme:** Apply an optional theme (e.g., "Valentine's Day") to guide the AI's creativity.
  - **Ingredient Control:** Specify "Must-Have" and "Exclude" ingredients.

### 3.3. Client & Profile Management
MenuSpark is designed for professionals who may manage more than one culinary identity.

- **FR-3.1: Client Profiles:** Users can create and switch between distinct client profiles. All data is sandboxed per client.

- **FR-3.2: Profile Data Persistence:** Each client profile automatically saves:
  - The restaurant's current menu (for contextual awareness and to avoid suggesting similar dishes).
  - A list of available kitchen equipment.
  - A library of saved recipes and ideas.
  - A preference to use the uploaded menu as the primary source of inventory.

- **FR-3.3: Local Storage:** All profile data is saved in the browser's localStorage for seamless persistence between sessions without requiring a backend user account system.

### 3.4. Output & User Experience
The generated content is presented in a clear, actionable, and professional format.

- **FR-4.1: Structured Recipe Card:** Each recipe is displayed with:
  - Recipe Name, Meal Type, and Menu Description.
  - Yield (e.g., "12 portions").
  - Detailed Ingredient List.
  - Professional Workflow Sections: Mise en Place (raw prep), Pre-Service Prep (bulk cooking), and Instructions (final pick-up steps for service).
  - Chef's Notes (tips, substitutions, conversions).
  - A ready-to-use Social Media Post to promote the new dish.

- **FR-4.2: Recipe Actions:** From the recipe card, users can:
  - **Save:** Add the recipe to the current client's profile.
  - **Modify:** Open the modification modal.
  - **Print:** Generate a printer-friendly version of the recipe.
  - **Export to PDF:** Download a high-quality PDF of the recipe for digital storage or sharing.

- **FR-4.3: Loading & Error States:** The UI provides clear feedback during AI generation and gracefully handles potential API errors with user-friendly messages.

## 4. User Flow Example

1. Chloe (Consultant) opens MenuSpark.
2. She is presented with the Client Manager screen. She clicks "Create & Load" and enters a new client name: "The Salty Anchor".
3. She is taken to the main interface. She navigates to the "Client Profile" tab.
4. She uploads The Salty Anchor's PDF menu and selects their key kitchen equipment (Convection Oven, Deep Fryer, Grill).
5. She navigates to the "From Inventory" tab. A sous chef has sent her a .txt file of today's available fish and produce. She uploads it.
6. She configures her request: 2 Appetizers and 1 Dinner, Intermediate complexity, Creative style.
7. She clicks "Generate Recipes". A loading indicator appears.
8. Three RecipeCard components appear in the results panel. She reviews a "Pan-Seared Scallops with Corn Succotash" recipe.
9. She likes it but wants a change. She clicks "Modify" and types, "Add a bit of spice, maybe some chorizo."
10. The AI updates the recipe to include chorizo in the succotash.
11. Satisfied, she clicks "Save Recipe". It is now saved to The Salty Anchor's profile. She then clicks "Export PDF" to email the final recipe to the chef.

## 5. Technical Requirements

- **Frontend:** React, TypeScript
- **AI Integration:** @google/genai SDK for Gemini API.
- **Styling:** Tailwind CSS for a utility-first, responsive design.
- **Icons:** Lucide React.
- **PDF Export:** jspdf and html2canvas.
- **Data Persistence:** Browser localStorage API.
- **Deployment:** Static site hosting (e.g., Vercel, Netlify, Firebase Hosting).
- **Environment:** Must run in all modern web browsers (Chrome, Firefox, Safari, Edge). The API key must be managed as an environment variable (process.env.API_KEY).

## 6. Future Work & Potential Roadmap

### V1.1 (Enhancements):
- **Food Costing:** Integrate an optional feature to input ingredient costs and have the AI estimate the per-portion cost of a generated recipe.
- **Nutritional Information:** Add an option to generate estimated nutritional information for each recipe.
- **Profile Deletion:** Allow users to delete client profiles from the Client Manager.

### V2.0 (Expansion):
- **Cloud Sync & Collaboration:** Introduce an optional backend and user authentication to allow profiles to be synced across devices and shared between team members.
- **Supplier Integration:** Explore integrations with food supplier APIs to check real-time ingredient pricing and availability.
- **Full Menu Generation:** Expand beyond individual recipes to generate a cohesive, balanced menu for a week's worth of specials.
