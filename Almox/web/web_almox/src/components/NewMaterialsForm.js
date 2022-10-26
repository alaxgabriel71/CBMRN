export default function NewMaterialsForm(){
    return (
        <form id="new-material-form" method="get">
            <fieldset>
                <legend>Novo material</legend>
                <label>
                    Nome do material -
                    <input type="text"></input>
                </label>
                <label>
                    Quantidade -
                    <input type="number"></input>
                </label>
                <button>Cancelar</button>
                <button type="submmit" form="new-material-form">Adicionar Material</button>
            </fieldset>
        </form>
    )
}