import { Link, f7, Navbar, Page, PageContent, Sheet } from "framework7-react";
import { useEffect, useState, useRef } from "react";
import Loader from "../Components/Loader";
import copy from 'copy-text-to-clipboard'

export default () => {
    const [title, setTitle] = useState("")
    const [OL, setOL] = useState("")
    const [readLink, setreadLink] = useState("")
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const libraryToast = useRef(null);
    const copyToast = useRef(null);

    function toggleTextArea(){
        var targetEle = document.querySelector('.BookDesc p');
        if(targetEle.style.height === ''){
            targetEle.style.display = "block"
        }
    }
    const closeSheet = () => {
        setIsSheetOpen(false)
    }
    const handleCopy = () =>{
        copy(window.location.href)
        if (!copyToast.current) {
            copyToast.current = f7.toast.create({
              text: "Link Copied ✅",
              position: 'center',
              closeTimeout: 2000,
            });
          }
          copyToast.current.open();
    }
    function SaveToLibrary(x){
        var a = [];
        a = JSON.parse(sessionStorage.getItem('Library')) || [];
        a.push(x);
        sessionStorage.setItem('Library', JSON.stringify(a));
        if (!libraryToast.current) {
            libraryToast.current = f7.toast.create({
              text: "Added To Library ✅",
              position: 'center',
              closeTimeout: 3000,
            });
          }
          libraryToast.current.open();
    }
    useEffect(()=>{
        async function fetchData(id) {
            try {
                const response1 = await fetch(`https://gutendex.com/books/?ids=${id}`);
                const data1 = await response1.json();
                document.title = document.title + ' - ' + data1.results[0].title;
                setTitle(data1.results[0].title);
                const bookTitle = data1.results[0].title;
                document.querySelector(".BookInfo img").src = data1.results[0].formats['image/jpeg'];
                document.querySelector(".BookInfo div h2").innerHTML = data1.results[0].title;
                sessionStorage.setItem("ReadingNow", data1.results[0].id);
                document.querySelector(".BookDesc p").innerHTML = 'Fetching Data...';
                for (const i in data1.results[0].bookshelves) {
                    document.querySelector(".BookDesc div").innerHTML += `<span>${data1.results[0].bookshelves[i]}</span>`;
                }
                document.querySelector(".BookInfo div h4").innerHTML = data1.results[0].authors[0].name;
                setreadLink(data1.results[0].formats['text/html']);
                const response2 = await fetch(`https://openlibrary.org/search.json?q=${bookTitle}&limit=1`);
                const data2 = await response2.json();
                const OL = data2.docs[0].key;
                setOL(OL);
                const response3 = await fetch(`https://openlibrary.org${OL}.json`);
                const data3 = await response3.json();
                document.querySelector(".BookDesc p").innerHTML = data3.description;
            } catch (error) {
                console.log(error);
            }
        }
        fetchData(window.location.pathname.replace(/\D/g,''));        
    }, [])
    return(
        <>
        <Loader/>
        <Page>
                <Navbar large={false} title={title} backLink backLinkUrl="/" onClickBack={()=>{
                    window.history.replaceState(null, document.title, "/")
                }}></Navbar>
                <div className="BookContainer">
                    <div className="BookInfo">
                        <img src/>
                        <div>
                            <h2></h2>
                            <h4></h4>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'stretch'}}>
                                <Link iconIos="f7:bookmark_fill" onClick={()=>{SaveToLibrary(sessionStorage.getItem("ReadingNow"))}}></Link>
                                <Link iconIos="f7:square_arrow_up" onClick={handleCopy}>&nbsp;Share</Link>
                            </div>
                        </div>
                    </div>
                    <div className="BookDesc">
                        <p onClick={toggleTextArea}></p>
                        <div></div>
                    </div>
                    <div className="BookRead">
                        <Link onClick={()=>{
                            window.open(readLink, '_blank')
                        }}>Start Reading</Link>
                    </div>
                </div>
                <Sheet push backdrop style={{height:'100vw',textAlign:'center'}} opened={isSheetOpen} onSheetClose={closeSheet}>
                    <PageContent>
                        <iframe src id="iframeID"></iframe>
                    </PageContent>
                </Sheet>
            </Page>
        </>
    )
}