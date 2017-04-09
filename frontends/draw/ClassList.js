import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { responseAsJson, handleFetchError } from '../util';

export default class ClassList extends Component {
    constructor() {
        super();
        this.state = {
            classes: [],
            err: null
        };
    }

    componentWillMount() {
        fetch('/core/api/classrooms', {credentials: 'include'})
            .then(responseAsJson)
            .then(({body, ok, status}) => {
                if (ok) {
                    this.setState({
                        classes: body
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
                {classDivs}
            </div>
        );
    }
}