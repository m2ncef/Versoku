import { Tab, Searchbar, List, ListItem } from "framework7-react";
import { useState, useEffect } from "react";

export default ()=>{
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://gutendex.com/books?search=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
          const book = []
          for(const i in data.results){
              book.push({
                  id: data.results[i].id,
                  title: data.results[i].title,
                  img: data.results[i].formats['image/jpeg'],
              })
          }
          setSearch(book)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    fetchData();
    }, [searchQuery]);
    useEffect(() => {
      console.log(searchResults);
    }, [searchResults]);
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
    return(
        <Tab id={'Search'}>
            <div className="searchBar">
                <input type="text" placeholder="Keywords..."></input>
                <button onClick={()=>{setSearchQuery(document.querySelector(".searchBar input").value)}}>Search</button>
            </div>
            <div className="bookContainer">
                {search.map(book=>{
                    return <BookCard title={book.title} img={book.img} id={book.id}/>
                })}
            </div>
        </Tab>
    )
}