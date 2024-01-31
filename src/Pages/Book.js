import { Link, f7, Navbar, Page, PageContent, Sheet } from "framework7-react";
import { useEffect, useState, useRef } from "react";
import Loader from "../Components/Loader";
import copy from 'copy-text-to-clipboard'

export default () => {
    const [title, setTitle] = useState("")
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
        var id = window.location.pathname.replace(/\D/g,'')
        fetch(`https://gutendex.com/books/?ids=${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            document.title = document.title + ' - ' + data.results[0].title
            setTitle(data.results[0].title)
            document.querySelector(".BookInfo img").src = data.results[0].formats['image/jpeg']
            document.querySelector(".BookInfo div h2").innerHTML = data.results[0].title
            sessionStorage.setItem("ReadingNow", data.results[0].id)
            document.querySelector(".BookDesc p").innerHTML = 'Cant find a good books descriptions api for the moment lol 😛, ill do this asap just be patient yall aight??'
            for(const i in data.results[0].bookshelves){
                document.querySelector(".BookDesc div").innerHTML += `<span>${data.results[0].bookshelves[i]}</span>`
            }
            document.querySelector(".BookInfo div h4").innerHTML = data.results[0].authors[0].name
            document.querySelector("#iframeID").src = data.results[0].formats['text/html']
        })
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
                        <Link onClick={()=>{setIsSheetOpen(true)}}>Start Reading</Link>
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