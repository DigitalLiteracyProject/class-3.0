import React from 'react';
import {render} from 'react-dom';
import NameCard from './NameCard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentWillMount() {
    fetch('/core/api/users/', {
        credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then((myJson) =>
      this.setState(users: myJson)
  )}

  render () {
    var namecards = this.state.users.map((user) =>
      <NameCard key={user.id} name={user.email} clickedHandler={this.handleNameCardClicked} />
    )
    return <div> {namecards} <button type="button" onClick = {this.submitAttendance}>Submit Attendance</button></div>
  }

  handleNameCardClicked(name) {
  	console.log(name);
  }

  submitAttendance() {
    alert('Attendance submitted!');
  }
}
render(<App/>, document.getElementById('app'));

// convert array to dictionary
// move state tracking functionality from namecard to app (just present or absent)
// have app on submit coordinate with backend
// frontend submits post fetch request
// urls on backend will handle
