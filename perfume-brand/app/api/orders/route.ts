import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const where = userId ? { userId } : {};
    const orders = await prisma.order.findMany({
      where,
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await prisma.order.create({
      data: {
        userId: body.userId,
        status: "confirmed",
        subtotal: body.subtotal,
        discount: body.discount || 0,
        shipping: body.shipping || 0,
        total: body.total,
        giftNote: body.giftNote || "",
        shippingName: body.shippingName,
        shippingEmail: body.shippingEmail,
        shippingPhone: body.shippingPhone || "",
        shippingAddress: body.shippingAddress,
        shippingCity: body.shippingCity,
        shippingState: body.shippingState,
        shippingZip: body.shippingZip,
        shippingCountry: body.shippingCountry || "US",
        orderItems: {
          create: body.items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
