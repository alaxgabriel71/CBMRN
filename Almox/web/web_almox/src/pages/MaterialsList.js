import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import Material from '../components/Material'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'

export default function MaterialsList() {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [materialsPerPage, setMaterialsPerPage] = useState(5)
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
        <div>
            <h2>Lista de Materiais</h2>
            <Link to="/new-materials">Adicionar materiais</Link >
            <Link to="/return-materials">Devolver materiais</Link >
            <Loading loading={loading} />
            <div>
                <label>
                    Itens por página:
                    <select value={materialsPerPage} onChange={e => setMaterialsPerPage(e.target.value)}>
                        <option value="">-- Itens por página --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
                <Pagination itemsPerPage={materialsPerPage} totalItems={materials.length} paginate={paginate} />
            </div>
            <label>
                Busca
                <input placeholder="Buscar nessa página..." type="text" value={search} onChange={e => setSearch(e.target.value)} />
            </label>
            {items?.map((material, i) =>
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