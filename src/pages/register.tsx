import React from "react"
import Wrapper from "../components/Wrapper"
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormHelperText, Box, Button } from "@chakra-ui/react";
import {useRouter} from 'next/router'
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";









const register = () => {

    const router = useRouter()

    const [, register] = useRegisterMutation()

    return(
    <Wrapper variant='small'>
        <Formik
            initialValues={{ username:'', password: '', email: '' }}
            onSubmit={async (values, {setErrors}) => {
                const responce = await register(values)
                if(responce.data?.register.errors){
                    setErrors(toErrorMap(responce.data.register.errors))
                }else if(responce.data?.register.user){
                    console.log(responce.data?.register.user)
                    router.push('/')
                }
            }}
        >
        {({isSubmitting}) => (
            <Form>

            <InputField 
                name='username' 
                lable='Username' 
                placeholder='username' 
            />

            <Box mt={4}>
                <InputField 
                    name='email' 
                    lable='Email' 
                    placeholder='Email' 
                    type='email' 
                />
            </Box>

            <Box mt={4}>
                <InputField 
                    name='password' 
                    lable='Password' 
                    placeholder='password' 
                    type='password' 
                />
            </Box>

            <Button mt={4} type='submit' color='teal' isLoading={isSubmitting}>Register</Button>

            </Form>

        )}
        </Formik>
    </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(register)