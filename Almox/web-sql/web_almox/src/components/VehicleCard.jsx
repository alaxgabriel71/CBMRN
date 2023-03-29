export default function VehicleCard({ name, active, model, plate, seats}) {
    return(
        <li>
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
        </li>
    )
}