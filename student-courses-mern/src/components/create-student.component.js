import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      student: '',
      email:''
    }
  }
  

  onChangeStudent(e) {
    this.setState({
      student: e.target.value
    })
  }
  
  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const student = {
      student: this.state.student,
      email: this.state.email
    }

    console.log(student);

    axios.post('http://localhost:5000/students/add', student)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Student</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>student: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.student}
                onChange={this.onChangeStudent}
                />
          </div>

          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          
          <div className="form-group">
            <input type="submit" value="Create Student" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}