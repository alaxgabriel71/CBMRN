import { useState } from "react"

export default function VehicleMaterialTD({id, name, quantity, remark, removeItem, editingItem, transfer, handleTransfer}) {    
    const [visible, setVisible] = useState(false)
    
    
    return (
        <tr onMouseOver={() => setVisible(true)} onMouseOut={() => setVisible(false)}>
            <td>{quantity}</td>
            <td>{name}</td>
            <td>{remark}</td>
            <td>
                {visible && (
                    <div>
                        <button onClick={() => removeItem(id)}>Remover</button>
                        <button onClick={() => editingItem(id, name, quantity, remark)}>Editar</button>
                        {transfer && (
                            <>
                                <button onClick={() => handleTransfer(id, name, quantity, remark)}>Transferir</button>
                            </>
                        )}
                    </div>
                )}
            </td>
        </tr>
    )
}