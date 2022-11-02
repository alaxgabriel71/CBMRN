import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import Military from '../components/Military'

// import Modal from '../components/modals/Modal'

export default function Militarylist(){
    // const [show, setShow] = useState(false);
    const [military, setMilitary] = useState([]);

    async function fetchMilitary(){
        await api.get('/military')
        .then( ({data}) => {
            setMilitary(data.military)
        })
        .catch( err => {
            console.error("error: " + err)
        })
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
    
    return(
        <div>
            <h2>Militares</h2>
            <Link to='/new-military'>Cadastrar Militares</Link>
            {military?.map(mil => 
                <Military key={mil._id} id={mil._id} name={mil.name} rank={mil.rank} handleClick={handleClick}/>
            )}
        </div>
    )
}