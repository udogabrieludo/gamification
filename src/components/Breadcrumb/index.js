import React from 'react'
import { Container, Row, Title, Subtitle } from './styles/breadcrumb'

const BreadCrumb = ({title, subtitle}) => {
    return (
        <Container>
             <Row>
                  <Title>{title}</Title>
                  <Subtitle>{subtitle}</Subtitle>
             </Row>
        </Container>
    )
}

export default BreadCrumb
