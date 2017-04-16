import { Component } from 'react';
import { responseAsJson, handleFetchError } from '../util';

export default class DrawRaffle extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      name: null,
      err: null
    };
  }

  // TODO: get rid of console.logs
  componentWillMount() {
    const classroomId = this.props.match.params.classroomId;

    fetch('/core/api/classrooms/' + classroomId + '/students', {credentials: 'include'})
      .then(responseAsJson)
      .then(({body, ok, status}) => {
        if (ok) {
          this.setState({
            students: body.map((student) => student.name)
          });
        } else if (status == 401) {
          // not logged in yet, so redirect to login
          window.location.replace('/core/login');
        } else {
          throw new Error('Internal error: unexpected status return.');
        }
      })
      .catch(err => handleFetchError(err => {
        this.setState({err: err});
      }));
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
