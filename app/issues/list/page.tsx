import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { CustomIssueLink, IssueStatusBadge } from "../../components";
import IssueActions from "./IssueActions";
import { useRouter } from "next/navigation";
import NextLink from 'next/link'
import { Issue, Status } from "@prisma/client";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  searchParams: { 
    status: Status,
    orderBy: keyof Issue
  }
}

const IssuesPage = async ({ searchParams } : Props) => {

// refactor columns to created via map - `{}[]` is TS type syntax for "array of objects"
  const columns: { 
    label: string; 
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue' , value: 'title'},
    { label: 'Status' , value: 'status', className: "hidden md:table-cell"},
    { label: 'Created At', value: 'createdAt', className: "hidden md:table-cell"},
  ]

  // prisma call here was edited to include filtering

  // must validate issues in case users try to enter invalid search parameter IE ?status=OPENX

  // store array of valid statuses 
  const statuses = Object.values(Status)
  // check to see if searchParams.status matches any of the valid statuses else return undefined (prisma will do nothing with undefined)
  const validStatus = statuses.includes(searchParams.status) ? searchParams.status : undefined
  
  // must validate the orderBy object, or else you'll get an error if there are no orderBy search params
  // must also validate in case users try to enter invalid search param IE ?orderBy=titleX
  // we can't do .includes on columns because it expects a column object (columns is an array of strings..).
  // map over array of objects..
  const orderBy = columns.map(
    // if that column's .value matches searchParams.orderBy value...
    (column) => column.value)
    .includes(searchParams.orderBy) 
    // we pass it to prisma, dynamically depending on what the orderBy is
    ? { [searchParams.orderBy] : 'asc' } 
    // else undefined, prisma does nothing with undefined
    : undefined


  const issues = await prisma.issue.findMany({ 
    where: {
      status: validStatus
    },
    // this is where we can sort data - add one or many properties
    orderBy 
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              return <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  // we set href to an object instead of a string to address ordering overwriting filtering
                  // use spread operator to copy all existing parameters, then override the orderBy parameter using column.value
                  query: { ...searchParams, orderBy: column.value}
                }}>
                  {column.label}
                </NextLink>
                {/* display arrow if we are ordering with search params */}
                {column.value === searchParams.orderBy && <FaArrowUp className="inline ml-1 mb-1"/>}
              </Table.ColumnHeaderCell>
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomIssueLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </CustomIssueLink>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
//forces this page to be dynamically rendered
export const dynamic = `force-dynamic`;
export default IssuesPage;
