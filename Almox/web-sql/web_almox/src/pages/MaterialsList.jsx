import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../components/contexts/UserContext'
// import { Link } from 'react-router-dom'

// import { Tab, Tabs } from 'react-bootstrap'
import styles from './MaterialsList.module.css'

import api from '../services/api'
import Material from '../components/Material'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { FloatingLabel, Form } from 'react-bootstrap'


export default function MaterialsList() {    
    console.log(`materials list current page: ${localStorage.getItem('active')}`)
    // const miliseconds = new Date()
    // console.log(miliseconds.getTime())
    
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('active') || 1)
    const [itemsPerPage, setItemsPerPage] = useState(localStorage.getItem('itemsPerPage') || 100)
    const [search, setSearch] = useState('')
    // const [items, setItems] = useState([])
    
    const items = []

    const { user } = useContext(UserContext)
    
    api.defaults.headers.Authorization = `Bearer ${user.token}`
    
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
    }, [user.token])

    console.log(materials)

    const indexOfLastMaterial = currentPage * itemsPerPage
    const indexOfFirstMaterial = indexOfLastMaterial - itemsPerPage
    const currentMaterials = materials.slice(indexOfFirstMaterial, indexOfLastMaterial)

    const lowerCaseSearch = search.toLowerCase()
    currentMaterials?.forEach(material => {
        if (material.name.toLowerCase().includes(lowerCaseSearch)) {
            items.push(material)
        }
    })


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)        
        localStorage.setItem('active', `${pageNumber}`)
    }

    return (
        <article>
            <div className={styles.subheader_container}>
                <h2 className={styles.subheaderTitle}>Lista de Materiais</h2>
                <div className={styles.floatingLabel}>
                    <FloatingLabel
                        label="Buscar nessa página..."
                        className="mb-3"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    >
                        <Form.Control type="text" placeholder="Buscar" />
                    </FloatingLabel>
                </div>
            </div>
            <Pagination
                setItemsPerPage={setItemsPerPage}
                itemsPerPage={itemsPerPage}
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
                            remark={material.remark}
                        />
                    </li>
                ))}
            </ul>
        </article>
    )
}