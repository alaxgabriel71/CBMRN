export default function Loading({ loading }) {

    return (
        <div>
            {loading && (
                (<h4>Carregando...</h4>)
            )}
        </div>
    )
}