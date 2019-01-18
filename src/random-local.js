import React from 'react'

export default class RandomLocal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            random: this.props.localDB[Math.floor(Math.random()*100)%this.props.localDB.length]
        }
        this.getAnother = this.getAnother.bind(this)
    }

    getAnother(){
        this.setState({
            random: this.props.localDB[Math.floor(Math.random()*100)%this.props.localDB.length]
        })
    }

    render(){
        console.log('hey')
    //    let random = this.props.localDB[Math.floor(Math.random()*100)%this.props.localDB.length]
        return (
            !this.state.random
            ? <h2> Local storage Empty </h2>
            : <div>
                <h2> {this.state.random.quote} </h2>
                <h2> -{this.state.random.author}</h2>
                <button onClick={this.getAnother}> Get Another </button>
            </div>
        )
    }
}