import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import Military from '../components/Military'

// import Modal from '../components/modals/Modal'

export default function Militarylist(){
    // const [show, setShow] = useState(false);
    const [military, setMilitary] = useState([]);

    useEffect(() => {
        api.get('/military')
            .then( ({data}) => {
                setMilitary(data.military)
            })
            .catch( err => {
                console.error("error: " + err)
            })
    }, [])

    console.log(military)
    
    return(
        <div>
            <h2>Militares</h2>
            <Link to='/new-military'>Cadastrar Militares</Link>
            {military?.map(mil => 
                <Military key={mil._id} name={mil.name} rank={mil.rank}/>
            )}
        </div>
    )
}