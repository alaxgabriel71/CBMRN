/* import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Página Inicial</Link>
                </li>
                <li>
                    <Link to="/materials-list">Lista de materiais</Link>
                </li>
                <li>
                    <Link to="/moviment-history">Histórico de movimentações
                    </Link></li>
                <li>
                    <Link to="/military-list">Militares
                    </Link></li>
            </ul>
        </nav>
    )
}

export default NavBar; */

// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
    const expand = 'xxl'
    return (
    <>
      {/* [false, 'sm', 'md', 'lg', 'xl', 'xxl'] */}
        <Navbar key={expand} bg="danger" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/">2º SGB/1ºGBM</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Página Inicial</Nav.Link>
                  <Nav.Link href="/materials-list">Lista de materiais</Nav.Link>
                  <Nav.Link href="/moviment-history">Histórico de movimentações</Nav.Link>
                  <Nav.Link href="/military-list">Militares</Nav.Link>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default NavBar;