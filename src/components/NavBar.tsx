import {Box, Link, Flex, Button} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

import {isServer} from './../utils/isServer'

const NavBar = () => {

    const router = useRouter()

    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    // console.log(data)
    let body = null
  
    if(fetching){
        body = null
    }else if(!data?.me){
        body = <>
                <NextLink href='/register'><Link mr={2}>Register</Link></NextLink>
                <NextLink href='/login'><Link mr={7}>Login</Link></NextLink>
            </>
    }else{
        body = (
            <Flex>
                <Box mr='4'>{data.me.username}</Box>
                <Button
                 variant='link' 
                 onClick={async()=>{
                        await logout()
                        router.reload()
                    }}
                 isLoading={logoutFetching}
                >logout</Button>
            </Flex>
        )
    }

    return(
        <Flex position='sticky' top={0} zIndex='1' bg='tomato' padding='4'>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar

