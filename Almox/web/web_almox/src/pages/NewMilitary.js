import { Link } from 'react-router-dom'

import NewMilitaryForm from '../components/NewMilitaryForm'

export default function NewMilitary(){
    return(
        <article>
            <h2>Cadastrar Militares</h2>
            <NewMilitaryForm />
            <Link to='/military-list'>Voltar</Link>
        </article>
    )
}