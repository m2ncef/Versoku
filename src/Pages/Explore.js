import { Link, f7, Tab } from "framework7-react";
import React,{ useEffect, useRef, useState } from "react";

export default ()=>{
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(2)
    const [sort, setSort] = useState('popular')
    const ref = useRef()
    useEffect(()=>{
        document.title = "Versoku"
        fetch(`https://gutendex.com/books/?sort=${sort}&next&page=${page}`)
        .then(res=>res.json())
        .then(data=>{
            const book = []
            for(const i in data.results){
                book.push({
                    id: data.results[i].id,
                    title: data.results[i].title,
                    img: data.results[i].formats['image/jpeg'],
                })
            }
            setBooks(book)
        })
    }, [page, sort])
    const BookCard = (props) => {
        return(
        <div className="BookCard" onClick={()=>{
            window.location.href = '/Book/' + props.id
        }}>
            <img src={props.img}></img>
            <h1>{props.title}</h1>
        </div>
        )
    }
    const handleSort = (e) => {
        setSort(e.target.value)
        console.log(e.target.value)
    }
    return(
        <Tab tabActive id={'Explore'}>
            <div className='TypeSelector' ref={ref}>
                <h2>List</h2>
                <select placeholder="Please choose" onChange={handleSort}>
                    <option value={'popular'}>Popular</option>
                    <option value={'ascending'}>Ascending</option>
                    <option value={'descending'}>Descending</option>
                </select>
            </div>
            <div className="bookContainer">
                {books.map(book=>{
                    return <BookCard title={book.title} img={book.img} id={book.id}/>
                })}
            <Link href='#' onClick={()=>{
                setPage(page + 1)
                var element = document.querySelector(".BookCard")
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }} className="Btn" style={{margin:"2vh"}}>Load More</Link>
            </div>
            <br/>
        </Tab>
    )
}