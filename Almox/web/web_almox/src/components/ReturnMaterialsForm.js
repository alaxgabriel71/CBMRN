import { useState, useEffect } from 'react'

import api from '../services/api'
import StatusMessage from '../components/StatusMessage'

export default function ReturnMaterialsForm() {
    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    const today = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [options, setOptions] = useState([])
    const [military, setMilitary] = useState()
    const [date, setDate] = useState(today)
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState('')

    console.log(date)

    function cancelSubmit(event) {
        event.preventDefault();
        setNewName('')
        setNewQuantity('')
    }

    useEffect(() => {
        api.get('/materials')
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch(err => console.error(err))

        api.get('/military')
            .then(({ data }) => {
                setOptions(data.military)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])


    function insertNewMaterial(event) {
        event.preventDefault();
        var materialExists = false;
        var currentQuantity = 0;
        var currentMaterialID = '';
        var description = '';
        const returnDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)


        materials.forEach(material => {
            if (material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentQuantity = material.quantity
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })


        if (materialExists) {
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            const newMaterial = {
                name: newName,
                quantity: totalQuantity
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: " + response.status)
                    description = `${newQuantity}x ${newName} foi(foram) devolvido(s) ao almoxarifado pelo ${military} em ${returnDate}`
                    api.post('/movements', {
                        operation: "Devolução",
                        date,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => {
                            setStatus('Falha')
                            setMessage(true)
                            console.error(err)
                        })
                    setMessage(false)
                })
                .catch(err => console.error(err))
        }
        else {
            const newMaterial = {
                name: newName,
                quantity: newQuantity
            }
            api.post('/materials', newMaterial)
                .then(response => {
                    console.log("STATUS: " + response.status)

                    description = `${newQuantity}x ${newName} foi(foram) devolvido(s) ao almoxarifado pelo ${military} em ${today}`
                    api.post('/movements', {
                        operation: "Devolução",
                        date,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => {
                            setStatus('Falha')
                            setMessage(true)
                            console.error(err)
                        })
                    setMessage(false)
                })
                .catch(err => {
                    console.log("error: " + err)
                    setStatus('Falha')
                    setMessage(true)
                })
            setMessage(false)
        }
    }

    return (
        <div>
            <StatusMessage message={message} status={status} />
            <form id="new-material-form" method="get" onSubmit={insertNewMaterial}>
                <fieldset>
                    <legend>Material a ser devolvido</legend>
                    <label>
                        Nome do material -
                        <input
                            type="text"
                            value={newName}
                            onChange={event => setNewName(event.target.value)}
                        />
                    </label>
                    <label>
                        Quantidade -
                        <input
                            type="number"
                            min="1"
                            value={newQuantity}
                            onChange={event => setNewQuantity(event.target.value)}
                        />
                    </label>
                    <label>
                        Devolvido por:
                        <select name="military" value={military} onChange={event => setMilitary(event.target.value)} required>
                            <option value="" key="0">-- Selecione um militar --</option>
                            {options?.map(option =>
                                <option key={option._id} value={option.name}>{option.name}</option>
                            )}
                        </select>
                    </label>
                    <label>
                        Em:
                        <input type="date" defaultValue={date} max={today} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <button onClick={cancelSubmit}>Cancelar</button>
                    <button
                        type="submmit"
                        form="new-material-form"
                        disabled={!newName || !newQuantity || !military}
                    >
                        Confirmar Retorno de Material
                    </button>
                </fieldset>
            </form>
        </div>
    )
}