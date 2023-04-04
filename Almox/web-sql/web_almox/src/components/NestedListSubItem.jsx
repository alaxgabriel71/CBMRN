import { useState } from 'react'

export default function SubItem({name, childs, id, showItem}){
    const [show, setShow] = useState(false)

    return (
        <li key={id+'-subitem'} >            
            {!show && (
                <p onMouseOver={() => setShow(true)} >{name}</p>
            )}
            {show && (
                <div onMouseOut={() => setShow(false)}>
                    <input  type="text" defaultValue={name} />
                    <button>Add Item</button>
                    <button>Add SubItem</button>
                    <button>Remove SubItem</button>
                </div>
            )}
            <ul key={id+'ul'}>
                {childs.map(showItem)}
            </ul>
        </li>
    )
}