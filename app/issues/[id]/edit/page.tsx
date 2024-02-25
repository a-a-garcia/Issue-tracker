import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

//define interface for capturing route parameters
interface Props {
    params: {
        id: string
    }
}

// takes an object as its argument, and it expects this object to have a property params directly containing an id property.

const IssueEditPage = async ( {params} : Props ) => {
    const existingIssue = await prisma.issue.findUnique({
        where: {id : parseInt(params.id)}
    })

    if (!existingIssue) notFound();
  return (
    <IssueForm issue={existingIssue}/>
  )
}

export default IssueEditPage