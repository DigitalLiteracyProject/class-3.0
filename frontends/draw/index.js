import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ClassList from './ClassList';
import ClassAdmin from './ClassAdmin';
import DrawRaffle from './DrawRaffle';
import StudentJoin from './StudentJoin';

const App = (props) => (
  <div>
    <div className='top-bar'>
      <h1>DLP Draw</h1>
    </div>
    <div className='main-container'>
      {props.children}
    </div>
  </div>
);

const Main = () => (
  <App>
    <Router>
      <Switch>
        <Route path='/classroom/:classroomId/draw' component={DrawRaffle} />
        <Route path='/classroom/:classroomId' component={ClassAdmin} />
        <Route path='/join/:classroomJoinKey' component={StudentJoin} />
        <Route path='/' component={ClassList} />
      </Switch>
    </Router>
  </App>
);

ReactDOM.render(<Main />, document.getElementById('reactbase'))
