import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        id: body.id,
        name: body.name,
        subtitle: body.subtitle || "",
        description: body.description,
        price: body.price,
        size: body.size,
        category: body.category,
        family: body.family,
        mood: body.mood || "",
        notes: body.notes || "{}",
        accords: body.accords || "",
        images: body.images || "[]",
        concentration: body.concentration,
        perfumer: body.perfumer || "",
        year: body.year || new Date().getFullYear(),
        stock: body.stock ?? 50,
        isNew: body.isNew ?? false,
        isBestseller: body.isBestseller ?? false,
        isLimited: body.isLimited ?? false,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
