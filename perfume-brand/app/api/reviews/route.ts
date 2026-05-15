import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const where = productId ? { productId } : {};
    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.review.findUnique({
      where: { userId_productId: { userId: body.userId, productId: body.productId } },
    });
    if (existing) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 409 });
    }
    const review = await prisma.review.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        rating: body.rating,
        text: body.text,
      },
    });
    const agg = await prisma.review.aggregate({
      where: { productId: body.productId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.product.update({
      where: { id: body.productId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewCount: agg._count,
      },
    });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
