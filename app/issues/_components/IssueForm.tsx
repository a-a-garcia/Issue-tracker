"use client";
import React, { useState } from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components/index";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";

//telling zod to infer what the type of issueForm is. this is to remove redundancy of having to change the interface here and in the schema should the form change
type IssueFormData = z.infer<typeof issueSchema>;

// `?` after issue means that it's an optional prop. It won't exist for the edit page
const IssueForm = ({ issue }: { issue?: Issue }) => {
  // ensures that the simpleMDE editor is only loaded on the client side to avoid `navigator is not defined` error
  // UPDATE: no longer rendering this dynamically to smoothen loading experience
  // const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  //   ssr: false,
  // });

  //useForm returns an object, destructure to get props you need
  //register allows input field tracking with react-hook-form
  // formState object allows you to access everything you need from the forms' properties
  // resolver allows hook form to integrate with zod
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Icon>
            <FaExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-5" onSubmit={onSubmit}>
        <TextField.Root>
          {/* use spread operator to add the 4 properties from the register function as props to this component */}
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          //for pre-populating field for edit page
          defaultValue={issue?.description}
          name="description"
          // set control to the control property destructured from useForm
          control={control}
          // render takes a function, returns the markdown editor
          // field has the same properties as the object from the register function (onChange, onBlur, etc)
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update" : "Submit"} New Issue{" "}
          {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
