import React, { PropsWithChildren } from 'react'
import { Text } from '@radix-ui/themes';

// unneccessary because we have type PropsWithChildren defined in React
// interface Props {
//     children: ReactNode
// }

const ErrorMessage = ({children} : PropsWithChildren) => {
  if (!children) return null;
    return (
    <Text color="red" as="div">{children}</Text>
  )
}

export default ErrorMessage