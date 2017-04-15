import { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../util';

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
			<li key={s.id}>{s.name}</li>
		));

		let pending = this.state.pending.map(s => (
			<li key={s.id}>{s.name}<span><button>Approve</button></span></li>
		));

		return (
			<div>
        {this.state.err ? <p>Error: {this.state.err}</p> : null}
				<h2>Classroom: {this.state.classroom.id}</h2>
        <Link to={'/classroom/' + this.state.classroom.id + '/draw'}><button>Draw</button></Link>
				<p>{this.state.classroom.description}</p>
        <div>
					<h3>Students</h3>
					<ul>
						{students}
					</ul>
				</div>
				<div>
					<h3>Pending</h3>
					<ul>
						{pending}
					</ul>
				</div>
		  </div>
		);
	}
}
