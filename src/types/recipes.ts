export type RecipeStyle = 'creative' | 'classic' | 'hybrid';
export type RecipeComplexity = 'basic' | 'intermediate' | 'chef';

export interface IngredientGroup {
  group: string;
  items: string[];
}

export interface Recipe {
  recipeName: string;
  mealType: string;
  description: string;
  yield: string;
  ingredients: string[];
  ingredientGroups?: IngredientGroup[];
  prep?: string[];
  bulkPrep?: string[];
  instructions: string[];
  chefNotes?: string;
  socialMediaPost?: string;
}

export interface Idea {
  name: string;
  description: string;
}

export interface RestaurantProfile {
  restaurantName: string;
  restaurantType: string;
  cuisineStyle: string;
  location: string;
  phone: string;
  description: string;
  defaultRecipeStyle: RecipeStyle;
  defaultComplexity: RecipeComplexity;
  defaultDecade: string;
  defaultTheme: string;
  defaultRestaurantStyles: string[];
}

export interface SocialMediaSettings {
  tone: 'fun' | 'professional' | 'casual' | 'upscale';
  brandHashtags: string;
  ctaTemplate: string;
  alwaysInclude: string;
  alwaysExclude: string;
  platforms: string[];
}

export interface RecipeRequest {
  mealType: string;
  count: number;
}

export interface GenerateRecipesBody {
  recipeRequests: RecipeRequest[];
  customRequest?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  equipment?: string[];
  recipeStyle: RecipeStyle;
  recipeComplexity: RecipeComplexity;
  restaurantStyles?: string[];
  theme?: string;
  decade?: string;
  socialMediaSettings?: SocialMediaSettings;
}

export interface AskChefBody {
  question: string;
  recipe: Recipe;
  history: { role: 'user' | 'chef'; text: string }[];
}
