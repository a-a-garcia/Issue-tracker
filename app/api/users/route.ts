import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

//note that we aren't actually going to be reading anything in the body of the request, but we must still set the type as NextRequest or the data will be cached, which we don't want in this instance.
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany( { orderBy: { name: "asc"} } )

    return NextResponse.json(users)
}