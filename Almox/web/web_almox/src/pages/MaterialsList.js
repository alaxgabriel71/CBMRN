import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
            <Link to="/new-materials">Adicionar materiais</Link >
            {materials?.map((material, i) => 
                <Material 
                key={material._id}
                id={material._id}
                name={material.name} 
                quantity={material.quantity}
                />
            )}
        </div>
    )
}