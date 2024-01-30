import { useEffect } from "react"

export default () => {
    useEffect(()=>{
        setTimeout(() => {
            document.querySelector(".Loader").style.display = "none"
        }, 1000);
    }, [])
    return(
        <div className="Loader">
            <h2>VERSOKU</h2>
        </div>
    )
}