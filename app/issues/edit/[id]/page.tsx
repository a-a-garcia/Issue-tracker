import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'
// no longer importing this component statically to avoid `navigator not found` error
// import IssueForm from '../../_components/IssueForm'

const IssueForm = dynamic(
  () => import(`@/app/issues/_components/IssueForm`),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

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