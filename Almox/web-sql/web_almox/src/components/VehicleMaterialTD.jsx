import { useState } from "react"

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
                        {remove && <button onClick={() => removeItem(id)}>Remover</button>}
                        {edit && <button onClick={() => editingItem(id, name, quantity, remark)}>Editar</button>}
                        {transfer && <button onClick={() => handleTransfer(id, name, quantity, remark)}>Transferir</button>}
                    </div>
                )}
            </td>
        </tr>
    )
}