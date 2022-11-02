import { useState, useEffect } from 'react'

import api from '../services/api'
import DeleteHistoryModal from '../components/modals/DeleteHistoryModal'
import Loading from '../components/Loading'

export default function MovimentHistory() {
    const [movements, setMovements] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/movements')
            .then(({data}) => setMovements(data.movements))
            .catch(err => console.error(err))
        setLoading(false)
    }, []);

    console.log(movements)
    
    return (
        <div>
            <h2>Histórico de Movimentações</h2>
            <button onClick={() => setShow(true)}>Apagar Histórico</button>
            <Loading loading={loading} />
            {movements?.map(movement => <h4 key={movement._id}>{movement.description}</h4>)}
            <DeleteHistoryModal show={show} onClose={() => setShow(false)}/>
        </div>
    )
}