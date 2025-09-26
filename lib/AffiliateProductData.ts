import { AffiliateProduct } from  './OneCentralAffiliateDatabase';

export const OneCentralAffiliateDatabase: AffiliateProduct[] = [
  {
    id: "your-product-id",
    name: "Your Product Name",
    brand: "Your Product Brand",
    description: "A description of your product.",
  price: 29.99,
    imageUrl: "https://example.com/image.jpg",
    url: "https://example.com/product-link",
    // categories, tags, and reviews removed to match AffiliateProduct interface
    relatedProducts: ["your-product-id-2"],
  }, {
    id: "your-product-id-2",
    name: "Your Product Name 2",
    brand: "Your Product Brand 2",
    description: "A description of your product 2.",
  price: 39.99,
    imageUrl: "https://example.com/image2.jpg",
    url: "https://example.com/product-link-2",
  // categories and tags removed to match AffiliateProduct interface
  },
  ];