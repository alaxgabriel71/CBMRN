import { useState, useEffect } from 'react'

import api from '../services/api'
import StatusMessage from './StatusMessage'

export default function NewMaterialsForm() {
    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [message, setMessage] = useState(false);
    const [status, setStatus] = useState();
    
    var dateObject = new Date()
    const today = dateObject.getDate()+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()
    const date = dateObject.getFullYear()+'-'+(dateObject.getMonth()+1)+'-'+dateObject.getDate()

    function cancelSubmit(event) {
        event.preventDefault();
        setNewName('')
        setNewQuantity('')
    }

    useEffect(() => {

        api.get('/materials')
        .then(({data}) => {
            setMaterials(data.materials)
        })
        .catch(err => console.error(err))
        
    }, [])


    function insertNewMaterial(event){
        event.preventDefault();
        var materialExists = false;
        var currentName = ''
        var currentQuantity = 0;
        var currentMaterialID = '';
        var description = '';
   

        materials.forEach(material => {
            if(material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentName = material.name
                currentQuantity = material.quantity
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })

        
        if(materialExists){
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            const newMaterial = {
                name: currentName,
                quantity: totalQuantity
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: "+response.status)
                    description = `A quantidade do material: ${newName} passou de ${currentQuantity} para ${newQuantity} em ${today}`
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
                console.log("STATUS: "+response.status)

                description = `${newQuantity}x ${newName} foi(foram) adicionados ao almoxarifado em ${today}`
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
                console.log("error: "+err)
                setStatus('Falha')
                setMessage(true)
            })
        }
        setMessage(false)
    }

    return (
        <>
            <StatusMessage message={message} status={status}/>
            <form id="new-material-form" method="get" onSubmit={insertNewMaterial}>
                <fieldset>
                    <legend>Novo material</legend>
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
                    <button onClick={cancelSubmit}>Cancelar</button>
                    <button
                        type="submmit"
                        form="new-material-form"
                        disabled={!newName || !newQuantity}
                    >
                        Adicionar Material
                    </button>
                </fieldset>
            </form>
        </>
    )
}