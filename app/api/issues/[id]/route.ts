import { patchIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth"


// takes two parameters: request of type NextRequest and an object { params } where params is an object with a property params containing an object with an id property.
export async function PATCH(request: NextRequest, { params }: { params: {id: string }} ) {
    // you can comment out 10-16 to test patch with assigning
    // const session = await getServerSession();

    // if (!session) {
    //     // 401 means unauthorized
    //     return NextResponse.json
    //     ({}, { status: 401 })
    // }

    //wait for a response from the server
    const response = await request.json()
    //validate
    const validation = patchIssueSchema.safeParse(response)
    //if validation fails...
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400})
    }

    // if there is a userId in the body of the request, we want to make sure that user exists
    // destructure these properties from the response body
    const {assignedToUserId, title, description} = response;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({where: {id: assignedToUserId } })
        if (!user) {
            return NextResponse.json({error: 'Invalid User'}, {status: 400})
        }
    }

    //if validation succeeds and a user is found, use prisma update to find the issue with the id and update it with the data from the response body
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id)},
        data: { 
            title: title, 
            description: description,
            assignedToUserId
        }
    })
    // return the updated issue back to the client
    return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: { params: {id: string }} ) {
    const session = await getServerSession();

    if (!session) {
        // 401 means unauthorized
        return NextResponse.json
        ({}, { status: 401 })
    }

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