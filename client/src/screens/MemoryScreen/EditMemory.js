import './style.css'
import api from '../../components/api'
import React, { Component } from 'react'

export default class EditMemory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title:"",
             author:'',
             Description:'',
             Image:'',
             updated:false,
             message:"",
             authorID:'',
             currentID:''
        }
    }
    componentDidMount() {
        api.get(`/memo/${this.props.match.params.id}`).then(response => {
            this.setState({
                title:response.data.title,
                author:response.data.author,
                Description:response.data.Description,
                Image:response.data.Image,
                authorID:response.data.authorId
            })
        }).catch(err => {
            console.log(err)
        })
         api.get('/users/currentUser').then(re => {
            this.setState({
                currentID:re.data['userID']
            })
         })
      console.log(this.props)
    }
  
     insertTitle = (e) => {
        this.setState({
            title:e.target.value
        })
    }
     insertAuthor = (e) => {
        this.setState({
            author:e.target.value
        })
    }
     insertDesc = (e) => {
        this.setState({
            Description:e.target.value
        })
    }
     onChangeFile = (e) => {
        this.setState({
            Image:e.target.files[0]
        })
    }

     submitForm =(e) => {
        const formData = new FormData()
        formData.append("title",this.state.title)
        formData.append("description",this.state.Description)
        formData.append("memoImage",this.state.Image)
        e.preventDefault()
        api.put('/memo/update/'+this.props.match.params.id,formData).then((reps) => {
            this.setState({updated:true,message:reps.data.message})
            console.log(reps)
        }).catch(err => {
            this.setState({updated:false})
            console.log(err);
        })
    }
    
    render() {
        if( this.state.authorID != this.state.currentID) {            
            return (
                <div>
                    <h1>You are not authorised to access this page</h1>
                </div>
            )
        }
        return (
            <form className="Mem-form" encType="multipart/form-data" onSubmit={this.submitForm}>
            {this.state.updated && (<h1 style={{color:"green"}}>{this.state.message}</h1>)}
            <div className="mb-3">                                
                <div>
                    <label className="form-label" htmlFor="name">Image Title</label>
                    <input className="form-control" type="text" id="name" placeholder="Title"
                        value={this.state.title} onChange={this.insertTitle} name="Title" required />
                </div>              
                <div>
                    <label className="form-label" htmlFor="desc">Image Description</label>
                    <textarea className="form-control" id="desc" name="Description" value={this.state.Description} onChange={this.insertDesc} rows="2"
                        placeholder="Description" required></textarea>

                </div>
                <div className="input-group mb-3">
                    <input onChange={this.onChangeFile} type="file" className="form-control" id="inputGroupFile02" name="memoImage" />
                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </div>
        </form>

        )
    }
}




