import { useState, useEffect } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

import styles from './NewMaterialsForm.module.css'

import api from '../services/api'
import StatusMessage from './StatusMessage'

export default function NewMaterialsForm() {
    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [message, setMessage] = useState(false);
    const [status, setStatus] = useState();

    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    // const today = formatedDate+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()
    const date = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    function cancelSubmit() {
        // event.preventDefault();
        setNewName('')
        setNewQuantity('')
    }

    useEffect(() => {

        api.get('/materials')
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch(err => console.error(err))

    }, [])


    function insertNewMaterial(event) {
        event.preventDefault();
        var materialExists = false;
        var currentName = ''
        var currentQuantity = 0;
        var currentMaterialID = '';
        var description = '';


        materials.forEach(material => {
            if (material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentName = material.name
                currentQuantity = material.quantity
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })


        if (materialExists) {
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            const newMaterial = {
                name: currentName,
                quantity: totalQuantity
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: " + response.status)
                    description = `A quantidade do material: ${currentName} passou de ${currentQuantity} para ${newQuantity}`
                    api.post('/movements', {
                        operation: "Atualização",
                        date,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => console.error(err))
                })
                .catch(err => console.error(err))
        }
        else {
            const newMaterial = {
                name: newName[0].toUpperCase() + newName.substring(1).toLowerCase(),
                quantity: newQuantity
            }
            api.post('/materials', newMaterial)
                .then(response => {
                    console.log("STATUS: " + response.status)

                    description = `${newQuantity}x ${newName[0].toUpperCase() + newName.substring(1).toLowerCase()} foi(foram) adicionados ao almoxarifado`
                    api.post('/movements', {
                        operation: "Recebimento",
                        date,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage(true)
                        })
                })
                .catch(err => {
                    console.log("error: " + err)
                    setStatus('Falha')
                    setMessage(true)
                })
        }
        setMessage(false)
    }

    return (
        <>
            <StatusMessage message={message} status={status} />
            <form id="new-material-form" method="get" onSubmit={(e) => {
                insertNewMaterial(e);
                cancelSubmit();
            }}>
                <fieldset>
                    <h5 className={styles.FieldsetTitle}>Cadastrar Novo Material</h5>
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
                    <Button
                        id="cancel" 
                        className="btn btn-secondary" 
                        type="reset"
                        onClick={() => {
                            cancelSubmit()
                        }}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="submmit"
                        disabled={!newName || !newQuantity}
                        className="btn btn-danger"
                        id="confirm"
                    >
                        Cadastrar Material
                    </Button>
                </fieldset>
            </form>
        </>
    )
}