import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface Props {
    itemCount: number,
    pageSize: number,
    currentPage: number
}

const Pagination = ( {itemCount, pageSize, currentPage} : Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)

    if (pageCount <= 1) return null;

  return (
    <Flex align={'center'} gap="2">
        <Text size={"2"}>Page {currentPage} of {pageCount}</Text>
        <Button variant='soft' color='gray' disabled={currentPage === 1}>
            <FaArrowAltCircleLeft />
        </Button>
        <Button variant='soft' color='gray' disabled={currentPage === 1}>
            <FaArrowLeft />
        </Button>
        <Button variant='soft' color='gray' disabled={currentPage === pageCount}>
            <FaArrowRight />
        </Button>
        <Button variant='soft' color='gray' disabled={currentPage === pageCount}>
            <FaArrowAltCircleRight />
        </Button>
    </Flex>
  )
}

export default Pagination