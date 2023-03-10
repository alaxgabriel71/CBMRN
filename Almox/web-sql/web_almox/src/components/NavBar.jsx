import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// import './NavBar.css'

function NavBar() {
  const expand = false
  const { login, user, isAuthenticated, saveLoggedUser } = useContext(UserContext)
  const navigate = useNavigate()

  console.log('Authenticated', isAuthenticated)

  const handleLogout = () => {
    saveLoggedUser('')
    navigate('/login')
  }

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
            <div className="navbar-user">
              <Dropdown>
                <Dropdown.Toggle variant="danger">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item><NavLink to="/login">Sair</NavLink></Dropdown.Item> */}
                  <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
                  <Nav.Link hidden={!user|| ((user.admin !== 'commander') && (user.admin !== 'moderator') && (user.admin !== 'regular'))}href="/materials-tabs">Materiais</Nav.Link>
                  <Nav.Link hidden={!user|| ((user.admin !== 'commander') && (user.admin !== 'moderator'))} href="/movement-history">Histórico de movimentações</Nav.Link>
                  <Nav.Link href="/military-tabs">Militares</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} href="/users">Usuários</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} href="/register">Cadastrar Militar</Nav.Link>
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