// import { Link } from 'react-router-dom'
import styles from './NewMilitary.module.css'

import NewMilitaryForm from '../components/forms/NewMilitaryForm'

export default function NewMilitary(){
    return(
        <article>
            <h2 className={styles.Title_container} >Cadastro de Militares</h2>
            <NewMilitaryForm />
        </article>
    )
}