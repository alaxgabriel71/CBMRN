import { Link } from 'react-router-dom'

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

export default NavBar;