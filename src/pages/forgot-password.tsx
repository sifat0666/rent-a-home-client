import { Box, Flex, Button, Link } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import router from "next/router"
import React, { useState } from "react"
import InputField from "../components/InputField"
import Wrapper from "../components/Wrapper"
import { toErrorMap } from "../utils/toErrorMap"
import login from "./login"
import NextLink from 'next/link'
import { useForgotPasswordMutation } from "../generated/graphql"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"


const forgotPassword = () => {

    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()

    return(
        <Wrapper variant='small'>
        <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, {setErrors}) => {
               await forgotPassword(values)
               setComplete(true)
            }}
        >
        {({isSubmitting}) =>
        complete ? (
            <Box>if an account with that email exists, we sent the email</Box>
        ):(
            <Form>

            <InputField 
                name='email' 
                lable='Email' 
                placeholder='Email' 
            />







            <Button mt={4} type='submit' colorScheme='teal' isLoading={isSubmitting}>Forgot Password</Button>
            
            

            
            </Form>



        )}
        </Formik>

        
    </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(forgotPassword)