import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// import { Tab, Tabs } from 'react-bootstrap'
import styles from './MaterialsList.module.css'

import api from '../services/api'
import Material from '../components/Material'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { FloatingLabel, Form } from 'react-bootstrap'



export default function MaterialsList() {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [materialsPerPage, setMaterialsPerPage] = useState(100)
    const [search, setSearch] = useState('')
    // const [items, setItems] = useState([])

    const items = []

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
    // console.log(materials)

    const indexOfLastMaterial = currentPage * materialsPerPage
    const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage
    const currentMaterials = materials.slice(indexOfFirstMaterial, indexOfLastMaterial)

    const lowerCaseSearch = search.toLowerCase()
    currentMaterials?.forEach(material => {
        if (material.name.toLowerCase().includes(lowerCaseSearch)) {
            items.push(material)
        }
    })


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <article>
            <div className={styles.subheader_container}>
                <h2>Lista de Materiais</h2>
                <FloatingLabel
                    label="Buscar nessa página..."
                    className="mb-3"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                >
                    <Form.Control type="text" placeholder="Buscar" />
                </FloatingLabel>
            </div>
            <Pagination
                setMaterialsPerPage={setMaterialsPerPage}
                itemsPerPage={materialsPerPage}
                totalItems={materials.length}
                paginate={paginate}
            />
            <Loading loading={loading} />
            <ul className={styles.Materials_list}>
                {items?.map((material, i) => (
                    <li key={material._id}>
                        <Material
                            key={material._id}
                            id={material._id}
                            name={material.name}
                            quantity={material.quantity}
                        />
                    </li>
                ))}
            </ul>
        </article>
    )
}