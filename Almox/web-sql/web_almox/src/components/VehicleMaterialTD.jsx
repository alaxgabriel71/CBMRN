import { useState } from "react"
import { Button } from "react-bootstrap"

export default function VehicleMaterialTD({id, name, quantity, remark, remove, removeItem, edit, editingItem, transfer, handleTransfer}) {    
    const [visible, setVisible] = useState(false)
    
    
    return (
        <tr onMouseOver={() => setVisible(true)} onMouseOut={() => setVisible(false)}>
            <td>{`${id+1}.`}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{remark}</td>
            <td>
                {visible && (
                    <div>
                        {remove && <Button variant="danger" size="sm" onClick={() => removeItem(id)}>Remover</Button>}
                        {edit && <Button variant="danger" size="sm" onClick={() => editingItem(id, name, quantity, remark)}>Editar</Button>}
                        {transfer && <Button variant="danger" size="sm" onClick={() => handleTransfer(id, name, quantity, remark)}>Transferir</Button>}
                    </div>
                )}
            </td>
        </tr>
    )
}