    import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCoursename = this.onChangeCoursename.bind(this);
    this.onChangeTeachername = this.onChangeTeachername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      coursename: '',
      teachername:'',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/courses/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          coursename: response.data.coursename,
          teachername:response.data.teachername,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/courses/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map(course => course.coursename),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeCoursename(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeTeachername(e){
    this.setState({
      teachername: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const course = {
      username: this.state.username,
      teachername:this.state.teachername,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(course);

    axios.post('http://localhost:5000/courses/update/' + this.props.match.params.id, course)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Course Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Coursename: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.coursename}
              onChange={this.onChangeCoursename}>
              {
                this.state.courses.map(function(course) {
                  return <option 
                    key={course}
                    value={course}>{course}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group"> 
          <label>Teachername: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.teachername}
              onChange={this.onChangeTeachername}>
              {
                this.state.courses.map(function(course) {
                  return <option 
                    key={course}
                    value={course}>{course}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in months): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Course Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}