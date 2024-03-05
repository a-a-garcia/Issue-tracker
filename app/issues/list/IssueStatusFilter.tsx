"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();

  // hook to access our current search params
  const searchParams = useSearchParams();

  // Status is defined in our prisma schema
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSE" },
  ];

  return (
    <div>
      <Select.Root 
      defaultValue={searchParams.get('status') || undefined}
      onValueChange={(status) => {
        // building our query string dynamically
        // this returns an object that we will append and conver result to string
        const params = new URLSearchParams();
        searchParams.get('orderBy')

        if (status) { 
          params.append( 'status', status)
        }

        // need a '!' here because we know at this point searchParams.get returns a string.
        if (searchParams.get('orderBy')) {
          params.append( 'orderBy', searchParams.get('orderBy')!)
        }
      
        const query = params.size ? '?' + (params.toString())
        : ''

        router.push(`/issues/list/${query}`)
      }}>
        <Select.Trigger placeholder="Filter by..."></Select.Trigger>
        <Select.Content>
          {statuses.map((status) => {
            return (
              // for the value prop we use the `nullish coalescing operator` (`??`). if `status.value` is `null` or `undefined`, it will use `ALL`, otherwise it will use `status.value`. Ensures `value` is always a string.
              <Select.Item key={status.value} value={status.value ?? 'ALL'}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueStatusFilter;
