import { Tab } from "framework7-react";
import { useEffect } from "react";

export default ()=>{
    useEffect(()=>{
        const libraryArray = JSON.parse(sessionStorage.getItem("Library"));
        if(libraryArray){
            Promise.all(libraryArray.map((bookId) =>
            fetch(`https://gutendex.com/books/?ids=${bookId}`)
                .then((response) => response.json())
                .then((data) => {
                const bookRow = `
                    <div class="Book">
                        <img src='${data.results[0].formats['image/jpeg']}'/>
                        <div>
                            <h3>${data.results[0].title}</h3>
                            <h6>${data.results[0].authors[0].name}</h6>
                        </div>
                        <a onclick="location.href = '/Book/${data.results[0].id}' ">Watch</a>
                    </div>
                `;
                document.querySelector(".LibraryContainer").innerHTML += bookRow;
                })
            ))
        }
    }, [])
    return(
        <Tab id={'Library'}>
            <div className="Library">
                <h1>Library</h1>
                <div className="LibraryContainer">
                </div>
            </div>
        </Tab>
    )
}