import { Link } from 'react-router-dom'

import NewMaterialsForm from '../components/NewMaterialsForm'

export default function NewMaterials() {
    return (
        <div>
            <h2>Adicionar Materiais</h2>
            <NewMaterialsForm />
            <Link to="/materials-list">Voltar</Link>
        </div>
    )
}