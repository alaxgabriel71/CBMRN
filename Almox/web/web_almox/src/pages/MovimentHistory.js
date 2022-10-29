import { useState, useEffect } from 'react'
import api from '../services/api'

export default function MovimentHistory() {
    const [movements, setMovements] = useState([])

    useEffect(() => {
        api.get('/movements')
            .then(({data}) => setMovements(data.movements))
            .catch(err => console.error(err))
    }, []);

    console.log(movements)
    
    return (
        <div>
            <h2>Histórico de Movimentações</h2>
            {movements?.map(movement => <h4 key={movement._id}>{movement.description}</h4>)}
        </div>
    )
}