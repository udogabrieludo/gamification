import React from 'react'
import { Container, Row} from './styles/main'

const Main = ({children}) => {
    return (
        <Container>
             <Row>
                 {children} 
             </Row>
        </Container>
    )
}

export default Main
