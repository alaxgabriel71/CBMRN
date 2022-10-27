import { useState, useEffect } from 'react'

import api from '../services/api'

export default function NewMaterialsForm() {
    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();

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
        var currentQuantity = 0;
        var currentMaterialID = '';
   

        materials.forEach(material => {
            if(material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentQuantity = material.quantity
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })

        
        if(materialExists){
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            const newMaterial = {
                name: newName,
                quantity: totalQuantity
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: "+response.status)
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
                console.log("STATUS: "+response.status)
            })
            .catch(err => {
                console.log("error: "+err)
            })
        }
    }

    return (
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
    )
}