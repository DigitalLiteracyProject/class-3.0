import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import ClassList from './ClassList';
import ClassAdmin from './ClassAdmin';
import DrawRaffle from './DrawRaffle';
import StudentJoin from './StudentJoin';

import 'picnic/picnic.min.css';
import './styles.css';

const App = (props) => (
  <div>
    <div>
      <nav className='top-bar'>
        <Link to='/' className='brand'>
          <span>DLP Draw</span>
        </Link>
      </nav>
    </div>
    <section className='main-container'>
      {props.children}
    </section>
  </div>
);

const Main = () => (
  <Router>
    <App>
      <Switch>
        <Route path='/classroom/:classroomId/draw' component={DrawRaffle} />
        <Route path='/classroom/:classroomId' component={ClassAdmin} />
        <Route path='/join/:classroomJoinKey' component={StudentJoin} />
        <Route path='/' component={ClassList} />
      </Switch>
    </App>
  </Router>
);

ReactDOM.render(<Main />, document.getElementById('reactbase'))
