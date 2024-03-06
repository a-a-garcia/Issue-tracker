import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth"
import AsigneeSelect from "./AsigneeSelect";
import {cache} from 'react'

// this is of type string because data coming from the URL is always a string, we must parse it into a number
interface Props {
  params: { id: string };
}

// using react cache to combine queries for metadata and fetching issue
// we don't need to async await here because we are returning the promise straight away (if we had more code in this block, we should async/await)
const fetchUser = cache((issueId: number) =>  prisma.issue.findUnique({where: { id: issueId}}))

// destructure params property from Props
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  //findUnique takes in an object with a property `where` set to an object with one property `id` with value of params.id parsed into a number
  const issue = await fetchUser(parseInt(params.id))

  //notFound is built into next.js and will redirect to 404 page without having to useRouter
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
        {session &&
        <Flex direction={"column"} gap="4">
          <AsigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id}></EditIssueButton>
          <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
        </Flex>
        }
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

// we want to generate the metadata dynamically depending on what issue we are on
export async function generateMetadata( {params} : Props ) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}