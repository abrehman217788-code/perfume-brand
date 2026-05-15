import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: body.userId, productId: body.productId } },
    });
    if (existing) {
      const item = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: Math.min(existing.quantity + (body.quantity || 1), 10) },
        include: { product: true },
      });
      return NextResponse.json(item);
    }
    const item = await prisma.cartItem.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        quantity: body.quantity || 1,
      },
      include: { product: true },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const item = await prisma.cartItem.updateMany({
      where: { userId: body.userId, productId: body.productId },
      data: { quantity: body.quantity },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");
    if (productId) {
      await prisma.cartItem.deleteMany({ where: { userId: userId!, productId } });
    } else {
      await prisma.cartItem.deleteMany({ where: { userId: userId! } });
    }
    return NextResponse.json({ message: "Cart updated" });
  } catch {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
