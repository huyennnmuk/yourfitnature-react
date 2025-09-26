import affiliatePrisma from '@/lib/clients/affiliate-prisma';

export interface AffiliateProduct {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  rel?: string;
  blogId?: string;
  rationale?: string;
  roadmapPhase?: number;
  productIntention?: string;
  url: string; // Make required
  relatedProducts?: string[];
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
}

const transformProduct = (product: any): AffiliateProduct => {
  return {
      ...product,
      url: product.url,
      brand: product.brand ?? undefined,
      description: product.description ?? undefined,
      price: product.price ?? undefined,
      imageUrl: product.imageUrl ?? undefined,
      rel: product.rel ?? undefined,
      blogId: product.blogId ?? undefined,
      rationale: product.rationale ?? undefined,
      roadmapPhase: product.roadmapPhase ?? undefined,
      productIntention: product.productIntention ?? undefined,
      relatedProducts: product.relatedProducts ?? [],
  };
};


export const getAffiliateProductById = async (id: string): Promise<AffiliateProduct | undefined> => {
  try {
    const product = await affiliatePrisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
        reviews: true,
      },
    });

    if (!product) {
      return undefined;
    }
    return transformProduct(product);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getProductsForPhase = async (phase: number, intention?: string): Promise<AffiliateProduct[]> => {
  try {
    const where = {
      roadmapPhase: phase,
    } as any;

    if (intention) {
      where.productIntention = intention;
    }
    
    const products = await affiliatePrisma.product.findMany({
      where,
      include: {
        categories: true,
        tags: true,
        reviews: true,
      },
    });

    return products.map(transformProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
};
