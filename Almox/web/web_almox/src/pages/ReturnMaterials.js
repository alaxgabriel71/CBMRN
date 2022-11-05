import { Link } from 'react-router-dom'

import ReturnMaterialsForm from '../components/ReturnMaterialsForm'

export default function ReturnMaterials() {
    return (
        <article>
            <h2>Devolução de Materiais</h2>
            <ReturnMaterialsForm />
            <Link to="/materials-list">Voltar</Link>
        </article>
    )
}