import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../components/contexts/UserContext'

import api from '../services/api'
import DeleteHistoryModal from '../components/modals/DeleteHistoryModal'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
// import Movement from '../components/Movement'
import { Accordion, Button, FloatingLabel, Form, Table } from 'react-bootstrap'

import styles from './MovementHistory.module.css'

export default function MovimentHistory() {
    // var dateObject = new Date()
    // const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    // const today = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    const [users, setUsers] = useState([])
    const [movements, setMovements] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('active') || 1)
    const [itemsPerPage, setItemsPerPage] = useState(localStorage.getItem('itemsPerPage') || 10)
    const [search, setSearch] = useState('')
    const [remark, setRemark] = useState('')
    const [operation, setOperation] = useState('')
    // const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [responsible, setResponsible] = useState('')

    const { user } = useContext(UserContext)
    
    api.defaults.headers.Authorization = `Bearer ${user.token}`

    useEffect(() => {
        setLoading(true)
        api.get('/movements')
            .then(({ data }) => setMovements(data.movements))
            .catch(err => console.error(err))

        api.get('/users-name')
            .then(({data}) => setUsers(data.users))
            .catch(err => console.error(err))
        setLoading(false)
    }, []);
    // console.log(movements)div

    const dayOptions = []
    for (let i = 1; i <= 31; i++) {
        if (i < 10)
            dayOptions.push(`0${i}`)
        else
            dayOptions.push(`${i}`)
    }

    const monthOptions = [
        { name: '-- Selecione o mês --', value: '' },
        { name: 'Janeiro', value: '01' },
        { name: 'Fevereiro', value: '02' },
        { name: 'Março', value: '03' },
        { name: 'Abril', value: '04' },
        { name: 'Maio', value: '05' },
        { name: 'Junho', value: '06' },
        { name: 'Julho', value: '07' },
        { name: 'Agosto', value: '08' },
        { name: 'Setembro', value: '09' },
        { name: 'Outubro', value: '10' },
        { name: 'Novembro', value: '11' },
        { name: 'Dezembro', value: '12' },
    ]

    const indexOfLastMove = currentPage * itemsPerPage
    const indexOfFirstMove = indexOfLastMove - itemsPerPage
    const currentMoves = movements.slice(indexOfFirstMove, indexOfLastMove)

    var filteredItems = []
    var searchFilteredItems = []
    var remarkFilteredItems = []
    var operationFilteredItems = []
    var dayFilteredItems = []
    var monthFilteredItems = []
    var yearFilteredItems = []
    var responsibleFilteredItems = []

    const lowerCaseSearch = search.toLowerCase()
    currentMoves.forEach(move => {
        if (move.description.toLowerCase().includes(lowerCaseSearch)) {
            searchFilteredItems.push(move)
        }
    })

    if(!remark) {
        remarkFilteredItems = searchFilteredItems
    } else {
        searchFilteredItems.forEach(move => {
            if(move.remark.includes(remark)) {
                remarkFilteredItems.push(move)
            }
        })
    }

    if (!operation) {
        operationFilteredItems = remarkFilteredItems
    } else {
        remarkFilteredItems.forEach(move => {
            if (move.operation.includes(operation)) {
                operationFilteredItems.push(move)
            }
        })
    }

    if (!day) {
        dayFilteredItems = operationFilteredItems
    } else {
        operationFilteredItems.forEach(move => {
            if (move.date.slice(8, 10).includes(day)) {
                dayFilteredItems.push(move)
            }
        })
    }

    if (!month) {
        monthFilteredItems = dayFilteredItems
    } else {
        dayFilteredItems.forEach(move => {
            if (move.date.slice(5, 7).includes(month)) {
                monthFilteredItems.push(move)
            }
        })
    }

    if (!year) {
        yearFilteredItems = monthFilteredItems
    } else {
        monthFilteredItems.forEach(move => {
            if (move.date.slice(0, 4).includes(year)) {
                yearFilteredItems.push(move)
            }
        })
    }

    if(!responsible) {
        responsibleFilteredItems = yearFilteredItems
    } else {
        yearFilteredItems.forEach(move => {
            if(move.user_name.includes(responsible)) {
                responsibleFilteredItems.push(move)
            }
        })
    }

    filteredItems = responsibleFilteredItems

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        localStorage.setItem('active', `${pageNumber}`)
    }

    function clearFilter() {
        setOperation('');
        setRemark('');
        setSearch('');
        setDay('');
        setMonth('');
        setYear('');
    }

    return (
        <article className={styles.MainContainer}>
            <h2>Histórico de Movimentações</h2>
            <div className={styles.AccordionContainer}>
                <Accordion defaultActiveKey="0" alwaysOpen={false}>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Filtros</Accordion.Header>
                        <Accordion.Body>
                            <form>
                                <fieldset className={styles.FieldsetContainer}>
                                    <div className={styles.DescriptionContainer}>
                                        <FloatingLabel
                                            label="Operação"
                                            value={operation}
                                            onChange={event => setOperation(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value="">-- Escolha a operação --</option>
                                                <option value="Recebimento">Recebimento</option>
                                                <option value="Atualização">Atualização</option>
                                                <option value="Devolução">Devolução</option>
                                                <option value="Exclusão">Exclusão</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Responsável"
                                            value={responsible}
                                            onChange={event => setResponsible(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value="">-- Escolha o responsável --</option>
                                                {users?.map(user => (
                                                    <option key={user._id}>{`${user.rank} ${user.qra}`}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Buscar na descrição por..."
                                            value={search}
                                            onChange={event => setSearch(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Control type="text" placehoder="Buscar na descrição por..." />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Buscar nas observações por..."
                                            value={remark}
                                            onChange={event => setRemark(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Control type="text" placehoder="Buscar nas obeservações por..." />
                                        </FloatingLabel>
                                    </div>
                                    <div className={styles.DateContainer}>
                                        <FloatingLabel
                                            label="Dia"
                                            value={day}
                                            onChange={event => setDay(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value='' >-- Selecione o dia --</option>
                                                {dayOptions.map(d => (
                                                    <option key={d} value={d} >{d}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Mês"
                                            value={month}
                                            onChange={event => setMonth(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                {monthOptions.map(m => (
                                                    <option key={m.value} value={m.value} >{m.name}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Ano"
                                            value={year}
                                            onChange={event => setYear(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Control type="number" length={4} placeholder="Informe o ano" min={2022} />
                                        </FloatingLabel>
                                    </div>
                                    <Button
                                        id="cancel"
                                        className="btn btn-secondary"
                                        type="reset"
                                        onClick={() => {
                                            clearFilter()
                                        }}
                                    >
                                        Limpar Filtros
                                    </Button>
                                </fieldset>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <Pagination setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} totalItems={movements.length} paginate={paginate} />
            <Button
                className="btn btn-danger"
                onClick={() => setShow(true)}
                id="confirm"
            >
                Apagar Histórico
            </Button>
            <Loading loading={loading} />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Operação</th>
                        <th>Responsável</th>
                        <th>Descrição</th>
                        <th>Observações</th>
                        <th>Data do Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems?.map(movement => (
                        <tr key={movement._id}>
                            <td>{movement.operation}</td>
                            <td>{movement.user_name}</td>
                            <td>{movement.description}</td>
                            <td>{movement.remark}</td>
                            <td>{movement.date.slice(8, 10) + '/' + movement.date.slice(5, 7) + '/' + movement.date.slice(0, 4)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeleteHistoryModal show={show} onClose={() => setShow(false)} />
        </article>
    )
}