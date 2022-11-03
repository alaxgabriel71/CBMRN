export default function Movement({operation, description, date}){
    return(
        <div>
            <p>{operation} | {description} | {date}</p>
        </div>
    )
}