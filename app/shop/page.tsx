import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StickyCarousel from '../components/StickyCarousel';
import VerticalSlider from '../components/VerticalSlider';
import FAQList from '../components/FAQList';
import Footer from '../components/Footer';
import StackedCarousel from '../components/StackedCarousel';
import { getProducts, Product } from '../../lib/getProducts';
import React from 'react';
import BloatingQuizPopup from '../components/BloatingQuizPopup';
import { faqs } from '@/lib/faqData';

const ShopPage = async () => {
  let products: Product[] = [];
  let error: string | null = null;

  try { 
    products = await getProducts();
  } catch (err) {
    console.error(err);
    error = 'Failed to load products.';
  }

  return (
    <div className="min-h-screen fitnature-section-bg">
      <BloatingQuizPopup />
      <Header />
      <main id="main">
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1742836531239-1fe146bf7e3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Shop Our Products"
          subtitle="High-quality supplements for your wellness journey."
          buttonText="Browse Products"
          enhanceContrast={true}
        />
        <StickyCarousel
          title="Discover Our Latest"
          subtitle="Handpicked for your wellness journey."
          buttonText="View All Products"
          showCarousel={false}
        />

        {error ? (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        ) : (
          <StackedCarousel products={products} />
        )}
        <VerticalSlider />
        <FAQList faqs={faqs} />
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
