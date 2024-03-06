import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function Home() {
  const openIssues = await prisma.issue.count({
    where : {status: 'OPEN'}
  })
  const inProgressIssues = await prisma.issue.count({
    where: {status: 'IN_PROGRESS'}
  })
  const closedIssues = await prisma.issue.count({
    where: {status: 'CLOSE'}
  })

  return (
    <Grid columns={{ initial: "1", md: "2"}} gap={"5"}>
      <Flex direction="column" gap="5">
        <IssueSummary open={openIssues} inProgress={inProgressIssues} closed={closedIssues}></IssueSummary>
        <IssueChart open={openIssues} inProgress={inProgressIssues} closed={closedIssues}></IssueChart>
      </Flex>
      <LatestIssues></LatestIssues>
    </Grid>
  )
}

// we only add title and description for this project, but we should also add openGraph and twitter properties so our content can be shared on social media
export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}