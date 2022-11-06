import { Link } from 'react-router-dom'

import NewMaterialsForm from '../components/NewMaterialsForm'

export default function NewMaterials() {
    return (
        <article>
            <h2>Adicionar Materiais</h2>
            <NewMaterialsForm />
        </article>
    )
}