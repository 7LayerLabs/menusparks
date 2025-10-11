# MenuSparks - Practical Agent Architecture

**Date:** October 11, 2025
**Status:** Production Design

## Philosophy: Agents That Actually Work

**Two Types of Agents:**
1. **Development Agents** - Help Derek build faster
2. **Production Agents** - ARE the product, run automatically

**Not Needed:** Agents that duplicate human roles (strategy, research, marketing) - Derek does those.

---

## Phase 1: Development Agents (Building the Product)

These agents help you ship code faster.

### 1. Frontend Engineering Agent (Claude Code)
**Role:** Write React/TypeScript/Tailwind code
**Tools:** Read, Write, Edit, Bash
**Responsibilities:**
- Build UI components
- Implement forms and validation
- Create responsive layouts
- Handle routing and navigation
- localStorage integration

**Status:** ✅ Active (that's me!)

### 2. AI Integration Agent
**Role:** Manage all AI provider connections
**Tools:**
- Gemini API (@google/generative-ai)
- OpenAI API (openai)
- Anthropic API (@anthropic-ai/sdk)
- Perplexity API (mcp__perplexity__perplexity_ask)

**Responsibilities:**
- Implement multi-provider AI service
- Prompt engineering for recipe generation
- Handle API errors and retries
- Rate limiting and quota management
- Cost tracking per request

**Code Structure:**
```typescript
// src/services/aiService.ts
class AIService {
  generateRecipes(context: RestaurantContext, count: number)
  enrichRestaurantData(websiteUrl: string) // Uses Perplexity
  generateEmailCopy(lead: Lead) // Uses GPT-4
  generateMarketIntel(region: string) // Uses Perplexity
}
```

### 3. Recipe Validation Agent
**Role:** Quality control for AI-generated recipes
**Responsibilities:**
- Check recipe feasibility (realistic portions, timing)
- Validate ingredient compatibility
- Ensure prep steps are logical
- Match restaurant brand/style
- Flag unsafe combinations

**Implementation:**
```typescript
class RecipeValidator {
  validate(recipe: Recipe, context: RestaurantContext): ValidationResult
  checkPortions(recipe: Recipe): boolean
  checkTiming(recipe: Recipe): boolean
  checkIngredientCompatibility(ingredients: Ingredient[]): boolean
  checkBrandMatch(recipe: Recipe, restaurant: Restaurant): number // 0-100 score
}
```

### 4. DevOps Agent (Claude Code + Scripts)
**Role:** Deployment and infrastructure
**Responsibilities:**
- Next.js deployment to Vercel
- Environment variable management
- Database migrations (Prisma)
- CI/CD setup (GitHub Actions)
- Monitoring setup (Sentry)

---

## Phase 2: Core Production Agents (The Product)

These agents ARE MenuSparks - they run the business.

### 5. Daily Orchestrator Agent
**Role:** Master scheduler that triggers all weekly deliveries

**Schedule:** Runs daily at 12:01 AM server time

**Responsibilities:**
```typescript
async function dailyOrchestrator() {
  const today = getDayOfWeek(); // "monday", "tuesday", etc.

  // Find all subscriptions scheduled for today
  const subscriptions = await db.subscriptions.findMany({
    where: {
      status: 'active',
      delivery_day: today
    }
  });

  // Queue a job for each subscription
  for (const sub of subscriptions) {
    await queue.add('generate-delivery', {
      subscriptionId: sub.id,
      tier: sub.tier
    });
  }
}
```

**Implementation:** BullMQ scheduled job

### 6. Recipe Generation Engine
**Role:** Generate personalized weekly recipes

**Triggered by:** Daily Orchestrator

**Responsibilities:**
- Load restaurant profile and context
- Generate N recipes based on tier (5 or 10)
- Personalize to restaurant style/brand
- Structure output (Mise en Place, Prep, Service)
- Generate Chef's Notes
- Save recipes to database

**Key Features:**
- Brand voice matching
- Equipment constraints
- Menu awareness (don't duplicate)
- Seasonal/regional ingredients
- Cost consciousness

**Implementation:**
```typescript
async function generateDelivery(job) {
  const { subscriptionId, tier } = job.data;

  const restaurant = await getRestaurantWithContext(subscriptionId);
  const recipeCount = tier === 'quick_byte' ? 5 : 10;

  // Use Gemini for recipe generation
  const recipes = await aiService.generateRecipes({
    restaurant,
    count: recipeCount,
    style: restaurant.preferred_style,
    complexity: restaurant.complexity_level
  });

  // Validate recipes
  const validated = recipes.filter(r =>
    recipeValidator.validate(r, restaurant).isValid
  );

  // Save to database
  await db.recipes.createMany({ data: validated });

  // Queue next step
  await queue.add('generate-social-content', { recipes: validated });
}
```

### 7. Social Media Content Agent
**Role:** Create Instagram/Facebook posts for each recipe

**Triggered by:** Recipe Generation Engine (Chef's Choice tier only)

**Responsibilities:**
- Generate compelling social copy
- Match restaurant's brand voice
- Include relevant hashtags
- Create post variations (Instagram vs Facebook)
- Format for easy copy/paste

**Implementation:**
```typescript
async function generateSocialContent(recipes: Recipe[]) {
  const posts = await Promise.all(
    recipes.map(recipe =>
      aiService.generateSocialPost({
        recipe,
        platform: 'instagram',
        tone: recipe.restaurant.brand_voice
      })
    )
  );

  await db.socialPosts.createMany({ data: posts });
  await queue.add('send-email', { recipes, posts });
}
```

### 8. Email Delivery Agent
**Role:** Send weekly recipe emails to subscribers

**Triggered by:** Social Media Content Agent

**Responsibilities:**
- Format recipes into email template
- Include social media posts (Chef's Choice)
- Personalize greeting
- Track email opens/clicks
- Handle delivery failures

**Implementation:**
```typescript
async function sendWeeklyEmail({ recipes, posts, subscription }) {
  const restaurant = subscription.restaurant;
  const user = subscription.user;

  const email = await emailService.render('weekly-recipes', {
    restaurantName: restaurant.name,
    recipes,
    socialPosts: posts,
    tier: subscription.tier
  });

  await sendgrid.send({
    to: user.email,
    from: 'recipes@menusparks.com',
    subject: `${restaurant.name} - This Week's Specials`,
    html: email
  });

  await db.deliveries.update({
    where: { subscriptionId: subscription.id },
    data: { delivered_at: new Date(), status: 'delivered' }
  });

  // Queue payment processing
  await queue.add('process-payment', { subscription });
}
```

### 9. Payment Processing Agent
**Role:** Handle weekly subscription billing

**Triggered by:** Email Delivery Agent (after successful delivery)

**Responsibilities:**
- Create Stripe payment intent
- Process subscription charge
- Handle failed payments
- Send payment receipts
- Update subscription status

**Implementation:**
```typescript
async function processPayment({ subscription }) {
  const amount = getTierPrice(subscription.tier);

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: 'usd',
      customer: subscription.user.stripe_customer_id,
      description: `MenuSparks ${subscription.tier} - Week of ${new Date().toDateString()}`
    });

    await db.payments.create({
      data: {
        subscription_id: subscription.id,
        stripe_payment_intent_id: payment.id,
        amount,
        status: 'succeeded'
      }
    });
  } catch (error) {
    // Queue retry or send dunning email
    await queue.add('payment-failed', { subscription, error });
  }
}
```

---

## Phase 3: B2B Sales Agents (The Army)

### 10. Campaign Orchestrator Agent
**Role:** Manage the B2B outreach pipeline

**Input:** CSV file with leads
**Output:** Complete campaigns ready to send

**Workflow:**
```typescript
async function processCampaign(csvFile: File) {
  const leads = await parseCSV(csvFile);

  // Launch parallel agents for each lead
  const campaigns = await Promise.all(
    leads.map(async (lead) => {
      const [enriched, mockups, emails] = await Promise.all([
        leadEnrichmentAgent.process(lead),
        mockupGenerationAgent.process(lead),
        emailCopywritingAgent.process(lead)
      ]);

      return campaignAssemblyAgent.combine({
        lead,
        enriched,
        mockups,
        emails
      });
    })
  );

  return campaigns;
}
```

### 11. Lead Enrichment Agent
**Role:** Research prospects using Perplexity

**Responsibilities:**
- Scrape restaurant website
- Find owner/chef name
- Extract menu items and pricing
- Analyze brand voice
- Find pain points from reviews
- Get social media presence

**Implementation:**
```typescript
async function enrichLead(lead: Lead) {
  // Use Perplexity for real-time research
  const research = await mcp__perplexity__perplexity_ask({
    messages: [{
      role: "user",
      content: `Research ${lead.restaurant_name} in ${lead.city}, ${lead.state}.
      Find: owner/chef name, menu style, price range, recent reviews,
      complaints about menu variety, social media presence.`
    }]
  });

  // Extract structured data
  const structured = await aiService.parseResearchData(research);

  return {
    ...lead,
    enriched: structured
  };
}
```

### 12. Mockup Generation Agent
**Role:** Create visual recipe examples using fal.ai

**Responsibilities:**
- Generate 2-3 sample recipes tailored to prospect
- Create branded recipe cards (images)
- Generate social media post mockups
- Design email header with sample special

**Implementation:**
```typescript
async function generateMockups(lead: EnrichedLead) {
  // Generate recipes using Gemini
  const recipes = await aiService.generateRecipes({
    restaurant: lead.enriched,
    count: 2,
    style: lead.enriched.cuisine_style
  });

  // Create visual mockups using fal.ai
  const mockups = await Promise.all(
    recipes.map(recipe =>
      falMediaGenerator.createRecipeCard({
        recipe,
        brandStyle: lead.enriched.brand_voice
      })
    )
  );

  return { recipes, mockups };
}
```

### 13. Email Copywriting Agent
**Role:** Write personalized 3-email sequence

**Responsibilities:**
- Craft hyper-personalized emails
- Reference specific pain points
- Include mockups
- Match prospect's brand voice
- A/B test subject lines

**Implementation:**
```typescript
async function writeEmailSequence(lead: EnrichedLead, mockups: Mockup[]) {
  const sequence = await aiService.generateEmailSequence({
    lead,
    mockups,
    painPoints: lead.enriched.pain_points,
    ownerName: lead.enriched.owner_name
  });

  return {
    email1: sequence[0], // Problem awareness + intrigue
    email2: sequence[1], // Value + ROI
    email3: sequence[2]  // Urgency + easy yes
  };
}
```

### 14. Campaign Assembly Agent
**Role:** Package everything for deployment

**Responsibilities:**
- Combine enriched data + mockups + emails
- Upload mockups to CDN
- Create tracking links
- Export to CSV/CRM
- Generate campaign dashboard

---

## Phase 4: Market Intelligence Agents

### 15. Industry Newsletter Agent
**Role:** Generate weekly industry newsletter

**Schedule:** Weekly (e.g., every Monday)

**Responsibilities:**
- Use Perplexity to research latest industry news
- Find commodity pricing changes
- Identify supply chain issues
- Extract regulatory updates
- Write engaging newsletter copy

**Implementation:**
```typescript
async function generateIndustryNewsletter() {
  // Research with Perplexity
  const marketData = await mcp__perplexity__perplexity_ask({
    messages: [{
      role: "user",
      content: `What are the top 5 restaurant industry news stories
      from the past 7 days? Include commodity price changes,
      supply chain issues, and regulatory updates.`
    }]
  });

  // Write newsletter with engaging copy
  const newsletter = await aiService.writeNewsletter({
    data: marketData,
    tone: 'professional_friendly',
    audience: 'restaurant_owners'
  });

  return newsletter;
}
```

### 16. Regional Intelligence Agent
**Role:** Create personalized market updates

**Responsibilities:**
- Research regional pricing trends (Perplexity)
- Find local events affecting dining
- Identify seasonal opportunities
- Custom commodity tracking
- Competitive intelligence

**Implementation:**
```typescript
async function generateRegionalIntel(restaurant: Restaurant) {
  const intel = await mcp__perplexity__perplexity_ask({
    messages: [{
      role: "user",
      content: `Find current food pricing trends and supply chain
      issues affecting restaurants in ${restaurant.city}, ${restaurant.state}.
      Include local events impacting dining traffic this week.`
    }]
  });

  const customReport = await aiService.formatMarketReport({
    data: intel,
    restaurant
  });

  return customReport;
}
```

---

## Phase 5: Customer Lifecycle Agents

### 17. Onboarding Assistant Agent
**Role:** Help new users set up profiles

**Implementation:** AI chatbot in onboarding flow

**Responsibilities:**
- Guide through profile setup
- Suggest equipment based on restaurant type
- Help upload menu
- Extract brand voice from menu
- Recommend tier based on needs

### 18. Support Chatbot Agent
**Role:** Answer common questions

**Implementation:** GPT-4 powered chatbot

**Responsibilities:**
- Answer FAQ
- Troubleshoot delivery issues
- Explain features
- Handle billing questions
- Escalate to human when needed

### 19. Retention Agent
**Role:** Prevent churn

**Triggers:**
- User hasn't logged in for 2 weeks
- Recipes not being viewed
- Payment failure

**Actions:**
- Send re-engagement email
- Offer discount/incentive
- Request feedback
- Suggest tier change

### 20. Upsell Agent
**Role:** Identify upgrade opportunities

**Triggers:**
- Quick Byte user views recipes 10+ times/week
- User manually requests more recipes
- User saves many favorites

**Actions:**
- Suggest Chef's Choice upgrade
- Highlight additional features
- Offer trial of higher tier

---

## Agent Communication Architecture

```
┌─────────────────────────────────────────────────┐
│         Daily Orchestrator Agent                │
│         (BullMQ Scheduler)                      │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────────────┐   ┌──────────────────────┐
│ Recipe Engine   │   │ Market Intel Agent   │
└────────┬────────┘   └──────────┬───────────┘
         │                       │
         ▼                       │
