import ServiceRoutine from "./ServiceRoutine";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    const date = new Date()

    return (

        <Container fluid>
            <Row>
                <Col>
                    <article>
                        <h1>Rotina de Serviço {` - ${date.toLocaleDateString('pt-BR')}`}</h1>
                        <ServiceRoutine />
                    </article>
                </Col>
            </Row>
        </Container>
    )
}