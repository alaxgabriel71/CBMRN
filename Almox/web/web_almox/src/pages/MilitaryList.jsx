import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../components/contexts/UserContext'
// import { Link } from 'react-router-dom'

import api from '../services/api'
import Military from '../components/Military'
import Loading from '../components/Loading'
import styles from './MilitaryList.module.css'

// import Modal from '../components/modals/Modal'

export default function Militarylist() {
    // const [show, setShow] = useState(false);
    const [military, setMilitary] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useContext(UserContext)
    
    api.defaults.headers.Authorization = `Bearer ${user.token}`

    async function fetchMilitary() {
        setLoading(true)
        await api.get('/military')
            .then(({ data }) => {
                setMilitary(data.military)
            })
            .catch(err => {
                console.error("error: " + err)
            })
        setLoading(false)
    }

    useEffect(() => {
        fetchMilitary()
    }, [])

    useEffect(() => {
        console.log('useEffect')
    }, [military])

    // console.log(military)

    const handleClick = () => {
        // setMilitary([...military])
        console.log('Atualizou')
    }

    return (
        <article>
            <h2 className={styles.Title_container} >Lista de Militares</h2>
            <Loading loading={loading} />
            <ul className={styles.Military_list}>
                {military?.map(mil => (
                    <li key={mil._id}>
                        <Military key={mil._id} id={mil._id} name={mil.name} rank={mil.rank} handleClick={handleClick} />
                    </li>
                ))}
            </ul>

        </article>
    )
}