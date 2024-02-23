import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

// this is of type string because data coming from the URL is always a string, we must parse it into a number
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  //findUnique takes in an object with a property `where` set to an object with one property `id` with value of params.id parsed into a number
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //notFound is built into next.js and will redirect to 404 page without having to useRouter
  if (!issue) {
    notFound();
  }

    return (
      <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
      </div>
    );
};

export default IssueDetailPage;
