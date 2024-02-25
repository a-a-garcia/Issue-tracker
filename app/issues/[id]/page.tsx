import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";


// this is of type string because data coming from the URL is always a string, we must parse it into a number
interface Props {
  params: { id: string };
}

// destructure params property from Props
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
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id}></EditIssueButton>
      </Box>
    </Grid>
  );
};


export default IssueDetailPage;
