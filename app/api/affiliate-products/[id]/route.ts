import { NextResponse } from 'next/server';
import affiliatePrisma from '@/lib/clients/affiliate-prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await affiliatePrisma.product.findUnique({
      where: { id: params.id },
      include: {
        categories: true,
        tags: true,
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
  }
}
