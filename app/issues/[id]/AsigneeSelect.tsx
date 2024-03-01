"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";

const AsigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // destructure the data immediately from the axios call
      // be sure to type the data as an array of User objects
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    // make sure to call the function
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => {
            return (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
