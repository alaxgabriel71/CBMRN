import styles from './Footer.module.css'

export default function Footer(){
    return(
        <div className={styles.Footer_container}>
            <p><strong>Developed by SD Alax </strong> <a href="https://github.com/alaxgabriel71" rel="author" target="_blank" >github@alaxgabriel71</a></p>
            <p>Copyrights &copy; 2022 CBMRN</p>
        </div>
    )
}