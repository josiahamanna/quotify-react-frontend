import React from 'react'

class ListingQuotes extends React.Component {
    constructor(){
        super()
        this.state = {
            edit: false,
            key: '',
            quote: '',
            author: ''
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.changeHandle = this.changeHandle.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleDelete(event) {
        this.props.handleDelete(event.target.value)
    }

    handleEdit(event) {
        let index = event.target.value
        let quote = this.props.localDB[index].quote
        let author = this.props.localDB[index].author
        this.setState({
            edit:true, 
            key: index,
            quote:quote,
            author: author
        })
    }

    changeHandle(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCancel(){
        this.setState({
            edit:false
        })
    }

    handleUpdate(event) {
        let index = event.target.value
        this.props.localDB[index].quote = this.state.quote
        this.props.localDB[index].author = this.state.author
        localStorage.setItem('temp', JSON.stringify(this.props.localDB))
        this.setState({
            edit:false
        })
    }

    render(){
        return (
            this.props.localDB.length == 0
            ? <h2> List Empty </h2>
            : <div>
                {
                    this.props.localDB.map((quote, index)=>{
                        return(
                            this.state.edit && this.state.key == index
                            ? <div key={index}>
                                <textarea rows ={5} cols ={100} value = {this.state.quote} name="quote" onChange={this.changeHandle}>  </textarea> <br/>
                                <textarea value = {this.state.author} name="author" onChange={this.changeHandle}> </textarea><br/>
                                <button value={index} onClick={this.handleCancel}> Cancel </button>
                                <button value={index} onClick={this.handleUpdate} > Update </button>
                            </div> 
                            : <div key={index}>
                                <h2> {quote.quote} </h2>
                                <h2> -{quote.author}</h2>
                                <button value={index} onClick={this.handleEdit}> Edit </button>
                                <button value={index} onClick={this.handleDelete}> Delete </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ListingQuotes 