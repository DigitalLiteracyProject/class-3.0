import React from 'react';
import {render} from 'react-dom';
import NameCard from './NameCard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: {}};
  }

  componentWillMount() {
    fetch('/core/api/users/', {
        credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => {
      var dict = myJson.reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
      }, {});
      for (var key in dict) {
        dict[key].present = false;
      }
      this.setState(
        {users: dict})
    })
  }

  render () {
    var namecards = [];
    for (var key in this.state.users) {
      namecards.push(<NameCard present={this.state.users[key].present}
                               id={this.state.users[key].id}
                               key={this.state.users[key].id}
                               name={this.state.users[key].email}
                               clickedHandler={this.handleNameCardClicked.bind(this)} />)
    }

    return <div> {namecards} <button type="button" onClick = {this.submitAttendance.bind(this)}>Submit Attendance</button></div>
  }

  handleNameCardClicked(name, id, present) {
  	console.log(name);
    console.log(present);
    this.state.users[id - 1].present = present;
    console.log("After");
    console.log(this.state.users[id - 1].present);
  }

  submitAttendance() {
    alert('Attendance submitted!');
    console.log(this.state.users);
  }
}
render(<App/>, document.getElementById('app'));

// have app on submit coordinate with backend
// frontend submits post fetch request
// urls on backend will handle
