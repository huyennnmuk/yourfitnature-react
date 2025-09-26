import React from 'react';
import { getProductBySlug, getProductById, Product } from '@/lib/getProducts';
import ProductDetails from '@/app/components/ProductDetails';
import RelatedProducts from '@/app/components/RelatedProducts';
import { Metadata } from 'next';
import Header from '@/app/components/Header';
import BloatingQuizPopup from '@/app/components/BloatingQuizPopup';
import BlurHero from '@/app/components/BlurHero';
import Footer from '@/app/components/Footer';
import FloatingAffiliateLinkButton from '@/app/components/FloatingAffiliateLinkButton';
import RelatedBlogPosts from '@/app/components/RelatedBlogPosts';
import { getPostById, LocalPost } from '@/lib/getPosts';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  return { 
    title: product?.name, 
    description: product?.description 
  };
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product: Product | null = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedBlogPosts: LocalPost[] = product.relatedBlogPosts
    ? await Promise.all(product.relatedBlogPosts.map((postId: string) => getPostById(postId))).then(posts => posts.filter((p): p is LocalPost => !!p))
    : [];

  const relatedProducts: Product[] = product.relatedProducts
    ? await Promise.all(product.relatedProducts.map((productId: string) => getProductById(productId))).then(products => products.filter((p): p is Product => !!p))
    : [];

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetails product={product} />
      {relatedBlogPosts.length > 0 && <RelatedBlogPosts posts={relatedBlogPosts} />}
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} currentProductId={product.id} />}
      {<BlurHero />}
      {<Footer />}
      {product.affiliateLink && (
        <FloatingAffiliateLinkButton 
          affiliateLink={product.affiliateLink} 
          productName={product.name} 
        />
      )}
      <BloatingQuizPopup positionClassName="fixed bottom-20 left-4 z-40" />
    </div>
  );
};

export default ProductPage;
