-- Migration: add_credits_and_profiles
-- Adds credit/usage tracking, generation history, restaurant profiles, social settings, saved recipes

-- 1. Add usage-tracking columns to users
ALTER TABLE "users"
  ADD COLUMN "generationsUsed"        INTEGER      NOT NULL DEFAULT 0,
  ADD COLUMN "generationsThisMonth"   INTEGER      NOT NULL DEFAULT 0,
  ADD COLUMN "generationsResetAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 2. Add monthly generation limit to subscriptions
ALTER TABLE "subscriptions"
  ADD COLUMN "monthlyGenerationLimit" INTEGER NOT NULL DEFAULT 20;

-- 3. RecipeGeneration — one row per AI generation call
CREATE TABLE "recipe_generations" (
  "id"          TEXT         NOT NULL,
  "userId"      TEXT         NOT NULL,
  "recipeCount" INTEGER      NOT NULL,
  "mealTypes"   TEXT         NOT NULL,
  "recipeStyle" TEXT         NOT NULL,
  "complexity"  TEXT         NOT NULL,
  "theme"       TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "recipe_generations_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "recipe_generations_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "recipe_generations_userId_idx" ON "recipe_generations"("userId");

-- 4. UserRestaurantProfile
CREATE TABLE "user_restaurant_profiles" (
  "id"                      TEXT         NOT NULL,
  "userId"                  TEXT         NOT NULL,
  "restaurantName"          TEXT         NOT NULL DEFAULT '',
  "restaurantType"          TEXT         NOT NULL DEFAULT '',
  "cuisineStyle"            TEXT         NOT NULL DEFAULT '',
  "location"                TEXT         NOT NULL DEFAULT '',
  "phone"                   TEXT         NOT NULL DEFAULT '',
  "description"             TEXT         NOT NULL DEFAULT '',
  "defaultRecipeStyle"      TEXT         NOT NULL DEFAULT 'classic',
  "defaultComplexity"       TEXT         NOT NULL DEFAULT 'basic',
  "defaultDecade"           TEXT         NOT NULL DEFAULT '',
  "defaultTheme"            TEXT         NOT NULL DEFAULT '',
  "defaultRestaurantStyles" TEXT         NOT NULL DEFAULT '[]',
  "updatedAt"               TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_restaurant_profiles_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_restaurant_profiles_userId_key" UNIQUE ("userId"),
  CONSTRAINT "user_restaurant_profiles_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. UserSocialSettings
CREATE TABLE "user_social_settings" (
  "id"            TEXT         NOT NULL,
  "userId"        TEXT         NOT NULL,
  "tone"          TEXT         NOT NULL DEFAULT 'casual',
  "brandHashtags" TEXT         NOT NULL DEFAULT '',
  "ctaTemplate"   TEXT         NOT NULL DEFAULT '',
  "alwaysInclude" TEXT         NOT NULL DEFAULT '',
  "alwaysExclude" TEXT         NOT NULL DEFAULT '',
  "platforms"     TEXT         NOT NULL DEFAULT 'Instagram,Facebook',
  "updatedAt"     TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_social_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "user_social_settings_userId_key" UNIQUE ("userId"),
  CONSTRAINT "user_social_settings_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. SavedRecipe
CREATE TABLE "saved_recipes" (
  "id"           TEXT         NOT NULL,
  "userId"       TEXT         NOT NULL,
  "recipeName"   TEXT         NOT NULL,
  "mealType"     TEXT         NOT NULL,
  "description"  TEXT         NOT NULL,
  "yield"        TEXT         NOT NULL,
  "ingredients"  TEXT         NOT NULL,
  "prep"         TEXT         NOT NULL,
  "bulkPrep"     TEXT         NOT NULL,
  "instructions" TEXT         NOT NULL,
  "chefNotes"    TEXT,
  "socialPost"   TEXT,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "saved_recipes_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "saved_recipes_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "saved_recipes_userId_idx" ON "saved_recipes"("userId");
