import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Product {
  id: string;
  name: string;
  permalink: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: {
    src: string;
    alt: string;
  }[];
  price: string;
  benefits?: {
    icon: string;
    title: string;
    description: string;
  }[];
  testimonials?: {
    text: string;
    author: string;
    title: string;
    img?: string;
  }[];
  certifications?: {
    icon: string;
    name: string;
    description: string;
  }[];
  affiliateLink?: string;
  relatedProducts?: string[];
  relatedBlogPosts?: string[];
  technicalDetails?: string[];
  featuresBenefits?: string[];
  moneyBackGuarantee?: string;
  category?: string;
}

const productsDirectory = path.join(process.cwd(), 'content/products');

export async function getProducts(): Promise<Product[]> {
  const fileNames = fs.readdirSync(productsDirectory);
  const allProductsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        ...(data as Omit<Product, 'description'>),
        id: data.productID,
        description: content,
      } as Product;
    });
  return allProductsData;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}
