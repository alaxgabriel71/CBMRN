export default function Material({id, name, quantity}){
    return(
        <li key={id}>
            <h3>{quantity}x {name}</h3>
        </li>
    )
}