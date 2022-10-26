import { useEffect, useState } from 'react'

import api from '../services/api'
import Material from '../components/Material'

export default function MaterialsList() {
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        api.get("/materials")
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch((err) => {
                console.log("deu erro: " + err)
            });
    }, [])
    console.log(materials)


    return (
        <div>
            <h2>Lista de Materiais</h2>
            {materials?.map((material) => 
                <Material 
                id={material.id} 
                name={material.name} 
                quantity={material.quantity} 
                />
            )}
        </div>
    )
}