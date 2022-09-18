import React from 'react'
import { Container, Wrapper, Group, Logo, LinkItem, Button } from './styles/TopMenu'

const Menu = ({children, ...resProps}) => {
    return (
        <Container  {...resProps}>
             {children}
        </Container>
    )
}

export default Menu



Menu.Wrapper = function MenuWrapper({children, ...resProps}){
    return <Wrapper {...resProps}>{children}</Wrapper>
}

Menu.Group = function MenuGroup({children, ...resProps}){
    return <Group {...resProps}>{children}</Group>
}

Menu.Logo = function MenuLogo({children, ...resProps}){
    return <Logo {...resProps}>{children}</Logo>
}

Menu.LinkItem = function MenuLinkItem({children, ...resProps}){
    return <LinkItem {...resProps}>{children}</LinkItem>
}


Menu.Button = function MenuButton({children, ...resProps}){
    return <Button {...resProps}>{children}</Button>
}