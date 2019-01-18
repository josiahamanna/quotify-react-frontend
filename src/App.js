import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import RandomLocal from './random-local'
import RandomAPI from './random-api'
import AddQuote from './add'
import ListingQuotes from './listing';

class App extends Component {

  constructor(){
    
    super()
    this.state = {
      quoteObj : {},
      localDB: localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp')) : [],
      saved: undefined,
      getAnother: this.getAnother
    }

    this.saveHandle = this.saveHandle.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getAnother = this.getAnother.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  updateLocalStorage(){
    localStorage.setItem('temp', JSON.stringify(this.state.localDB))
  }

  handleDelete(key){
    this.setState(prevState=>({
      localDB: prevState.localDB.filter((quote, index)=>index!=key)
    }), this.updateLocalStorage)
  }

  handleSubmit(data){
    this.state.localDB.push(data)
    localStorage.setItem('temp', JSON.stringify(this.state.localDB))
  }

  saveHandle(){

    let check = this.state.localDB.find(quote=>{
      return quote.quote == this.state.quoteObj.quote
    })
    if(!check){
      this.state.localDB.push(this.state.quoteObj)
    }  
      
    this.setState({
      saved:true
    })
    localStorage.setItem('temp', JSON.stringify(this.state.localDB))
  }

  componentDidMount(){
    axios.get('https://quotes.stormconsultancy.co.uk/random.json').then(response=>{
      // console.log(response.data)
      this.setState(prevState =>({
        quoteObj: response.data,
        saved: prevState.localDB.find(item => item.quote == response.data.quote)
      }))
    })
  }

  getAnother(){
    this.componentDidMount()
  }


  render() {
    console.log(this.state.localDB)
    // console.log(this.state.quoteObj)
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Quotify </h1>
          <p><Link to="/"> Random Quote (API) </Link> | 
          <Link to="/random-local"> Random Quote (local) </Link> | 
          <Link to = "/add"> Add Quote </Link> | 
          <Link to = "/listing"> List All Quotes (local) </Link></p>
          
          <Switch>
            <Route path = "/" render = {()=> <RandomAPI getAnother={this.getAnother} quoteObj={this.state.quoteObj} saveHandle={this.saveHandle} saved={this.state.saved}/>} exact/>
              <Route path="/random-local" render = {()=> <RandomLocal localDB={this.state.localDB}/>} exact/>
            <Route path="/add" render={()=><AddQuote handleSubmit={this.handleSubmit}/>}/>
            <Route path="/listing" render = {()=><ListingQuotes localDB={this.state.localDB} handleDelete={this.handleDelete}/>} />
          </Switch>
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
