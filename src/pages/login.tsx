import React from "react"
import Wrapper from "../components/Wrapper"
import { Formik, Form } from 'formik';
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import {useRouter} from 'next/router'
import InputField from "../components/InputField";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link'









const login = () => {

    const router = useRouter()

    const [, login] = useLoginMutation()

    return(
    <Wrapper variant='small'>
        <Formik
            initialValues={{ userNameOrEmail:'', password: '' }}
            onSubmit={async (values, {setErrors}) => {
                const responce = await login(values)
                if(responce.data?.login.errors){
                    setErrors(toErrorMap(responce.data.login.errors))
                }else if(responce.data?.login.user){
                    console.log(responce.data?.login.user)
                    if(typeof router.query.next === 'string'){
                        router.push(router.query.next)
                    }else{
                        router.push('/')
                    }
                }
            }}
        >
        {({isSubmitting}) => (
            <Form>

            <InputField 
                name='userNameOrEmail' 
                lable='Username of Email' 
                placeholder='Username or Email' 
            />

            <Box mt={4}>
                <InputField 
                    name='password' 
                    lable='Password' 
                    placeholder='password' 
                    type='password' 
                />
            </Box>

            <Flex>
            <Button mt={4} type='submit' color='teal' isLoading={isSubmitting}>Login</Button>
                <NextLink href='/forgot-password'>
                    <Link ml='auto' mt='5'>Forgot Password</Link>
                </NextLink>
            </Flex>



            {/* <Button mt={4} type='submit' color='teal' isLoading={isSubmitting}>Login</Button> */}
            
            

            
            </Form>



        )}
        </Formik>

        
    </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(login)