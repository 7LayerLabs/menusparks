/**
 * Stripe Product Setup Script
 * Creates all MenuSparks products and pricing in Stripe
 * Run with: node scripts/setup-stripe-products.js
 */

require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
  console.log('🚀 Setting up MenuSparks products in Stripe...\n');

  try {
    // ============================================
    // RECIPE SERVICES
    // ============================================

    // Quick Bites Product
    console.log('Creating Quick Bites product...');
    const quickBitesProduct = await stripe.products.create({
      name: 'Quick Bites',
      description: '5 custom recipes delivered weekly, tailored to your restaurant',
      metadata: {
        tier: 'quick_bites',
        recipes_per_week: '5',
        features: 'Weekly recipes, PDF export, Recipe dashboard'
      }
    });
    console.log(`✅ Quick Bites product created: ${quickBitesProduct.id}\n`);

    // Quick Bites - Weekly Price
    const quickBitesWeekly = await stripe.prices.create({
      product: quickBitesProduct.id,
      unit_amount: 1200, // $12.00
      currency: 'usd',
      recurring: {
        interval: 'week',
        interval_count: 1
      },
      nickname: 'Quick Bites Weekly',
      metadata: {
        billing_type: 'weekly'
      }
    });
    console.log(`✅ Quick Bites Weekly price created: ${quickBitesWeekly.id} ($12/week)\n`);

    // Quick Bites - Monthly Price
    const quickBitesMonthly = await stripe.prices.create({
      product: quickBitesProduct.id,
      unit_amount: 4000, // $40.00
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1
      },
      nickname: 'Quick Bites Monthly',
      metadata: {
        billing_type: 'monthly',
        savings: '$8/month vs weekly'
      }
    });
    console.log(`✅ Quick Bites Monthly price created: ${quickBitesMonthly.id} ($40/month)\n`);

    // Chef's Choice Product
    console.log('Creating Chef\'s Choice product...');
    const chefsChoiceProduct = await stripe.products.create({
      name: 'Chef\'s Choice',
      description: '10 custom recipes + social media content delivered weekly',
      metadata: {
        tier: 'chefs_choice',
        recipes_per_week: '10',
        features: 'Weekly recipes, Social media content, PDF export, Priority support'
      }
    });
    console.log(`✅ Chef's Choice product created: ${chefsChoiceProduct.id}\n`);

    // Chef's Choice - Weekly Price
    const chefsChoiceWeekly = await stripe.prices.create({
      product: chefsChoiceProduct.id,
      unit_amount: 1900, // $19.00
      currency: 'usd',
      recurring: {
        interval: 'week',
        interval_count: 1
      },
      nickname: 'Chef\'s Choice Weekly',
      metadata: {
        billing_type: 'weekly'
      }
    });
    console.log(`✅ Chef's Choice Weekly price created: ${chefsChoiceWeekly.id} ($19/week)\n`);

    // Chef's Choice - Monthly Price
    const chefsChoiceMonthly = await stripe.prices.create({
      product: chefsChoiceProduct.id,
      unit_amount: 7000, // $70.00
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1
      },
      nickname: 'Chef\'s Choice Monthly',
      metadata: {
        billing_type: 'monthly',
        savings: '$6/month vs weekly'
      }
    });
    console.log(`✅ Chef's Choice Monthly price created: ${chefsChoiceMonthly.id} ($70/month)\n`);

    // ============================================
    // NEWSLETTER SERVICES
    // ============================================

    // Industry Newsletter Product
    console.log('Creating Industry Newsletter product...');
    const industryNewsletterProduct = await stripe.products.create({
      name: 'Industry Newsletter',
      description: 'Weekly market intelligence, pricing trends, and supply chain updates',
      metadata: {
        tier: 'newsletter_industry',
        delivery_frequency: 'weekly',
        features: 'Market intel, Commodity prices, Industry news, Supply chain updates'
      }
    });
    console.log(`✅ Industry Newsletter product created: ${industryNewsletterProduct.id}\n`);

    // Industry Newsletter - Weekly Price
    const industryNewsletterWeekly = await stripe.prices.create({
      product: industryNewsletterProduct.id,
      unit_amount: 300, // $3.00
      currency: 'usd',
      recurring: {
        interval: 'week',
        interval_count: 1
      },
      nickname: 'Industry Newsletter Weekly',
      metadata: {
        billing_type: 'weekly'
      }
    });
    console.log(`✅ Industry Newsletter Weekly price created: ${industryNewsletterWeekly.id} ($3/week)\n`);

    // Industry Newsletter - Monthly Price
    const industryNewsletterMonthly = await stripe.prices.create({
      product: industryNewsletterProduct.id,
      unit_amount: 1000, // $10.00
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1
      },
      nickname: 'Industry Newsletter Monthly',
      metadata: {
        billing_type: 'monthly',
        savings: '$2/month vs weekly'
      }
    });
    console.log(`✅ Industry Newsletter Monthly price created: ${industryNewsletterMonthly.id} ($10/month)\n`);

    // Customized Regional Newsletter Product
    console.log('Creating Customized Regional Newsletter product...');
    const customNewsletterProduct = await stripe.products.create({
      name: 'Customized Regional Newsletter',
      description: 'Personalized weekly market research for your location and cuisine',
      metadata: {
        tier: 'newsletter_custom',
        delivery_frequency: 'weekly',
        features: 'Regional pricing, Local events, Competition monitoring, Seasonal opportunities'
      }
    });
    console.log(`✅ Customized Newsletter product created: ${customNewsletterProduct.id}\n`);

    // Customized Newsletter - Weekly Price
    const customNewsletterWeekly = await stripe.prices.create({
      product: customNewsletterProduct.id,
      unit_amount: 1000, // $10.00
      currency: 'usd',
      recurring: {
        interval: 'week',
        interval_count: 1
      },
      nickname: 'Customized Newsletter Weekly',
      metadata: {
        billing_type: 'weekly'
      }
    });
    console.log(`✅ Customized Newsletter Weekly price created: ${customNewsletterWeekly.id} ($10/week)\n`);

    // Customized Newsletter - Monthly Price
    const customNewsletterMonthly = await stripe.prices.create({
      product: customNewsletterProduct.id,
      unit_amount: 3500, // $35.00
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1
      },
      nickname: 'Customized Newsletter Monthly',
      metadata: {
        billing_type: 'monthly',
        savings: '$5/month vs weekly'
      }
    });
    console.log(`✅ Customized Newsletter Monthly price created: ${customNewsletterMonthly.id} ($35/month)\n`);

    // ============================================
    // SUMMARY
    // ============================================

    console.log('\n🎉 All products and prices created successfully!\n');
    console.log('='.repeat(60));
    console.log('PRODUCT & PRICE IDs - Save these for reference:');
    console.log('='.repeat(60));
    console.log('\n📦 RECIPE SERVICES:');
    console.log(`\nQuick Bites (${quickBitesProduct.id})`);
    console.log(`  - Weekly:  ${quickBitesWeekly.id} ($12/week)`);
    console.log(`  - Monthly: ${quickBitesMonthly.id} ($40/month)`);
    console.log(`\nChef's Choice (${chefsChoiceProduct.id})`);
    console.log(`  - Weekly:  ${chefsChoiceWeekly.id} ($19/week)`);
    console.log(`  - Monthly: ${chefsChoiceMonthly.id} ($70/month)`);

    console.log('\n📰 NEWSLETTER SERVICES:');
    console.log(`\nIndustry Newsletter (${industryNewsletterProduct.id})`);
    console.log(`  - Weekly:  ${industryNewsletterWeekly.id} ($3/week)`);
    console.log(`  - Monthly: ${industryNewsletterMonthly.id} ($10/month)`);
    console.log(`\nCustomized Newsletter (${customNewsletterProduct.id})`);
    console.log(`  - Weekly:  ${customNewsletterWeekly.id} ($10/week)`);
    console.log(`  - Monthly: ${customNewsletterMonthly.id} ($35/month)`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Setup complete! View products at:');
    console.log('https://dashboard.stripe.com/test/products');
    console.log('='.repeat(60) + '\n');

    // Save IDs to a file for reference
    const productIds = {
      quickBites: {
        productId: quickBitesProduct.id,
        weekly: quickBitesWeekly.id,
        monthly: quickBitesMonthly.id
      },
      chefsChoice: {
        productId: chefsChoiceProduct.id,
        weekly: chefsChoiceWeekly.id,
        monthly: chefsChoiceMonthly.id
      },
      industryNewsletter: {
        productId: industryNewsletterProduct.id,
        weekly: industryNewsletterWeekly.id,
        monthly: industryNewsletterMonthly.id
      },
      customNewsletter: {
        productId: customNewsletterProduct.id,
        weekly: customNewsletterWeekly.id,
        monthly: customNewsletterMonthly.id
      }
    };

    const fs = require('fs');
    fs.writeFileSync(
      './stripe-product-ids.json',
      JSON.stringify(productIds, null, 2)
    );
    console.log('💾 Product IDs saved to: stripe-product-ids.json\n');

  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupStripeProducts();
