import Wrapper, { WrapperVarient } from "./Wrapper"
import NavBar from "./NavBar"
import React from "react"

interface LayoutProps{
    variant?: WrapperVarient
}

const Layout: React.FC<LayoutProps> = ({variant, children}) => {
    return(
        <>
        <NavBar />

        <Wrapper>
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
            
        </Wrapper>
        </>
    )    
}

export default Layout