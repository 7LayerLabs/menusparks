export interface Recipe {
  recipeName: string
  description: string
  yield: string
  ingredients: string[]
  prep?: string[]
  bulkPrep?: string[]
  instructions: string[]
  chefNotes?: string
  socialMediaPost?: string
}