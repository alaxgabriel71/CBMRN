import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import CreateGarrison from './CreateGarrison'
//import DayGarrisons from './DayGarrisons'
import EditGarrisons from './EditGarrisons'
import ExistingGarrisons from './ExistingGarrisons'

export default function GarrisonsTabs() {
    const [key2, setKey2] = useState(localStorage.getItem('key2') || 'existing-garrisons')
    
    return(
        <article>
            <Tabs
                activeKey={key2}
                onSelect={k => {
                    setKey2(k)
                    localStorage.setItem('key2', `${k}`)
                }}
                className="mb-3"
                fill
            >
                <Tab eventKey="existing-garrisons" title="Guarnições Existentes">
                    <ExistingGarrisons />
                </Tab>
                <Tab eventKey="create-garrison" title="Criar Guarnição">
                    <CreateGarrison />
                </Tab>
                <Tab eventKey="edit-garrison" title="Editar Guarnição">
                    <EditGarrisons />
                </Tab>
                {/* <Tab eventKey="day-garrisons" title="Guarnições do dia">
                    <DayGarrisons />
                </Tab> */}
            </Tabs>
        </article>
    )
}