import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ajax } from '../helpers';

class Draw extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      name: null
    };
  }

  // TODO: get rid of console.logs
  componentWillMount() {
    var classroomId = document.getElementById('params').dataset.params;
    ajax("GET", "/core/api/classrooms/" + classroomId + "/students/", "json",
         function(students) {
           var namesToDraw = students.map((student) => student.name);
           this.setState({ students: namesToDraw });
         }.bind(this),
         function(err) {}.bind(this));
  }

  doDraw() {
    var randomIndex;
    var randomStudentName;
    randomIndex = Math.floor(Math.random() * this.state.students.length);
    randomStudentName = this.state.students[randomIndex];
    this.setState({
      name: randomStudentName
    });
  }
  
  render() {
    var innerComponent;
    if (this.state.name) {
      innerComponent =
        <DrawResult name={this.state.name} doDraw={() => this.doDraw()} />
    } else {
      innerComponent = <DrawButton doDraw={() => this.doDraw()} />
    }

    return (
      <div className="draw-container">
        {innerComponent}
      </div>
    );
  }
}

class DrawButton extends Component {
  render() {
    return (
      <button className="btn" onClick={this.props.doDraw}>Draw</button>
    );
  }
}

class DrawResult extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <button className="btn" onClick={this.props.doDraw}>Draw Again</button>
      </div>
    );
  }
}

ReactDOM.render(<Draw />, document.getElementById('reactbase'))
