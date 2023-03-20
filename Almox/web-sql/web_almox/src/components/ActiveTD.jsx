import { useState } from 'react'
import { Button } from "react-bootstrap";

export default function ActiveTD({id, status, handle, handleDelete}) {
    const [isHovering, setIsHovering] = useState(false)    
    
    return (
        <td onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} >
            <input type="checkbox" checked={status} onChange={() => handle(id,!status)} />
            {isHovering && (
                <Button variant="danger" onClick={() => handleDelete(id)}>Excluir usuário</Button>
            )}
        </td>
    )
}