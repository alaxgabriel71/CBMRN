/* import { useState, useEffect } from "react"
import api from "../services/api"

export default function VehicleChecklistHistory() {
    const [checklists, setChecklists] = useState([])

    useEffect(() => {
        api.get("/vehicle-checklists")
            .then(({ data }) => setChecklists(data.vehicleChecklists))
    }, [])

    return (
        <article>
            <h1>Histórico de checklist das viaturas</h1>
            {checklists?.map(checklist => <p key={checklist._id}>{checklist.vehicle}</p>)}
        </article>
    )
} */

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

export default function CheckMaterialHistory() {
    // var dateObject = new Date()
    // const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    // const today = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])
    const [vehicleChecklists, setVehicleChecklists] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('active') || 1)
    const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem('itemsPerPage')) || 10)
    const [search, setSearch] = useState('')
    const [subject, setSubject] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [status, setStatus] = useState('')
    // const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [responsible, setResponsible] = useState('')

    const { user, vehicles } = useContext(UserContext)
    
    api.defaults.headers.Authorization = `Bearer ${user.token}`

    useEffect(() => {
        setLoading(true)
        api.get('/vehicle-checklists')
            .then(({ data }) => setVehicleChecklists(data.vehicleChecklists))
            .catch(err => console.error(err))

        api.get('/users-name')
            .then(({data}) => setUsers(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
            .catch(err => console.error(err))
        setLoading(false)
    }, []);
    // console.log(movements)div

    useEffect(() => console.log(status), [status])

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
    const currentChecklists = vehicleChecklists.slice(indexOfFirstMove, indexOfLastMove)

    var filteredItems = []
    var searchFilteredItems = []
    var subjectFilteredItems = []
    var vehicleFilteredItems = []
    var dayFilteredItems = []
    var monthFilteredItems = []
    var yearFilteredItems = []
    var responsibleFilteredItems = []

    const lowerCaseSearch = search.toLowerCase()
    currentChecklists.forEach(checklist => {
        if (checklist.remark.toLowerCase().includes(lowerCaseSearch)) {
            searchFilteredItems.push(checklist)
        }
    })

    if(!subject) {
        subjectFilteredItems = searchFilteredItems
    } else {
        searchFilteredItems.forEach(checklist => {
            if(checklist.status.toLowerCase().includes(subject.toLowerCase())) {
                subjectFilteredItems.push(checklist)
            }
        })
    }

    if (!vehicle) {
        vehicleFilteredItems = subjectFilteredItems
    } else {
        subjectFilteredItems.forEach(checklist => {
            if (checklist.vehicle === Number(vehicle)) {
                vehicleFilteredItems.push(checklist)
            }
        })
    }

    /* if (status === '') {
        statusFilteredItems = fromFilteredItems
    } else {
        fromFilteredItems.forEach(knowledge => {
            if (knowledge.status === status) {
                statusFilteredItems.push(knowledge)
            }
        })
    } */

    if (!day) {
        dayFilteredItems = vehicleFilteredItems
    } else {
        vehicleFilteredItems.forEach(checklist => {
            if (checklist.createdAt.slice(8, 10).includes(day)) {
                dayFilteredItems.push(checklist)
            }
        })
    }

    if (!month) {
        monthFilteredItems = dayFilteredItems
    } else {
        dayFilteredItems.forEach(checklist => {
            if (checklist.createdAt.slice(5, 7).includes(month)) {
                monthFilteredItems.push(checklist)
            }
        })
    }

    if (!year) {
        yearFilteredItems = monthFilteredItems
    } else {
        monthFilteredItems.forEach(knowledge => {
            if (knowledge.createdAt.slice(0, 4).includes(year)) {
                yearFilteredItems.push(knowledge)
            }
        })
    }

    if(!responsible) {
        responsibleFilteredItems = yearFilteredItems
    } else {
        yearFilteredItems.forEach(checklist => {
            if(checklist.driver === Number(responsible)) {
                responsibleFilteredItems.push(checklist)
            }
        })
    }

    filteredItems = responsibleFilteredItems

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        localStorage.setItem('active', `${pageNumber}`)
    }

    function clearFilter() {
        setVehicle('');
        setResponsible('');
        setSubject('');
        setSearch('');
        setStatus('');
        setDay('');
        setMonth('');
        setYear('');
    }

    const getDate = (d) => {
        const date = new Date(d)
        let formatedDate = d.split('T')
        formatedDate = formatedDate[1].split(':')
        let hour = String(Number(formatedDate[0]) - 3)
        hour = Number(hour) < 10 ? ("0"+hour) : hour
        formatedDate = hour+":"+formatedDate[1]
        formatedDate = date.toLocaleDateString('pt-br')+" - "+formatedDate
        return formatedDate
    }

    const getRankName = id => {
        let name = ''
        ranks.forEach(rank => {
            if(rank._id === id) name = rank.rank
        })
        return name
    }

    const getUserName = (id) => {
        let name = ''
        users.forEach(user => {
            if(user._id === id) {
                name = getRankName(user.rank) + " " + user.qra
            }
        })
        return name
    }

    const getVehicleName = id => {
        let name = ''
        vehicles.forEach(vehicle => {
            if(vehicle._id === id) name = vehicle.name
        })
        return name
    }

    return (
        <article className={styles.MainContainer}>
            <h2>Histórico de checklist das viaturas</h2>
            <div className={styles.AccordionContainer}>
                <Accordion defaultActiveKey="0" alwaysOpen={false}>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Filtros</Accordion.Header>
                        <Accordion.Body>
                            <form>
                                <fieldset className={styles.FieldsetContainer}>
                                    <div className={styles.DescriptionContainer}>
                                        <FloatingLabel
                                            label="Viatura"
                                            value={vehicle}
                                            onChange={event => setVehicle(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value="">-- --</option>
                                                {vehicles?.map(vehicle => (
                                                    <option key={vehicle._id} value={vehicle._id}>{vehicle.name}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Para"
                                            value={responsible}
                                            onChange={event => setResponsible(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value="">-- Escolher Militar --</option>
                                                {users?.map(user => (
                                                    <option key={user._id} value={user._id}>{`${getRankName(user.rank)} ${user.qra}`}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Buscar nas condições por..."
                                            value={subject}
                                            onChange={event => setSubject(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Control type="text" placehoder="Buscar nas condições por..." />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label="Buscar nas observações por..."
                                            value={search}
                                            onChange={event => setSearch(event.target.value)}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Control type="text" placehoder="Buscar nas observações por..." />
                                        </FloatingLabel>
                                        {/* <FloatingLabel
                                            label="Confirmação"
                                            value={status}
                                            onChange={event => {
                                                if(event.target.value === 'false') setStatus(false)
                                                else if(event.target.value === 'true')setStatus(true)
                                                else setStatus('')
                                            }}
                                            className={styles.FloatingLabel}
                                        >
                                            <Form.Select>
                                                <option value="">--  --</option>
                                                <option value={true}>Ciente</option>
                                                <option value={false}>Sem resposta</option>                                                
                                            </Form.Select>
                                        </FloatingLabel> */}
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
            <Pagination setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} totalItems={vehicleChecklists.length} paginate={paginate} />
            {/* <Button
                className="btn btn-danger"
                onClick={() => setShow(true)}
                id="confirm"
            >
                Apagar Histórico
            </Button> */}
            <Loading loading={loading} />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Viatura</th>
                        <th>Motorista</th>
                        <th>Condições</th>
                        <th>Observações</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems?.map(knowledge => (
                        <tr key={knowledge._id}>
                            <td>{getVehicleName(knowledge.vehicle)}</td>
                            <td>{getUserName(knowledge.driver)}</td>
                            <td>{knowledge.status}</td>
                            <td>{knowledge.remark}</td>
                            <td>{getDate(knowledge.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeleteHistoryModal show={show} onClose={() => setShow(false)} />
        </article>
    )
}