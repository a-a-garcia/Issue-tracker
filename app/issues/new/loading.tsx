import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from "@radix-ui/themes";

const NewIssueLoadingPage = () => {
  return <div className="max-w-xl">

  <Box className="max-w-xl space-y-5">
    <Skeleton />
    <Skeleton height="20rem"/>
  </Box>
</div>
};

export default NewIssueLoadingPage;
