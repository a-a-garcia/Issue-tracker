import React from "react";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssueStatusBadge } from "./components";
import NextLink from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    // use the include property and set assignedToUser to true fetching the users with the issues that they are assigned to.
    include: { assignedToUser: true },
  });

  return (
    <Card>
        <Heading size="4" mb="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row>
                <Table.Cell key={issue.id}>
                  <Flex justify={"between"}>
                    <Flex direction={"column"} align={"start"} gap={"2"}>
                      <NextLink href={`/issues/${issue.id}`}>
                        {issue.title}
                      </NextLink>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        size={"2"}
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
