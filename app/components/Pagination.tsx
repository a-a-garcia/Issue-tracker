'use client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface Props {
    itemCount: number,
    pageSize: number,
    currentPage: number
}

const Pagination = ( {itemCount, pageSize, currentPage} : Props) => {
    // router for passing the current page to the URL
    const router = useRouter();
    // access current url parameters
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        // we use toString because .set expects a string.
        params.set('page', page.toString());
        router.push('?' + params.toString())
    }

    const pageCount = Math.ceil(itemCount / pageSize)


    if (pageCount <= 1) return null;

  return (
    <Flex align={'center'} gap="2">
        <Text size={"2"}>Page {currentPage} of {pageCount}</Text>
        <Button 
            variant='soft' 
            color='gray' 
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
        >
            <FaArrowAltCircleLeft />
        </Button>
        <Button 
            variant='soft' 
            color='gray' 
            disabled={currentPage === 1}
            onClick={() => changePage( currentPage - 1)}
        >
            <FaArrowLeft />
        </Button>
        <Button 
            variant='soft' 
            color='gray' 
            disabled={currentPage === pageCount}
            onClick={() => changePage( currentPage + 1)}
            >
            <FaArrowRight />
        </Button>
        <Button 
            variant='soft' 
            color='gray' 
            disabled={currentPage === pageCount}
            onClick={() => changePage( pageCount)}
            >
            <FaArrowAltCircleRight />
        </Button>
    </Flex>
  )
}

export default Pagination