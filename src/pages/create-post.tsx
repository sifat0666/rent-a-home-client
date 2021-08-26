import { Box, Flex, Button, Link } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import InputField from "../components/InputField"
import Wrapper from "../components/Wrapper"
import { toErrorMap } from "../utils/toErrorMap"
import login from "./login"
import NextLink from 'next/link'
import { useCreatePostMutation, useMeQuery } from "../generated/graphql"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"
import Layout from "../components/Layout"
import { useIsAuth } from "../utils/useIsAuth"

const CreatePost = () => {

    const router = useRouter()

    useIsAuth()


    const [, createPost] = useCreatePostMutation()

    return(
        <Layout variant='small'>
        <Formik
            initialValues={{ title:'', text: '' }}
            onSubmit={async (values, {setErrors}) => {
                const responce = await createPost({input: values})
                router.push('/')

            }}
        >
        {({isSubmitting}) => (
            <Form>

            <InputField 
                name='title' 
                lable='title' 
                placeholder='title' 
            />

            <Box mt={4}>
                <InputField 
                    textarea
                    name='text' 
                    lable='text' 
                    placeholder='text' 
                />
            </Box>





            <Button mt={6} type='submit' color='white' colorScheme='teal' isLoading={isSubmitting}>Post</Button>
            
            

            
            </Form>



        )}
        </Formik>

        
    </Layout>
    )
    
}

export default withUrqlClient(createUrqlClient)(CreatePost)