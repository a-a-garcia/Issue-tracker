"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  //   destructure the result to grab 3 properties
  //   data - renamed as users, error & isLoading
  const { data: users, error, isLoading } = useUsers();

  // return a skeleton while fetching users
  if (isLoading) return <Skeleton />;

  //   error handling - if there's an error it will be populated from line 12
  if (error) return null;

  // Using React Query instead of state and effect hooks
  //   const [users, setUsers] = useState<User[]>([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       // destructure the data immediately from the axios call
  //       // be sure to type the data as an array of User objects
  //       const { data } = await axios.get<User[]>("/api/users");
  //       setUsers(data);
  //     };
  //     // make sure to call the function
  //     fetchUsers();
  //   }, []);

  const assignIssue = async (userId: string) => {
    await axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "Unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Failed to assign issue.");
      });
  };

  return (
    <>
      <Toaster />
      <Select.Root onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Group>
              <Select.Item value="Unassigned">Unassigned</Select.Item>
              {/* using optional chaining to solve the issue of users initially being empty*/}
              {users?.map((user) => {
                return (
                  <Select.Item value={user.id} key={user.id}>
                    {user.name}
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  // call useQuery and give it an object with 2 properties (also type it as an array of Users)
  useQuery<User[]>({
    // used for uniquely identifying a piece of data in the cache - array of strings
    queryKey: ["users"],

    // a function for fetching data - can use any fetch function
    // returns a promise, we want to return the data thats resolved from the promise (hence the .then)
    queryFn: () => axios.get("/api/users").then((res) => res.data),

    // defines how long to treat fetched data as fresh. Once stale, it will re-fetch. default is 0, which we don't want to take advantage of caching
    staleTime: 3600 * 1000,

    // defines how many times to retry if the call to the backend fails. (it will try retry amount of times + 1 the inital call)
    retry: 3,
  });

export default AsigneeSelect;
