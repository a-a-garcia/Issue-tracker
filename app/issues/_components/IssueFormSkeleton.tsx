import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Box className="max-w-xl space-y-5">
        <Skeleton height="2rem"/>
        <Skeleton height="20rem" />
      </Box>
    </div>
  );
};

export default IssueFormSkeleton;
