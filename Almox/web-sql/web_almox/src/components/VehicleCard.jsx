export default function VehicleCard({ name, active, model, plate, seats}) {
    return(
        <li>
            <fieldset>
                <h5>{name}</h5>
                <smal>Modelo: {model}</smal>
                <br />
                <smal>Placa: {plate}</smal>
                <br />
                <smal>Quant. de Assentos: {seats}</smal>
                <br />
                {active ? (<strong>Ativada</strong>) : (<strong>Desativada</strong>)}
            </fieldset>
        </li>
    )
}