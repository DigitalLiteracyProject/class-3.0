import React from 'react';
import {render} from 'react-dom';
import NameCard from './NameCard.jsx';

class App extends React.Component {
  render () {
    var name = "Daniel";
    var name2 = "Jay";
    var name3 = "Brian";
    return <div>
      <NameCard name={name} clickedHandler={this.handleNameCardClicked} />
      <NameCard name={name2} clickedHandler={this.handleNameCardClicked} />
      <NameCard name={name3} clickedHandler={this.handleNameCardClicked} />
    </div>;
  }

  handleNameCardClicked(name) {
  	console.log(name);
  }
}

render(<App/>, document.getElementById('app'));
