# Tally Form Setup Instructions

## Quick Setup (5 minutes)

### 1. Create Your Tally Account
Go to https://tally.so and sign up for free

### 2. Create New Form
- Click "Create form"
- Choose "Start from scratch"
- Name it "Restaurant Profile"

### 3. Add These Fields (in order):

#### Section: Basic Information
1. **Restaurant Name** - Short answer (Required)
2. **Email** - Email field (Required)
3. **Phone** - Phone number (Optional)
4. **Cuisine Type** - Dropdown (Required)
   - Options: American, Italian, Mexican, Chinese, Japanese, French, Mediterranean, Indian, Thai, Steakhouse, Seafood, Pizza, Burgers, Cafe, Other

#### Section: Location
5. **Street Address** - Short answer
6. **City** - Short answer
7. **State** - Short answer
8. **ZIP Code** - Short answer

#### Section: Restaurant Details
9. **Service Types** - Multiple choice (checkboxes)
   - Dine-In
   - Takeout
   - Delivery
   - Catering
10. **Average Ticket Size** - Dropdown
    - Under $15
    - $15-$30
    - $30-$50
    - $50-$75
    - Over $75
11. **Seating Capacity** - Number

#### Section: Help Us Help You
12. **Excess Ingredients** - Long answer
    - Label: "What ingredients do you frequently have excess of?"
13. **Challenges** - Long answer
    - Label: "What are your biggest challenges?"
14. **Preferred Contact** - Dropdown
    - Email
    - Phone
    - Text Message

### 4. Configure Form Settings

1. Click "Settings" (gear icon)
2. Under "General":
   - Enable "Show progress bar"
3. Under "After submission":
   - Set redirect to: `https://menusparks.com/profile-success`
4. Under "Notifications":
   - Add email notification to: `admin@menusparks.com`
   - Subject: "New Restaurant Profile: {Restaurant Name}"

### 5. Get Your Form ID

1. Click "Share" button
2. Choose "Embed"
3. Your form ID is in the URL: `https://tally.so/embed/YOUR_FORM_ID`
   - Example: If URL is `https://tally.so/embed/wvDd5n`, your ID is `wvDd5n`

### 6. Update the Code

Replace `YOUR_TALLY_FORM_ID` in `/src/app/profile/page.tsx` (line 13) with your actual form ID.

### 7. Test It!
1. Go to http://localhost:3001/profile
2. Fill out the form
3. Submit and verify:
   - You get redirected to success page
   - You receive admin email notification
   - Response appears in Tally dashboard

## That's it! 🎉

Your form is now:
- Professionally designed
- Automatically sends emails
- Saves all data in Tally
- No backend code needed
- Free for unlimited submissions

## Benefits Over Old System:
- ✅ Deleted 329 lines of code
- ✅ No database management
- ✅ Built-in analytics
- ✅ Export to CSV/Excel
- ✅ Email notifications
- ✅ Mobile optimized
- ✅ Zero maintenance