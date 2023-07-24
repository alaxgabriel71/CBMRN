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
  const { login, user, saveLoggedUser } = useContext(UserContext)
  const navigate = useNavigate()

  //console.log('Authenticated', isAuthenticated)

  const handleLogout = () => {
    saveLoggedUser('')
    navigate('/login')
  }

  return (
    <>
      {!login && (
        <Navbar key={expand} bg="secondary" expand={expand} className="mb-3">
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
              <Dropdown variant="danger">
                <Dropdown.Toggle variant="secondary">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="danger">
                  {/* <Dropdown.Item><NavLink to="/login">Sair</NavLink></Dropdown.Item> */}
                  <Dropdown.Item onClick={() => navigate(`/notifications/${user.id}`)}>Notificações</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/change-password`)}>Alterar Senha</Dropdown.Item>
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
                  <Nav.Link onClick={() => navigate("/")}>Página Inicial</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin === 'none')} onClick={() => navigate("/materials-tabs")} >Controle de Materiais</Nav.Link>
                  {/* <Nav.Link href="/military-tabs">Militares</Nav.Link> */}
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} onClick={() => navigate("/users")}>Controle de Usuários</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} onClick={() => navigate("/register")}>Cadastrar Militar</Nav.Link>
                  {/* <Nav.Link hidden={!user|| (user.admin !== 'commander')} onClick={() => navigate("/garrisons-tabs")}>Controle de Guarnições</Nav.Link> */}
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} href="/garrisons-tabs">Controle de Guarnições</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} onClick={() => navigate("/vehicles-tabs")}>Controle de Viaturas</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin !== 'commander')} onClick={() => navigate("/control/guards")}>Controle das Guardas</Nav.Link>
                  <Nav.Link onClick={() => navigate("/vehicle-materials-list")}>Lista de Materiais das Viaturas</Nav.Link>
                  <Nav.Link onClick={() => navigate('/check-material')}>Conferência de Material</Nav.Link>
                  <Nav.Link onClick={() => navigate('/simple-vehicle-checklist')}>Checklist Simples de Viatura</Nav.Link>
                  <Nav.Link onClick={() => navigate('/define/guards')}>Definir Horário das Guardas</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin === 'none')} onClick={() => navigate('/define/service-routine')}>Definir Rotina de Serviço</Nav.Link>
                  <Nav.Link hidden={!user|| (user.admin === 'none')} onClick={() => navigate("/spots")} >Locais do Quartel</Nav.Link>
                  <Nav.Link hidden={!user|| ((user.admin !== 'commander') && (user.admin !== 'moderator'))} onClick={() => navigate("/movements/history")} >Histórico de Movimentações de Materiais</Nav.Link>
                  <Nav.Link hidden={!user|| ((user.admin !== 'commander') && (user.admin !== 'moderator'))} onClick={() => navigate("/check-materials/history")} >Histórico de Conferência de Materias</Nav.Link>
                  <Nav.Link hidden={!user|| ((user.admin !== 'commander') && (user.admin !== 'moderator'))} onClick={() => navigate('/simple-vehicle-checklist/history')}>Histórico do Checklist Simples de Viatura</Nav.Link>
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