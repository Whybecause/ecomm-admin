import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  context: { params: { colorId: string } }
) {
  try {
    const { colorId } = await context.params;

    if (!colorId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId
      }
    })

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeId, colorId } = await context.params;
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unautenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

// even if we dont use req, we leave it
// coz params needs to be the 2nd arg in order to work
export async function DELETE(
  req: Request,
  context: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeId, colorId } = await context.params;

    if (!userId) {
      return new NextResponse("Unautenticated", { status: 401 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: colorId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}