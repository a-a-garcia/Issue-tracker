import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Flex } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import delay from "delay";

// this is of type string because data coming from the URL is always a string, we must parse it into a number
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {

    await delay(2000)

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
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    );
};

export default IssueDetailPage;
