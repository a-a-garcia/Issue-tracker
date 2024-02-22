'use client'
import React, { useState } from 'react'
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaExclamationCircle } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

//telling zod to infer what the type of issueForm is. this is to remove redundancy of having to change the interface here and in the schema should the form change 
type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
  //useForm returns an object, destructure to get props you need
  //register allows input field tracking with react-hook-form
  // formState object allows you to access everything you need from the forms' properties
  // resolver allows hook form to integrate with zod
  const {register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => { 
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data); 
      router.push('/issues')
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occurred.')
    }
  });

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className='max-w-xl' >

      {error && <Callout.Root className='mb-5' color="red">
        <Callout.Icon>
          <FaExclamationCircle />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <form className='max-w-xl space-y-5' onSubmit={onSubmit}>
          <TextField.Root>
              {/* use spread operator to add the 4 properties from the register function as props to this component */}
              <TextField.Input placeholder="Title" {...register('title')} />
          </TextField.Root>
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          <Controller 
            name="description"
            // set control to the control property destructured from useForm
            control={control}
            // render takes a function, returns the markdown editor
            // field has the same properties as the object from the register function (onChange, onBlur, etc)
            render={({field}) => <SimpleMDE placeholder='Description'{...field}/>}
          />
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
          <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner></Spinner>}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage