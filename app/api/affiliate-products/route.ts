import { NextResponse } from 'next/server';
import affiliatePrisma from '@/lib/clients/affiliate-prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const phase = searchParams.get('phase');
  const intention = searchParams.get('intention');

  const where: any = {};
  if (phase) {
    where.roadmapPhase = parseInt(phase, 10);
  }
  if (intention) {
    where.productIntention = intention;
  }

  try {
    const products = await affiliatePrisma.product.findMany({
      where,
      include: {
        categories: true,
        tags: true,
        reviews: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    // It's good practice to hide specific error details in production
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}
