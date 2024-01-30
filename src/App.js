import React, { useEffect } from "react";
import {App, Tabs, Link, NavRight, Tab, Navbar, Toolbar, Page, f7, View} from 'framework7-react'
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Book from "./Pages/Book";
import './App.css'

export default () => {
  useEffect(()=>{
    f7.setColorTheme("#ff3b8d")
  })
  const f7p = {
    name: 'Versoku',
    routes: [{
      path:'/',
      component: Home,
    },{
      path:'/settings',
      component: Settings
    },{
      path:'/Book/:id',
      component: Book
    }
    ]
  }
  return(
    <App theme='ios' darkMode {...f7p}>
      <View>
      </View>
    </App>
  )
}
