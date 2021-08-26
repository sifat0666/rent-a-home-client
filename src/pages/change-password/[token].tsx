import { Form, Formik } from "formik"
import { NextPage } from "next"
import router, { useRouter } from "next/router"
import React, { useState } from "react"
import { toErrorMap } from "../../utils/toErrorMap"
import login from "../login"
import Wrapper from "../../components/Wrapper"
import { Box } from "@chakra-ui/layout"
import { Button, Link } from "@chakra-ui/react"
import InputField from "../../components/InputField"
import { createUrqlClient } from "../../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"
import { useChangePasswordMutation } from "../../generated/graphql"
import NextLink from 'next/link'

const  ChangePassword = () => {

    const [, changePassword] = useChangePasswordMutation()

    const router = useRouter()

    const [tokenError, settokenError] = useState('')
    return(
    <Wrapper variant='small'>
    <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, {setErrors}) => {
            const responce = await changePassword({
                newPassword: values.newPassword,
                token: 
                    typeof router.query.token === 'string' ? router.query.token : ''
            })
            if(responce.data?.changePassword.errors){
                const errorMap = toErrorMap(responce.data.changePassword.errors)
                if('token' in errorMap){
                    settokenError(errorMap.token)
                } 
                setErrors(errorMap)
                
            }else if(responce.data?.changePassword.user){
                console.log(responce.data?.changePassword.user)
                router.push('/')
            }
        }}
    >
        {({isSubmitting}) => (
            <Form>

            <InputField 
                name='newPassword' 
                lable='New Password' 
                placeholder='New Password' 
                type= 'password'
            />

            {tokenError ? (
                <Box>
                <Box color='red'>{tokenError}</Box>
                <NextLink href='/forgot-password'>
                    <Link>Click here to get a new one</Link>
                </NextLink>
                </Box>
            ): null}

            <Button mt={4} type='submit' color='teal' isLoading={isSubmitting}>Login</Button>

            </Form>

        )}
    </Formik>
    </Wrapper>
)
}

// ChangePassword.getInitialProps = ({query}) => {
//     return {token: query.token as string}
// }

export default withUrqlClient(createUrqlClient)(ChangePassword)