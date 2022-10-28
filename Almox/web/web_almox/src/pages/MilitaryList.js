import { useState, useEffect } from 'react'

import api from '../services/api'
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
            {military?.map(mil => 
                <h3 key={mil._id}>{mil.name}</h3>
            )}
        </div>
    )
}