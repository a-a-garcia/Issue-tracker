import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  

  // prisma call here was edited to include filtering

  // must validate issues in case users try to enter invalid search parameter IE ?status=OPENX

  // store array of valid statuses
  const statuses = Object.values(Status);
  // check to see if searchParams.status matches any of the valid statuses else return undefined (prisma will do nothing with undefined)
  const validStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  

  // must validate the orderBy object, or else you'll get an error if there are no orderBy search params
  // must also validate in case users try to enter invalid search param IE ?orderBy=titleX
  // we can't do .includes on columns because it expects a column object (columns is an array of strings..).
  // map over array of objects.. (now being done in IssueTable)
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? // we pass it to prisma, dynamically depending on what the orderBy is
      { [searchParams.orderBy]: "asc" }
    : // else undefined, prisma does nothing with undefined
      undefined;

  // pagination
  const page = parseInt(searchParams.page) || 1;
  // future goal - implement dropdown menu to select page size
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
    // this is where we can sort data - add one or many properties
    orderBy,
    // pagination
    // # of records to skip
    skip: (page - 1) * pageSize,
    // # of records to fetch
    take: pageSize,
  });

  // separate query to fetch the total number of issues to send to our Pagination component
  const issueCount = await prisma.issue.count( {
    where: { status: validStatus }
  })

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  );
};
//forces this page to be dynamically rendered
export const dynamic = `force-dynamic`;
export default IssuesPage;
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}