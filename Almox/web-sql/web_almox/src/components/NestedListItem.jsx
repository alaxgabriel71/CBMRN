import { useEffect, useState } from 'react'

export default function Item({name, id, addItem}) {
    const [show, setShow] = useState(false)
    const [name1, setName1] = useState(name)

    useEffect(()=>{

    }, [name1])
    
    return (
        <li key={id+'-item'} onMouseOut={() => setShow(false)}>             
            {(!show && name1) && (
                <p onMouseOver={() => setShow(true)}>{name1}</p>
            )}
            {(show || !name1) && (
                <div key={id+'-div'}>
                    <input type="text" defaultValue={name1} onChange={e => setName1(e.target.value)}/>
                    <button onClick={() => addItem(id)}>Add Item</button>
                    <button>Add SubItem</button>
                    <button>Remove Item</button>
                </div>
            )}
        </li>
    )
}