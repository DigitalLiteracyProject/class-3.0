import React from 'react';
import {render} from 'react-dom';
import NameCard from './NameCard.jsx';

// fetch users from core api
fetch('/core/api/users/', {
  credentials: 'include'
})
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  var names = [];
  for (var i = 0; i < myJson.length; i++){
    console.log(myJson[i]['email'])
    names.push(myJson[i]['email'])
  }

  console.log(names);

  class App extends React.Component {
    render () {
      var namecards = names.map((name) =>
        <NameCard name={name} clickedHandler={this.handleNameCardClicked} />
      )
      return <div> {namecards} </div>
      }

    handleNameCardClicked(name) {
    	console.log(name);
    }
  }
  render(<App/>, document.getElementById('app'));
});
