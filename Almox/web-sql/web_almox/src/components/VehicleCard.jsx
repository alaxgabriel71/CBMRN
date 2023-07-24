import { Link } from 'react-router-dom'

export default function VehicleCard({ id, name, active, model, plate, seats}) {
    
    return(
        <li>
            <Link to={`/vehicles/${id}`} className="vehicle-card" >
                <fieldset>
                    <h5>{name}</h5>
                    <small>Modelo: {model}</small>
                    <br />
                    <small>Placa: {plate}</small>
                    <br />
                    <small>Quant. de Assentos: {seats}</small>
                    <br />
                    {active ? (<strong>Ativada</strong>) : (<strong>Desativada</strong>)}
                </fieldset>
            </Link>
        </li>
    )
}