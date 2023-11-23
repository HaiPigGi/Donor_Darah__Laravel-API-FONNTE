export default function ErrorMessage({message,kelas}){
    return(
        <div className={kelas}> 
            <h1>{message}</h1>
        </div>
    )
}