┌─────────────────┐             │
│ Social Media    │             │
│ Content Agent   │             │
└────────┬────────┘             │
         │                      │
         ▼                      ▼
┌─────────────────┐   ┌──────────────────────┐
│ Email Delivery  │   │ Newsletter Email     │
│ Agent           │   │ Agent                │
└────────┬────────┘   └──────────┬───────────┘
         │                       │
         ▼                       ▼
┌──────────────────────────────────────────────┐
│        Payment Processing Agent              │
└──────────────────────────────────────────────┘
```

### Job Queue Setup (BullMQ)

```typescript
// Queue definitions
const queues = {
  dailyOrchestrator: new Queue('daily-orchestrator'),
  recipeGeneration: new Queue('recipe-generation'),
  socialContent: new Queue('social-content'),
  emailDelivery: new Queue('email-delivery'),
  paymentProcessing: new Queue('payment-processing'),
  b2bCampaigns: new Queue('b2b-campaigns')
};

// Worker definitions
const workers = {
  dailyOrchestrator: new Worker('daily-orchestrator', dailyOrchestratorHandler),
  recipeGeneration: new Worker('recipe-generation', recipeGenerationHandler),
  socialContent: new Worker('social-content', socialContentHandler),
  emailDelivery: new Worker('email-delivery', emailDeliveryHandler),
  paymentProcessing: new Worker('payment-processing', paymentProcessingHandler)
};
```

---

## Cost Analysis (Per Month, 100 Customers)

### Recipe Generation (Core Product)
- **Gemini API:** 400 recipes/week × 4 weeks × $0.02/recipe = $32/month
- **Email Delivery:** 400 emails/week × 4 weeks × $0.001/email = $1.60/month
- **Social Content Gen:** 200 posts/week × 4 weeks × $0.01/post = $8/month
- **Subtotal:** $41.60/month

### B2B Sales Operations (50 leads/week)
- **Perplexity (Lead Enrichment):** 50 leads × $0.02 = $1/campaign
- **fal.ai (Mockup Generation):** 50 leads × $0.15 = $7.50/campaign
- **GPT-4 (Email Copy):** 50 leads × $0.04 = $2/campaign
- **Subtotal:** $10.50/campaign, ~$42/month (4 campaigns)

### Market Intelligence (Optional Services)
- **Perplexity (Industry Research):** 4 newsletters × $0.05 = $0.20/month
- **Perplexity (Regional Intel):** 20 custom reports × $0.10 = $2/month
- **Subtotal:** $2.20/month

### Total AI Costs: ~$86/month
**Revenue (100 customers @ avg $40/month):** $4,000/month
**AI Cost Ratio:** 2.15% (excellent margin!)

---

## Monitoring & Observability

### Key Metrics per Agent

**Recipe Generation Engine:**
- Recipes generated per day
- Generation success rate
- Average generation time
- Validation failure rate
- Cost per recipe

**Email Delivery Agent:**
- Emails sent per day
- Delivery success rate
- Open rate
- Click rate
- Bounce rate

**Payment Processing Agent:**
- Payments processed per day
- Success rate
- Failed payment rate
- Revenue collected

**B2B Campaign Orchestrator:**
- Leads processed per campaign
- Average processing time per lead
- Campaign completion rate
- Email response rate
- Conversion rate

### Alerting Rules

```typescript
// Alert if recipe generation fails
if (recipeGenerationFailureRate > 5%) {
  alert('High recipe generation failure rate');
}

