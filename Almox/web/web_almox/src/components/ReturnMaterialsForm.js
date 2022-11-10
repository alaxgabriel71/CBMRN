import { useState, useEffect } from 'react'

import api from '../services/api'
import StatusMessage from '../components/StatusMessage'

import styles from './ReturnMaterialsForm.module.css'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

export default function ReturnMaterialsForm() {
    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    const today = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [newRemark, setNewRemark] = useState('')
    const [options, setOptions] = useState([])
    const [military, setMilitary] = useState()
    const [date, setDate] = useState(today)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [variant, setVariant] = useState('')
    const [visible, setVisible] = useState(false)

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
        const mili = dateObject.getTime()
        var materialExists = false;
        var currentName = '';
        var currentQuantity = 0;
        var currentMaterialID = '';
        var currentRemark = '';
        var description = '';
        const returnDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)


        materials.forEach(material => {
            if (material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentName = material.name
                currentQuantity = material.quantity
                currentRemark = material.remark
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })


        if (materialExists) {
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            var finalRemark = ''
            if(!newRemark) finalRemark = currentRemark
            else finalRemark = currentRemark + ' *' + newRemark
            const newMaterial = {
                name: currentName,
                quantity: totalQuantity,
                remark: finalRemark
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: " + response.status)
                    description = `${newQuantity}x ${currentName} foi(foram) devolvido(s) ao almoxarifado pelo ${military} em ${returnDate}`
                    api.post('/movements', {
                        operation: "Devolução",
                        date,
                        mili,
                        description,
                        remark: finalRemark
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('A devolução foi registrada.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                            console.error(err)
                        })
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
        }
        else {
            const newMaterial = {
                name: newName[0].toUpperCase() + newName.substring(1).toLowerCase(),
                quantity: newQuantity,
                remark: newRemark
            }
            api.post('/materials', newMaterial)
                .then(response => {
                    console.log("STATUS: " + response.status)

                    description = `${newQuantity}x ${newName[0].toUpperCase() + newName.substring(1).toLowerCase()} foi(foram) devolvido(s) ao almoxarifado pelo ${military} em ${returnDate}`
                    api.post('/movements', {
                        operation: "Devolução",
                        date,
                        mili,
                        description,
                        remark: newRemark
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('A devolução foi registrada.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                            console.error(err)
                        })
                })
                .catch(err => {
                    console.log("error: " + err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
        }
        setVisible(false)
    }

    return (
        <div className={styles.FormContainer}>
            <form id="new-material-form" method="get" onSubmit={insertNewMaterial}>
                <fieldset>
                    <StatusMessage show={visible} variant={variant} message={message} status={status} />
                    <h5 className={styles.FieldsetTitle}>Material a ser devolvido</h5>
                    <FloatingLabel
                        label="Nome do Material"
                        className="mb-3"
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                    >
                        <Form.Control type="text" placeholder="Informe o nome do material" />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Quantidade do Material"
                        className="mb-3"
                        value={newQuantity}
                        onChange={event => setNewQuantity(event.target.value)}
                    >
                        <Form.Control type="number" min="1" placeholder="Informe a quantidade do material" />
                    </FloatingLabel>
                    <FloatingLabel className={styles.FloatingLabel} controlId="floatingSelect" label="Devolvido por:">
                        <Form.Select
                            aria-label="Floating label select example"
                            className="mb-3"
                            name="military"
                            value={military}
                            onChange={event => setMilitary(event.target.value)}
                            required
                        >
                            <option value="" key="0">-- Selecione um militar --</option>
                            {options?.map(option =>
                                <option key={option._id} value={option.name}>{option.name}</option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel label="Em:" >
                        <Form.Control
                            type="date"
                            className="mb-3"
                            defaultValue={date}
                            max={today}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Observações"
                        value={newRemark}
                        onChange={e => setNewRemark(e.target.value)}
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text-area" 
                            placeholder="Se houverem observações, escreva aqui."
                        />
                    </FloatingLabel>
                    <div className="form-btn-area">
                        <Button
                            id="cancel"
                            className="form-btn"
                            variant="secondary"
                            type="reset"
                            onClick={() => {
                                cancelSubmit()
                            }}
                        >
                            Limpar
                        </Button>
                        <Button
                            id="confirm"
                            className="form-btn"
                            variant="danger"
                            type="submmit"
                            disabled={!newName || !newQuantity || !military}
                        >
                            Confirmar Retorno de Material
                        </Button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}