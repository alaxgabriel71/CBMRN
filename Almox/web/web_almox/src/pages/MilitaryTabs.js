import { Tab, Tabs } from "react-bootstrap";
import { useState } from 'react'

import MilitaryList from './MilitaryList'
import NewMilitary from './NewMilitary'

export default function MilitaryTabs() {
    const [key, setKey] = useState(localStorage.getItem('key2') || 'military-list')

    return (
        <article>
            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k)
                    localStorage.setItem('key2', `${k}`)
                }}
                className="mb-3"
                fill
            >
                <Tab eventKey="military-list" title="Militares Cadastrados" >
                    <MilitaryList />
                </Tab>
                <Tab eventKey="new-military" title="Cadastrar Militares" >
                    <NewMilitary />
                </Tab>
            </Tabs>
        </article>
    )
}