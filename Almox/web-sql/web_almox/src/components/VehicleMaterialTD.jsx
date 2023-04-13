export default function VehicleMaterialTD({id, name, quantity, remark, removeItem}) {    
    return (
        <tr onClick={() => removeItem(id)}>
            <td>{quantity}</td>
            <td>{name}</td>
            <td>{remark}</td>
        </tr>
    )
}