import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// takes two parameters: request of type NextRequest and an object { params } where params is an object with a property params containing an object with an id property.
export async function PATCH(request: NextRequest, { params }: { params: {id: string }} ) {
    const response = await request.json()
    const validation = issueSchema.safeParse(response)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400})
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id)},
        data: { title: response.title, description: response.description}
    })

    return NextResponse.json(updatedIssue, { status: 200 })
}