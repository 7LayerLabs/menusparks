# Newsletters Archive

This folder contains all generated market intelligence newsletters for MenuSparks restaurant partners.

## Naming Convention
Files are automatically named with timestamp: `YYYY-MM-DD_market-brief.md`

Example: `2025-01-15_market-brief.md`

## Newsletter Types

### Weekly Market Brief
- Generated every Monday
- Contains commodity prices, regional updates, and trends
- Filename pattern: `YYYY-MM-DD_market-brief.md`

### Special Alerts
- Generated as needed for urgent market changes
- Filename pattern: `YYYY-MM-DD_alert-[topic].md`
- Example: `2025-01-15_alert-beef-shortage.md`

### Monthly Trend Report
- Generated first of each month
- Deep dive into culinary trends and forecasts
- Filename pattern: `YYYY-MM_monthly-trends.md`

## Usage
When requesting a newsletter, the newsletter-curator subagent will:
1. Generate the content based on current market data
2. Create a timestamped markdown file in this folder
3. Return the file path for reference

## Archive Structure
```
newsletters/
├── 2025/
│   ├── 01-january/
│   │   ├── 2025-01-08_market-brief.md
│   │   ├── 2025-01-15_market-brief.md
│   │   └── 2025-01_monthly-trends.md
│   ├── 02-february/
│   └── ...
└── README.md
```

## Sample Command
"Use the newsletter-curator to create this week's market brief"

The system will automatically save it here with proper timestamp.