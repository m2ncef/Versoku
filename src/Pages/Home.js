import { Navbar, NavRight,Link,Toolbar,Tabs, Page, View } from "framework7-react"
import Search from "./Search";
import Library from "./Library";
import Explore from "./Explore";
import Loader from "../Components/Loader";

export default ()=>{
    return(
    <>
      <Page>
          <Navbar large title="Versoku">
            <NavRight>
              <Link iconIos="f7:gear" href="/settings"></Link>
            </NavRight>
          </Navbar>
          <Toolbar tabbar position="bottom" icons>
              <Link text="Library" iconIos="f7:books" tabLink='#Library'></Link>
              <Link text="Explore" iconIos="f7:sparkles" tabLink='#Explore' tabLinkActive></Link>
              <Link text="Search" iconIos="f7:globe" tabLink='#Search'></Link>
          </Toolbar>
          <Tabs>
            <Library/>
            <Explore/>
            <Search/>
          </Tabs>
      </Page>
    </>
    )
}