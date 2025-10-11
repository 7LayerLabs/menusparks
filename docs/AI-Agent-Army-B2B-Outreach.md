# AI Agent Army - B2B Outreach System

**Date:** October 11, 2025
**Purpose:** Automated lead enrichment, mockup generation, and personalized email campaigns for MenuSparks sales

## System Overview

**Input:** Single CSV file with basic lead data
**Output:** Complete personalized sales campaign with mockups and email sequences

### Core Concept: Orchestrator + Task Agents

```
CSV Upload
    ↓
┌───────────────────────────────────────┐
│     ORCHESTRATOR AGENT                │
│  (Analyzes leads, distributes work)   │
└─────────────┬─────────────────────────┘
              │
              ├─→ Lead Enrichment Agents (parallel)
              ├─→ Mockup Generation Agents (parallel)
              ├─→ Email Copywriting Agents (parallel)
              └─→ Campaign Assembly Agents
                  ↓
            Complete Campaigns
```

## Agent Architecture

### 1. Orchestrator Agent
**Role:** Traffic controller and task distributor

**Responsibilities:**
- Parse CSV with lead data
- Validate and clean data
- Identify lead types (fine dining, casual, food truck, etc.)
- Distribute leads to specialized task agents
- Monitor agent progress
- Aggregate results
- Handle failures and retries
- Export final campaign package

**Input:**
```csv
restaurant_name, city, state, website, cuisine_type, estimated_size
Bella Vista, Boston, MA, bellavista.com, Italian, medium
Joe's Taco Truck, Austin, TX, , Mexican, small
```

**Output:** Campaign package for each lead

### 2. Lead Enrichment Agent (Parallel)
**Role:** Research and gather intel on each prospect

**Tasks per lead:**
- Scrape website for menu items, pricing, photos
- Extract brand voice from website copy
- Find social media presence (Instagram, Facebook)
- Identify recent reviews (Google, Yelp) for pain points
- Detect current menu challenges (limited specials, same items)
- Find owner/chef name if possible
- Estimate restaurant tier (budget, moderate, upscale)
- Identify seasonal/local sourcing mentions
- Check for existing menu specials frequency

**Tools:**
- Web scraping (Puppeteer/Playwright)
- API integrations (Yelp, Google Places)
- Social media APIs
- GPT-4V for menu image analysis

**Output per lead:**
```json
{
  "restaurant_name": "Bella Vista",
  "enriched_data": {
    "owner_name": "Chef Marco Rossi",
    "menu_items": ["Pasta Carbonara", "Osso Buco", ...],
    "price_range": "$25-45",
    "brand_voice": "Warm, authentic Italian, family-focused",
    "current_specials": "Rotates monthly, limited variety",
    "pain_points": ["Reviews mention 'same menu every visit'", "No daily specials"],
    "social_media": {
      "instagram": "@bellavistaboston",
      "post_frequency": "3x per week"
    },
    "tier": "upscale_casual",
    "cuisine_style": "Italian-American"
  }
}
```

### 3. Mockup Generation Agent (Parallel)
**Role:** Create visual examples of MenuSparks recipes tailored to each restaurant

**Tasks per lead:**
- Generate 2-3 sample recipes in their style
- Create branded recipe cards (visual mockups)
- Generate social media post examples
- Design email header with sample special
- Create before/after comparison visuals

**Tools:**
- Gemini API for recipe generation
- fal-media-generator for visual mockups
- Canvas/HTML rendering for recipe cards
- Image composition tools

**Sample Generated Recipe:**
```
Restaurant: Bella Vista (Italian, upscale casual)

GENERATED SPECIAL:
"Pappardelle ai Funghi di Bosco"

Menu Description:
House-made pappardelle with wild mushroom ragù,
truffle oil, and aged Parmigiano-Reggiano

Uses existing inventory:
✓ Excess mushrooms from your current supplier
✓ Pasta made in-house (your specialty)
✓ Parmesan you already stock

Cost per portion: $4.50
Suggested price: $24
Profit margin: 81%

[VISUAL MOCKUP OF RECIPE CARD]
[VISUAL MOCKUP OF SOCIAL MEDIA POST]
```

**Output per lead:**
```json
{
  "restaurant_name": "Bella Vista",
  "mockups": {
    "recipes": [
      {
        "name": "Pappardelle ai Funghi di Bosco",
        "recipe_card_url": "s3://mockups/bellavista_recipe1.png",
        "social_post_url": "s3://mockups/bellavista_social1.png"
      },
      ...
    ],
    "email_header_url": "s3://mockups/bellavista_header.png"
  }
}
```

### 4. Email Copywriting Agent (Parallel)
**Role:** Write hyper-personalized email sequences

**Tasks per lead:**
- Craft 3-email sequence (intro, value, close)
- Personalize based on enriched data
- Reference specific pain points from reviews
- Include relevant mockups
- Match their brand voice tone
- A/B test subject line variations

**Email Sequence Structure:**

