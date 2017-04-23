import { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../util';
import classnames from 'classnames';

export default class ClassAdmin extends Component {
  constructor(props) {
    super();
    this.state = {
      classroom: {
        id: props.match.params.classroomId,
        description: 'Loading...'
      },
      students: [],
      pending: [],
      err: null
    };
  }

  componentWillMount() {
    let classroomIdParam = this.props.match.params.classroomId;
    let classroomId = parseInt(classroomIdParam);

    if (!classroomId) {
      this.setState({err: 'Invalid classroom: ' + classroomIdParam});
      return;
    }

    apiFetch('/core/api/classrooms/' + classroomId)
    .then((body) => this.setState({ classroom: body }))
    .catch(err => this.setState({ err: 'Failed to retrieve classrom details: ' + err }));

    apiFetch('/core/api/classrooms/' + classroomId + '/students')
    .then((body) => this.setState({ students: body }))
    .catch(err => this.setState({ err: 'Failed to retrieve students: ' + err }));

    apiFetch('/core/api/classrooms/' + classroomId + '/students/pending')
    .then((body) => this.setState({ pending: body }))
    .catch(err => this.setState({ err: 'Failed to retrieve pending students: ' + err }));
  }

  render() {
    let students = this.state.students.map(s => (
      <div className='card' key={s.id}>
        <header>
          {s.name}
          <button className={classnames('rh-button', { success: true, error: !true })}>{true ? 'In Drawing' : 'Excluded'}</button>
        </header>
      </div>
    ));

    let pending = this.state.pending.map(s => (
      <div className='card' key={s.id}>
        <header>
          <div>
            {s.name}
            <button className='rh-button'>Approve</button>
          </div>
        </header>
      </div>
    ));

    return (
      <div className='main-section card'>
        <header>
          <h2>Classroom: {this.state.classroom.id}</h2>
          {this.state.err ? <p className='error-msg'>Error: {this.state.err}</p> : null}
          <p>{this.state.classroom.description}</p>
          <Link to={'/classroom/' + this.state.classroom.id + '/draw'}>
            <button>Draw</button>
          </Link>
        </header>
        <footer>
          <div>
            <h3>Students</h3>
            {students}
          </div>
          <div>
            <span className='inline-heading'>
              <h3>Pending</h3>
              <label>
                <input type='checkbox' />
                <span className='checkable'>Open classroom for joining</span>
              </label>
            </span>
            {pending}
          </div>
        </footer>
      </div>
    );
  }
}
