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
      <Link to={'/classroom/' + c.id}>
        <div key={c.id} className='card'>
          <header><p>{c.description}</p></header>
          <footer><Link to={'/classroom/' + c.id + '/draw'}><button>Draw</button></Link></footer>
        </div>
      </Link>
    ));
    return (
      <div className='main-section'>
        <h2>Classrooms</h2>
        {this.state.err ? <p>Error: {this.state.err}</p> : null}
        {classDivs}
      </div>
    );
  }
}