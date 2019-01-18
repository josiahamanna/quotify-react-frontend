import React from 'react'

class AddQuote extends React.Component {
    constructor(){
        super()
        this.state = {
            quote: '',
            author: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        let formData = {
            quote: this.state.quote,
            author: this.state.author
        }
        this.props.handleSubmit(formData)
        this.setState({
            quote: '',
            author: ''
        })
    }

    handleChange(event){
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea rows ={5} cols ={100} placeholder='Add Quote' name='quote' value={this.state.quote} onChange={this.handleChange}> </textarea><br/>
                    <textarea placeholder='Author' name='author' value={this.state.author} onChange={this.handleChange}> </textarea><br/>
                    <input type="submit" value="Add Quote"/>
                </form>
            </div>
        )
    }
}

export default AddQuote