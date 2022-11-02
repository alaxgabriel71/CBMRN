import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import Material from '../components/Material'
import Loading from '../components/Loading'

export default function MaterialsList() {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get("/materials")
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch((err) => {
                console.log("error: " + err)
            });
        setLoading(false)
    }, [])
    console.log(materials)

    return (
        <div>
            <h2>Lista de Materiais</h2>
            <Link to="/new-materials">Adicionar materiais</Link >
            <Link to="/return-materials">Devolver materiais</Link >
            <Loading loading={loading} />
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