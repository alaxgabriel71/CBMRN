import styles from './Pagination.module.css'

export default function Pagination({ itemsPerPage, totalItems, paginate}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.Navbar_item}>
                {pageNumbers.map(number => (
                    <li key={number} className={styles.Item}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}