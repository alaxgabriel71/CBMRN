import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import './MaterialsTabs.css'

import MaterialsList from './MaterialsList'
import NewMaterials from './NewMaterials'
import ReturnMaterials from './ReturnMaterials'

export default function MaterialsTabs() {
    const [key, setKey] = useState(localStorage.getItem('key') || 'materials-list')

    return (
        <article>
            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k)
                    localStorage.setItem('key', `${k}`)
                }}
                className="mb-3"
                fill
            >
                <Tab eventKey="materials-list" title="Lista de Materiais">
                    <MaterialsList />
                </Tab>
                <Tab eventKey="new-material" title="Adicionar Materiais">
                    <NewMaterials />
                </Tab>
                <Tab eventKey="returns-material" title="Devolução de Material">
                    <ReturnMaterials />
                </Tab>
            </Tabs>
        </article>
    )
}