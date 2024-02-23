import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "@radix-ui/themes";

// you can define a interface or destructure it inline as done below
// interface Props {
//     status: Status
// }

// the single `|` in this case means the same as `||`
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSE: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
