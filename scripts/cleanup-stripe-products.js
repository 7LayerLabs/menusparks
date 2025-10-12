/**
 * Stripe Product Cleanup Script
 * Removes old/unused products from Stripe test mode
 * Run with: node scripts/cleanup-stripe-products.js
 */

require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const fs = require('fs');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Load our current product IDs to protect them
let currentProductIds = [];
try {
  const productData = JSON.parse(fs.readFileSync('./stripe-product-ids.json', 'utf8'));
  currentProductIds = [
    productData.quickBites.productId,
    productData.chefsChoice.productId,
    productData.industryNewsletter.productId,
    productData.customNewsletter.productId
  ];
  console.log('✅ Loaded current product IDs to protect from deletion\n');
} catch (error) {
  console.log('⚠️  Could not load stripe-product-ids.json - will show all products\n');
}

async function cleanupStripeProducts() {
  console.log('🔍 Fetching all products from Stripe...\n');

  try {
    // Fetch all products
    const products = await stripe.products.list({ limit: 100 });

    if (products.data.length === 0) {
      console.log('No products found in Stripe.');
      return;
    }

    console.log(`Found ${products.data.length} products:\n`);
    console.log('='.repeat(80));

    const productsToDelete = [];
    const protectedProducts = [];

    products.data.forEach((product, index) => {
      const isProtected = currentProductIds.includes(product.id);
      const status = isProtected ? '🔒 PROTECTED' : '📦 OLD';

      console.log(`${index + 1}. ${status} ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Created: ${new Date(product.created * 1000).toLocaleDateString()}`);
      console.log(`   Active: ${product.active}`);
      console.log('');

      if (isProtected) {
        protectedProducts.push(product);
      } else {
        productsToDelete.push(product);
      }
    });

    console.log('='.repeat(80));
    console.log(`\n✅ Protected products (current): ${protectedProducts.length}`);
    console.log(`❌ Old products to delete: ${productsToDelete.length}\n`);

    if (productsToDelete.length === 0) {
      console.log('No old products to delete. All clean! ✨\n');
      return;
    }

    // Confirm deletion
    console.log('⚠️  WARNING: About to delete the following products:\n');
    productsToDelete.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.id})`);
    });

    console.log('\n🗑️  Deleting old products...\n');

    // Archive (soft delete) each product
    for (const product of productsToDelete) {
      try {
        // If product has a default price, remove it first
        if (product.default_price) {
          await stripe.products.update(product.id, { default_price: null });
          console.log(`  ✓ Removed default price from: ${product.name}`);
        }

        // Archive all prices for this product
        const prices = await stripe.prices.list({ product: product.id, limit: 100 });
        for (const price of prices.data) {
          if (price.active) {
            await stripe.prices.update(price.id, { active: false });
            console.log(`  ✓ Archived price: ${price.id}`);
          }
        }

        // Then archive the product
        await stripe.products.update(product.id, { active: false });
        console.log(`✅ Archived product: ${product.name} (${product.id})\n`);
      } catch (error) {
        console.error(`❌ Error archiving ${product.name}:`, error.message);
      }
    }

    console.log('='.repeat(80));
    console.log('🎉 Cleanup complete!\n');
    console.log(`✅ Archived ${productsToDelete.length} old products`);
    console.log(`🔒 Protected ${protectedProducts.length} current products\n`);
    console.log('View products: https://dashboard.stripe.com/test/products');
    console.log('='.repeat(80) + '\n');

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanupStripeProducts();
