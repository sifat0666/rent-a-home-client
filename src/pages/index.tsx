import { Box, Button, Flex, Heading, Icon, IconButton, Link, Stack, Text, Textarea } from "@chakra-ui/react";
import { } from "formik";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NavBar from "./../components/NavBar";
import NextLink from 'next/link'
import { loadavg } from "os";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import UpvoteSection from "../components/UpvoteSection";


const Index = () => {

    const [variables, setVariables] = useState({limit: 10, cursor: null as string | null})

    const [{data,error, fetching}] = usePostsQuery({
        variables,
    })

    if(!fetching && !data){
        return <div>
            query failed for some reason
            <div>
            {error?.message}
            </div>
            </div>
    }

    return(
        <Layout>
            <Flex>
            <Heading>Rent Hobe</Heading>
            <Link ml='auto'>
                <NextLink href='/create-post'>Create Post</NextLink>
            </Link>
            </Flex>

        {!data && fetching ? (<div>loading...</div>) : (
            <Stack spacing={8}>
                

            {data?.posts.posts.map((p)=>(

           
                
                <Box
                key={p.id}
                mt= '8'
                p={5}
                shadow="md"
                borderWidth="1px"
                flex="1"
                borderRadius="md"
                
              >

                <Flex key={p.id}>
                    <UpvoteSection post={p}/>
                    <Box>
                        <Heading fontSize="xl">{p.title}</Heading>
                        <Text mt={1}>Posted by {p.creator.username}</Text>
                        <Text mt={4}>{p.text.slice(0, 50)}</Text>
                    </Box>
                </Flex>
              </Box>
            ))}

            </Stack>)

        }

                {data && data.posts.hasMore ? <Flex>
                    <Button 
                        isLoading={fetching} 
                        onClick={()=>{
                            setVariables({
                                limit: variables.limit,
                                cursor: data.posts.posts[data.posts.posts.length -1].createdAt
                            })}
                        }
                        colorScheme='red' 
                        m='auto' 
                        my='8'>Load More</Button>
                </Flex>: null}
        </Layout>
    )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)





