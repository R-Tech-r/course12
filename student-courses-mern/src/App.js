import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import CoursesList from "./components/courses-list.component";
import EditCourse from "./components/edit-course.component";
import CreateCourse from "./components/create-course.component";
import CreateStudent from "./components/create-student.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CoursesList} />
      <Route path="/edit/:id" component={EditCourse} />
      <Route path="/create" component={CreateCourse} />
      <Route path="/student" component={CreateStudent} />
      </div>
    </Router>
  );
}

export default App;