**Email 1: Problem Awareness + Intrigue**
```
Subject: Marco, noticed Bella Vista's menu hasn't changed since September

Hi Chef Marco,

I was reading through your Google reviews (4.6 stars - congrats!) and
noticed a trend: "Love Bella Vista but wish they had more rotating specials."

I created a sample daily special specifically for Bella Vista - authentic
Italian that uses ingredients I know you already have in-house.

[MOCKUP IMAGE: Pappardelle ai Funghi di Bosco]

This took me 3 minutes to generate. Want to see how it works?

Best,
Derek
MenuSparks.com
```

**Email 2: Social Proof + Value (2 days later)**
```
Subject: That Pappardella special? Here are 2 more + ROI breakdown

Marco,

Since you opened my last email, I generated 2 more Italian specials
tailored to Bella Vista's style:

1. Branzino al Limone (uses your existing fish supplier)
2. Panna Cotta al Caffè (addresses your limited dessert specials)

Quick math:
- Current food cost: 32% (industry average for upscale Italian)
- With inventory-first specials: 24% food cost
- On $15k weekly revenue: $1,200/week saved = $62k/year

[LINK TO FULL MOCKUP PDF]

This is what the Chef's Choice subscription does every Monday morning.

Want to try it free for 2 weeks?

Best,
Derek
```

**Email 3: Urgency + Easy Yes (4 days later)**
```
Subject: Last one: Free 2-week trial for Bella Vista?

Marco,

Last email - I know you're busy running service.

I'm offering 5 Boston restaurants a free 2-week trial of MenuSparks.

You'd get:
✓ 10 Italian specials every Monday
✓ Branded social media posts for each
✓ Ingredient cost breakdowns
✓ Zero commitment

Hit reply and I'll set you up today.

Best,
Derek

P.S. - Here's what one of your Boston neighbors (anonymized) saved
last month using MenuSparks: [CASE STUDY LINK]
```

**Output per lead:**
```json
{
  "restaurant_name": "Bella Vista",
  "email_campaign": {
    "recipient": "Chef Marco Rossi",
    "recipient_email": "marco@bellavista.com",
    "emails": [
      {
        "sequence_number": 1,
        "subject_lines": [
          "Marco, noticed Bella Vista's menu hasn't changed since September",
          "Quick question about Bella Vista's specials rotation"
        ],
        "body": "...",
        "send_delay": 0
      },
      {
        "sequence_number": 2,
        "subject_lines": ["That Pappardella special? Here are 2 more + ROI breakdown"],
        "body": "...",
        "send_delay": 2
      },
      {
        "sequence_number": 3,
        "subject_lines": ["Last one: Free 2-week trial for Bella Vista?"],
        "body": "...",
        "send_delay": 4
      }
    ]
  }
}
```

### 5. Campaign Assembly Agent
**Role:** Package everything into a deployable campaign

**Tasks:**
- Combine enriched data + mockups + emails
- Generate campaign summary report
- Create tracking links for each email
- Export to CRM format (CSV or API)
- Upload mockup images to CDN
- Create campaign dashboard view

**Output:**
```json
{
  "campaign_id": "camp_12345",
  "total_leads": 50,
  "leads": [
    {
      "restaurant_name": "Bella Vista",
      "status": "ready",
      "enriched_data": {...},
      "mockups": {...},
      "email_campaign": {...},
      "tracking_links": {
        "email_1": "menusparks.com/track/bellavista_email1",
        "email_2": "menusparks.com/track/bellavista_email2",
        "email_3": "menusparks.com/track/bellavista_email3"
      },
      "estimated_send_dates": {
        "email_1": "2025-10-14",
        "email_2": "2025-10-16",
        "email_3": "2025-10-18"
      }
    },
    ...
  ],
  "summary": {
    "total_mockups_generated": 150,
    "total_emails_written": 150,
    "avg_processing_time_per_lead": "45 seconds",
    "ready_to_send": 48,
    "failed": 2
  }
}
```

## Technical Implementation

### Stack
- **Orchestrator:** Node.js + TypeScript
- **Agent Framework:** LangChain or custom agent system
- **AI Models:**
  - GPT-4 for enrichment and copywriting
  - Gemini for recipe generation
  - fal.ai for mockup visuals
- **Task Queue:** BullMQ (parallel processing)
- **Storage:** AWS S3 for mockups, PostgreSQL for campaign data
- **Email Delivery:** Integration with SendGrid/Resend

### Agent Communication Flow

```typescript
// Orchestrator launches parallel agents
async function processLeadCampaign(csvFile: File) {
  const leads = parseCSV(csvFile);

  // Launch all agents in parallel for each lead
  const results = await Promise.all(
    leads.map(async (lead) => {
      const [enriched, mockups, emails] = await Promise.all([
        enrichmentAgent.process(lead),
        mockupAgent.process(lead),
        emailAgent.process(lead)
      ]);

      return assemblyAgent.combine({ enriched, mockups, emails });
    })
  );

  return campaignDashboard.generate(results);
}
```

### Speed Optimization
- **Parallel Processing:** All leads processed simultaneously
- **Agent Pooling:** Multiple instances of each agent type
- **Caching:** Common data (cuisine templates, industry standards)
- **Batch AI Requests:** Group multiple leads to same AI provider

