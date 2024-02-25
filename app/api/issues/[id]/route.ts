import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// takes two parameters: request of type NextRequest and an object { params } where params is an object with a property params containing an object with an id property.
export async function PATCH(request: NextRequest, { params }: { params: {id: string }} ) {
    //wait for a response from the server
    const response = await request.json()
    //validate
    const validation = issueSchema.safeParse(response)
    //if validation fails...
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400})
    }
    //if validation succeeds, use prisma update to find the issue with the id and update it with the data from the response body
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id)},
        data: { title: response.title, description: response.description}
    })
    // return the updated issue back to the client
    return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: { params: {id: string }} ) {
    const issueToDelete = await prisma.issue.findUnique({ 
        where: { id: parseInt(params.id) } 
    })

    if (!issueToDelete) {
        return NextResponse.json({error: 'Issue Not Found'}, { status: 400 })
    }

    await prisma.issue.delete({
        where: { id: issueToDelete.id }}
    )

    return NextResponse.json({});
}