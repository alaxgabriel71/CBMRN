import { useState } from 'react'

import Modal from '../components/modal/Modal'

export default function Militarylist(){
    const [show, setShow] = useState(false);
    
    return(
        <div>
            <h2>Militares</h2>
            <button onClick={() => setShow(true)}>Editar</button>
            <Modal onClose={() => setShow(false)} show={show}/>
        </div>
    )
}