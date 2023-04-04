import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import CreateVehicle from './CreateVehicle'
import EditVehicle from './EditVehicle'
import ExistingVehicles from './ExistingVehicles'
import CreateVehicleMaterialsList from './CreateVehicleMaterialsList'

export default function VehiclesTabs() {
    const [key3, setKey3] = useState(localStorage.getItem('key3') || 'existing-vehicles')
 
    return(
        <article>
            <Tabs
                activeKey={key3}
                onSelect={k => {
                    setKey3(k)
                    localStorage.setItem('key3', `${k}`)
                }}
                className="mb-3"
                fill
            >
                <Tab eventKey="existing-vehicles" title="Viaturas Existentes">
                    <ExistingVehicles />
                </Tab>
                <Tab eventKey="create-vehicle" title="Criar Viatura">
                    <CreateVehicle />
                </Tab>
                <Tab eventKey="edit-vehicle" title="Editar Viatura">
                    <EditVehicle />
                </Tab>
                <Tab eventKey="create-vehicle-materials-list" title="Criar Lista de Materiais">
                    <CreateVehicleMaterialsList />
                </Tab>
            </Tabs>
        </article>
    )
}