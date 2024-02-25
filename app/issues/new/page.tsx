import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  //optional loading property that you can set to a function and render your skeletons for this dynamically rendered component
  loading: () => <IssueFormSkeleton />
});

const NewIssuePage = () => {
  return <IssueForm></IssueForm>;
};

export default NewIssuePage;
