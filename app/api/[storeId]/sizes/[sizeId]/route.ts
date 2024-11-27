import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  context: { params: { sizeId: string } }
) {
  try {
    const { sizeId } = await context.params;

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId
      }
    })

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = await auth();
    const { sizeId, storeId } = await context.params;
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

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

// even if we dont use req, we leave it
// coz params needs to be the 2nd arg in order to work
export async function DELETE(
  req: Request,
  context: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeId, sizeId } = await context.params;

    if (!userId) {
      return new NextResponse("Unautenticated", { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await prismadb.size.deleteMany({
      where: {
        id: sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
