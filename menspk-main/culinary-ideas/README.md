# Culinary Ideas Archive

This folder contains all generated recipes, specials, and culinary concepts created by the culinary-genius subagent for MenuSparks.

## Naming Convention
Files are automatically named with timestamp and descriptor: `YYYY-MM-DD_[type]_[name].md`

Examples:
- `2025-01-15_special_braised-short-ribs.md`
- `2025-01-15_recipe_summer-corn-salad.md`
- `2025-01-15_concept_taco-tuesday-series.md`

## Content Types

### Daily Specials
- Single dish features for daily rotation
- Filename pattern: `YYYY-MM-DD_special_[dish-name].md`
- Includes full recipe, costing, and marketing description

### Recipe Development
- New recipe creations from available ingredients
- Filename pattern: `YYYY-MM-DD_recipe_[dish-name].md`
- Contains ingredients, method, variations, and chef notes

### Menu Concepts
- Themed menu ideas, seasonal features, event menus
- Filename pattern: `YYYY-MM-DD_concept_[theme-name].md`
- Multiple coordinated dishes with cohesive theme

### Ingredient Studies
- Deep dives on utilizing specific ingredients
- Filename pattern: `YYYY-MM-DD_ingredient_[item].md`
- Multiple applications and preparations

## File Structure
Each file contains:
```markdown
# [Dish/Concept Name]
**Generated**: [Timestamp]
**Type**: [Special/Recipe/Concept]
**Restaurant**: [If specified]
**Season**: [If applicable]

## Description
[Marketing-ready description]

## Ingredients
[Detailed ingredient list with quantities]

## Method
[Step-by-step instructions]

## Chef Notes
[Tips, variations, and substitutions]

## Costing
- Food Cost: $X.XX
- Suggested Price: $XX.XX
- Margin: XX%

## Marketing Copy
[Ready-to-use descriptions for different channels]
```

## Archive Organization
```
culinary-ideas/
├── 2025/
│   ├── 01-january/
│   │   ├── 2025-01-08_special_winter-risotto.md
│   │   ├── 2025-01-15_recipe_bourbon-glazed-pork.md
│   │   └── 2025-01-20_concept_superbowl-menu.md
│   ├── 02-february/
│   └── ...
├── seasonal/
│   ├── spring/
│   ├── summer/
│   ├── fall/
│   └── winter/
├── by-protein/
│   ├── beef/
│   ├── poultry/
│   ├── seafood/
│   ├── pork/
│   └── vegetarian/
└── README.md
```

## Usage Examples

### Generate a Special
"Use the culinary-genius to create a special with chicken, mushrooms, and pasta"
→ Saves as: `2025-01-15_special_chicken-mushroom-pasta.md`

### Develop a Recipe
"Have the culinary-genius develop a summer salad recipe"
→ Saves as: `2025-01-15_recipe_summer-garden-salad.md`

### Create a Concept
"Ask the culinary-genius to design a Valentine's Day menu"
→ Saves as: `2025-02-01_concept_valentines-menu.md`

## Retrieval
All ideas are searchable by:
- Date generated
- Type (special/recipe/concept)
- Main protein/ingredient
- Season
- Restaurant (if specified)

## Best Practices
1. Review generated ideas weekly
2. Test promising recipes in kitchen
3. Track which ideas get implemented
4. Note performance metrics on implemented dishes
5. Build seasonal libraries for annual planning