**Expected Performance:**
- 50 leads processed in ~2-3 minutes
- 150 emails written
- 150 mockups generated
- Complete campaign package ready

## User Interface

### Upload Dashboard
```
┌─────────────────────────────────────────────────┐
│  B2B Outreach Campaign Generator                │
│                                                  │
│  [Upload CSV] or drag & drop                    │
│                                                  │
│  Required columns:                               │
│  • restaurant_name                               │
│  • city, state                                   │
│  • website (optional)                            │
│  • cuisine_type (optional)                       │
│                                                  │
│  [Generate Campaign]                             │
└─────────────────────────────────────────────────┘
```

### Processing View
```
┌─────────────────────────────────────────────────┐
│  Processing 50 leads...                         │
│                                                  │
│  ✓ Lead enrichment: 50/50 complete              │
│  ⏳ Mockup generation: 35/50 in progress        │
│  ⏳ Email writing: 42/50 in progress            │
│                                                  │
│  Estimated completion: 1m 23s                    │
└─────────────────────────────────────────────────┘
```

### Campaign Dashboard
```
┌─────────────────────────────────────────────────┐
│  Campaign: Boston Italian Restaurants           │
│  Status: Ready to Send                           │
│                                                  │
│  Leads: 48 ready | 2 failed                     │
│  Total Emails: 144 (3 per lead)                 │
│  Mockups: 96 images generated                    │
│                                                  │
│  [Preview Campaigns] [Download CSV] [Send All]  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Lead: Bella Vista - Boston, MA                 │
│  Owner: Chef Marco Rossi                         │
│  Tier: Upscale Casual Italian                    │
│                                                  │
│  📧 Email Sequence (3 emails)                   │
│  🎨 Mockups (2 recipes + 1 header)              │
│  📊 Enrichment (menu, reviews, social)          │
│                                                  │
│  [Preview] [Edit] [Send Now]                    │
└─────────────────────────────────────────────────┘
```

## Integration with MenuSparks

### Where This Fits
- **Separate module** in MenuSparks admin dashboard
- Admin/sales team uses this for outreach
- Successful conversions → new subscriptions
- Track campaign → conversion metrics

### Sales Funnel
1. **CSV Upload** → Agent army processes leads
2. **Review & Approve** → Human reviews campaigns
3. **Send Campaign** → Emails go out via SendGrid
4. **Track Engagement** → Open rates, click rates
5. **Follow-Up** → Leads who engage get personal outreach
6. **Convert** → Signed up users enter MenuSparks platform

## Metrics & Analytics

### Campaign Performance
- Email open rates per sequence
- Click-through rates on mockups
- Response rates
- Conversion to trial
- Trial → paid conversion

### Agent Performance
- Avg processing time per lead
- Success rate (lead processed without errors)
- Quality scores (AI-generated content review)
- Cost per lead processed (AI API costs)

## Future Enhancements

### V2 Features
- **Multi-touch campaigns:** Add SMS, LinkedIn outreach
- **Dynamic mockups:** Real-time recipe generation based on lead's actual menu
- **Competitive analysis:** Compare lead's menu to competitors
- **Pricing optimization:** Suggest optimal pricing based on market
- **Video mockups:** AI-generated video demos of recipes

### V3 Features
- **Voice AI calls:** Automated follow-up calls with conversational AI
- **Integration with Salesforce/HubSpot**
- **Predictive lead scoring:** AI ranks leads by conversion probability
- **Auto-negotiation:** AI handles objections and pricing discussions

## Development Plan

### Phase 1: Core Infrastructure (Week 1-2)
- Build orchestrator framework
- Set up task queue system
- Create agent base classes
- Implement CSV parsing

### Phase 2: Agent Development (Week 3-4)
- Lead enrichment agent
- Mockup generation agent (integrate fal.ai)
- Email copywriting agent
- Campaign assembly agent

### Phase 3: UI & Integration (Week 5-6)
- Admin dashboard for campaign management
- Campaign preview interface
- Email sending integration
- Analytics and tracking

### Phase 4: Testing & Launch (Week 7-8)
- Test with real lead data
- Quality assurance on generated content
- Cost optimization (API usage)
- Beta launch with Derek's sales process

## Cost Analysis

### Per-Lead Processing Cost
- **Enrichment:** $0.05 (web scraping + APIs)
- **Recipe Generation:** $0.03 (Gemini API)
- **Mockup Generation:** $0.15 (fal.ai image generation)
- **Email Writing:** $0.04 (GPT-4)
- **Total:** ~$0.27 per lead

### 50-Lead Campaign
- Processing cost: $13.50
- Time saved vs manual: ~20 hours
- Value: Massive ROI for outbound sales

## Next Steps

1. Decide if this is part of MenuSparks MVP or separate product
2. Choose: build in-house vs use existing agent frameworks (LangChain, CrewAI)
3. Set up fal.ai account for mockup generation
4. Create first CSV template for lead data
5. Build orchestrator + single agent prototype
