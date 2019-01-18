import React from 'react'
import { stat } from 'fs';

export default class RandomAPI extends React.Component {
    constructor(){
        super()
        this.saveHandle = this.saveHandle.bind(this)
        this.getAnother = this.getAnother.bind(this)
    }

    saveHandle(){
        this.props.saveHandle()
    }

    getAnother(){
        this.props.getAnother()
    }

    render(){
        let quote = this.props.quoteObj.quote
        let author = this.props.quoteObj.author
        //saved = state.saved
        // getAnother = state.getAnother
        return (
            <div>
                {/* <h2> Hello </h2> */}
                <h2> {quote} </h2>
                <h2> -{author}</h2>
                {/* <h2> {saved} </h2> */}
                <button onClick={this.getAnother}> Get Another </button>
                {
                    this.props.saved ? 
                    <button> saved </button> :
                    <button onClick = {this.saveHandle}> save </button>
                }
            </div>
        )
    }
}