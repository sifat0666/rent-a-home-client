import { Box } from "@chakra-ui/react"
import React from "react"

export type  WrapperVarient = 'small' | 'regular'

interface WrapperProps{
    variant?: WrapperVarient
}

const Wrapper: React.FC<WrapperProps> = ({children, variant='regular'}) => {
    return <Box 
                maxW={variant === 'regular' ? '800px': '400px'}
                w='100%'
                mt={8}
                mx='auto'
                
            >
            {children}
           </Box>
}

export default Wrapper