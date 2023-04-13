import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import api from '../services/api'

export default function Vehicle() {
    const { id } = useParams()
    const [materials, setMaterials] = useState([])
    
    api.get(`/vehicle/${id}`)
        .then(({data}) => data.vehicle.list)
        .then(list => {
            api.get(`/vehicle-list/${list}`)
                .then(({data}) => setMaterials(data.list))
        })

    useEffect(() => {
        console.log(materials)
    }, [])
    return (
        <article>
            <h1>{id}</h1>
            {materials?.map(material => <p key={material.id}>{material.name}</p>)}
        </article>
    )
}