import { useState, useEffect } from 'react'

import api from '../services/api'
import DeleteHistoryModal from '../components/modals/DeleteHistoryModal'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'

export default function MovimentHistory() {
    const [movements, setMovements] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [movesPerPage] = useState(5)

    useEffect(() => {
        setLoading(true)
        api.get('/movements')
            .then(({data}) => setMovements(data.movements))
            .catch(err => console.error(err))
        setLoading(false)
    }, []);
    // console.log(movements)div

    const indexOfLastMove = currentPage * movesPerPage
    const indexOfFirstMove = indexOfLastMove - movesPerPage
    const currentMoves = movements.slice(indexOfFirstMove, indexOfLastMove)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    return (
        <div>
            <h2>Histórico de Movimentações</h2>
            <button onClick={() => setShow(true)}>Apagar Histórico</button>
            <Pagination itemsPerPage={movesPerPage} totalItems={movements.length} paginate={paginate} />
            <Loading loading={loading} />
            {currentMoves?.map(movement => <h4 key={movement._id}>{movement.description}</h4>)}
            <DeleteHistoryModal show={show} onClose={() => setShow(false)}/>
        </div>
    )
}