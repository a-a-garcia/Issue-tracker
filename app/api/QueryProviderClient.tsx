//react context only available in client components.
"use client";

// remember you can rename things using the `as` keyword
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

// create an instance of the query client
// this query client contains a cache for storing data we get from the back end.
const queryClient = new QueryClient();

// setup similarly to the AuthProvider
// must go to layout and wrap the whole layout
// the reason we need this provider is because it uses react useContext to share the query client with our component tree
const QueryProviderClient = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryProviderClient;
