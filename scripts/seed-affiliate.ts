import affiliatePrisma from '../lib/clients/affiliate-prisma';
import { OneCentralAffiliateDatabase } from '../lib/AffiliateProductData';


async function main() {
  console.log('Start seeding affiliate products...');

  for (const productData of OneCentralAffiliateDatabase) {
  const { id, price, relatedProducts, ...restOfProductData } = productData;

    const product = await affiliatePrisma.product.upsert({
      where: { id },
      create: {
        id,
        ...restOfProductData,
        price: price !== undefined ? String(price) : null,
      },
      update: {
        ...restOfProductData,
        price: price !== undefined ? String(price) : null,
      },
    });
    console.log(`Upserted product with name: ${product.name}`);
  }

  for (const productData of OneCentralAffiliateDatabase) {
    if (productData.relatedProducts && productData.relatedProducts.length > 0) {
      await affiliatePrisma.product.update({
        where: { id: productData.id },
        data: {
          relatedProducts: {
            connect: productData.relatedProducts.map((relatedProductId) => ({ id: relatedProductId })),
          },
        },
      });
      console.log(`Updated related products for product with name: ${productData.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await affiliatePrisma.$disconnect();
  });
