export default function Pagination({ itemsPerPage, totalItems, paginate}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(totalItems/itemsPerPage); i++){
        console.log(Math.ceil(totalItems/itemsPerPage))
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}