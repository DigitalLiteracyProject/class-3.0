import { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../util';

export default class ClassList extends Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      err: null
    };
  }

  componentWillMount() {
    apiFetch('/core/api/classrooms')
    .then((body) => this.setState({ classes: body }))
    .catch(err => this.setState({ err: 'Failed to retrieve classroom list: ' + err }));
  }

  render() {
    const classDivs = this.state.classes.map(c => (
      <div key={c.id}>
        <Link to={'/classroom/' + c.id}>{c.description}</Link>
        <Link to={'/classroom/' + c.id + '/draw'}><button>Draw</button></Link>
      </div>
    ));
    return (
      <div>
        <h2>Classrooms</h2>
        {this.state.err ? <p>Error: {this.state.err}</p> : null}
        {classDivs}
      </div>
    );
  }
}