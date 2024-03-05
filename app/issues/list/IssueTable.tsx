import { CustomIssueLink, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import NextLink from "next/link";

// creating a reusable interface for page.tsx
export interface IssueQuery {
    status: Status;
    // using keyof gives you a union of all properties of Issue (note - all strings, again because they are coming from the URL)
    orderBy: keyof Issue;
    // add page parameter for pagination
    page: string;
    
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}


const IssueTable = async ({ searchParams, issues }: Props) => {
    // refactor columns to created via map - `{}[]` is TS type syntax for "array of objects"
    
    return (
        <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
              return (
                  <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                  >
                <NextLink
                  href={{
                      // we set href to an object instead of a string to address ordering overwriting filtering
                      // use spread operator to copy all existing parameters, then override the orderBy parameter using column.value
                      query: { ...searchParams, orderBy: column.value },
                    }}
                    >
                  {column.label}
                </NextLink>
                {/* display arrow if we are ordering with search params */}
                {column.value === searchParams.orderBy && (
                    <FaArrowUp className="inline ml-1 mb-1" />
                    )}
              </Table.ColumnHeaderCell>
            );
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
  );
};

export default IssueTable;

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
        label: "Created At",
        value: "createdAt",
        className: "hidden md:table-cell",
    },
];

// we only want to export the names of the column names, because the rest of the details are only relevant to this component. maintain encapsulation!
export const columnNames = columns.map(column => column.value)