// Alert if email delivery fails
if (emailDeliveryFailureRate > 2%) {
  alert('High email delivery failure rate');
}

// Alert if payment failure spikes
if (paymentFailureRate > 10%) {
  alert('High payment failure rate - check Stripe');
}
```

---

## Summary: What Gets Built When

### MVP (Weeks 1-4)
- ✅ AI Integration Agent
- ✅ Recipe Generation Engine
- ✅ Recipe Validation Agent
- ✅ Email Delivery Agent
- ✅ Payment Processing Agent

### Phase 2 (Weeks 5-6)
- ✅ Daily Orchestrator Agent
- ✅ Social Media Content Agent
- ✅ Onboarding Assistant Agent

### Phase 3 (Weeks 7-8)
- ✅ Campaign Orchestrator Agent
- ✅ Lead Enrichment Agent
- ✅ Mockup Generation Agent
- ✅ Email Copywriting Agent

### Phase 4 (Weeks 9-10)
- ✅ Industry Newsletter Agent
- ✅ Regional Intelligence Agent
- ✅ Support Chatbot Agent

### Phase 5 (Weeks 11-12)
- ✅ Retention Agent
- ✅ Upsell Agent

**Total: 20 Practical Agents (Not 27 Corporate Ones)**

This is the real architecture that will ship product and run your business.
