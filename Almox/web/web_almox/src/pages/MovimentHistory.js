import { useState, useEffect } from 'react'

import api from '../services/api'
import DeleteHistoryModal from '../components/modals/DeleteHistoryModal'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Movement from '../components/Movement'

export default function MovimentHistory() {
    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    const today = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate
    
    const [movements, setMovements] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [movesPerPage] = useState(5)
    const [search, setSearch] = useState('')
    const [operation, setOperation] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        setLoading(true)
        api.get('/movements')
            .then(({ data }) => setMovements(data.movements))
            .catch(err => console.error(err))
        setLoading(false)
    }, []);
    // console.log(movements)div

    const indexOfLastMove = currentPage * movesPerPage
    const indexOfFirstMove = indexOfLastMove - movesPerPage
    const currentMoves = movements.slice(indexOfFirstMove, indexOfLastMove)

    var filteredItems = []
    var searchFilteredItems = []
    var operationFilteredItems = []
    var dateFilteredItems = []
    const lowerCaseSearch = search.toLowerCase()
    currentMoves.forEach(move => {
        if (move.description.toLowerCase().includes(lowerCaseSearch)) {
            searchFilteredItems.push(move)
        }
    })

    if(!operation){
        operationFilteredItems = searchFilteredItems
    } else {
        searchFilteredItems.forEach(move => {
            if(move.operation.includes(operation)){
                operationFilteredItems.push(move)
            }
        })
    }

    if(!date){
        dateFilteredItems = operationFilteredItems
    } else {
        operationFilteredItems.forEach(move => {
            if(move.date.includes(date)){
                dateFilteredItems.push(move)
            }
        })
    }

    filteredItems = dateFilteredItems

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <h2>Histórico de Movimentações</h2>
            <button onClick={() => setShow(true)}>Apagar Histórico</button>
            <Pagination itemsPerPage={movesPerPage} totalItems={movements.length} paginate={paginate} />
            <fieldset>
                <legend>Filtros</legend>
                <label>
                    Operação
                    <select value={operation} onChange={e => setOperation(e.target.value)}>
                        <option value="">-- Escolha a operação --</option>
                        <option value="Recebimento">Recebimento</option>
                        <option value="Atualização">Atualização</option>
                        <option value="Devolução">Devolução</option>
                        <option value="Exclusão">Exclusão</option>
                    </select>
                </label>
                <label>
                    Descrição
                    <input type="text" placeholder="Buscar nessa página..." value={search} onChange={e => setSearch(e.target.value)} />
                </label>
                <label>
                    Data da movimentação
                    <input type="date" defaultValue={date} max={today} onChange={e => setDate(e.target.value)}/>
                </label>
            </fieldset>
            <Loading loading={loading} />
            {filteredItems?.map(movement => (
                // <h4 key={movement._id}>{movement.description}</h4>
                <Movement key={movement._id} operation={movement.operation} description={movement.description} date={movement.date} />
            ))}
            <DeleteHistoryModal show={show} onClose={() => setShow(false)} />
        </div>
    )
}