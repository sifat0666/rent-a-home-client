import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Flex, IconButton } from "@chakra-ui/react"
import React, { useState } from "react"
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql"

interface UpvoteSectionProps {
    post: PostSnippetFragment
}

const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {

    const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");

    const [, vote] = useVoteMutation()

    return(
        <Flex direction='column' mr={4} alignItems='center'>
            <IconButton 
                icon={<ChevronUpIcon />} 
                aria-label='upvote'
                onClick={ async ()=>{
                    setLoadingState('upvote-loading')
                    await vote({
                        postId: post.id,
                        value: 1
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'upvote-loading'}
                />
            {post.points}
            <IconButton 
                icon={<ChevronDownIcon />} 
                aria-label='downvote' 
                onClick={async()=>{
                    setLoadingState('downvote-loading')
                    await vote({
                        postId: post.id,
                        value: -1
                    })
                    setLoadingState('downvote-loading')
                }}
                isLoading={loadingState === 'upvote-loading'}
                />
        </Flex>

    )
}

export default UpvoteSection