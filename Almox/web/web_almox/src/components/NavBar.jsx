import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useState, useEffect, useContext } from 'react'
import { UserContext } from './contexts/UserContext'

// import './NavBar.css'

function NavBar() {
  const expand = false
  const { login, userLoading, setUserLoading, user } = useContext(UserContext)

  setUserLoading(false)
  console.log('user nav', user)

  return (
    <>
      {!login && (
        <Navbar key={expand} bg="danger" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="Nav-Brand">
              <img
                alt="Logo CBMRN"
                src="/cbmrn.svg"
                width="30"
                height="30"
                id="logoCbmrn"
              />{' '}
              2º SGB/1ºGBM
            </Navbar.Brand>
            {(!userLoading) && (
              <div className="navbar-user">
                {user.email}
              </div>
            )}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="offcanvas-menu"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Página Inicial</Nav.Link>
                  <Nav.Link href="/materials-tabs">Materiais</Nav.Link>
                  <Nav.Link href="/movement-history">Histórico de movimentações</Nav.Link>
                  <Nav.Link href="/military-tabs">Militares</Nav.Link>
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
      )}
    </>
  );
}

export default NavBar;