import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/user/login';

import CreateStudent from './pages/user/createStudent';
import CreateTeacher from './pages/user/createTeacher';

import SubjectStudent from './pages/subject/subjectStudent';
import SubjectTeacher from './pages/subject/subjectTeacher';

import AddClass from './pages/subject/addClass';
import AddSlide from './pages/subject/addSlide';
import AddActivity from './pages/activity/addActivity';
import ShowActivityStudent from './pages/activity/showActivityStudent';
import ShowActivityTeacher from './pages/activity/showActivityTeacher';
import ShowAnsweredActivity from './pages/activity/showAnsweredActivity';
import EditClass from './pages/subject/editClass';
import EditSlide from './pages/subject/editSlide';
import EditActivity from './pages/activity/editActivity';
import Profile from './pages/user/profile';
import EditStudent from './pages/user/editStudent';
import EditTeacher from './pages/user/editTeacher';

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/createStudent" exact component={CreateStudent}/>
                <Route path="/editStudent/:id" exact component={EditStudent}/>
                <Route path="/createTeacher" exact component={CreateTeacher}/>
                <Route path="/editTeacher/:id" exact component={EditTeacher}/>
                <Route path="/subjectStudent/:id" exact component={SubjectStudent}/>
                <Route path="/subjectTeacher/:id" exact component={SubjectTeacher}/>
                <Route path="/addClass/:id" exact component={AddClass}/>
                <Route path="/editClass/:id/:class" exact component={EditClass}/>
                <Route path="/addSlide/:id" exact component={AddSlide}/>
                <Route path="/editSlide/:id/:slide" exact component={EditSlide}/>
                <Route path="/addActivity/:id" exact component={AddActivity}/>
                <Route path="/showActivityTeacher/:id/:activity" exact component={ShowActivityTeacher}/>
                <Route path="/showActivityStudent/:id/:activity" exact component={ShowActivityStudent}/>
                <Route path="/editActivity/:id/:activity" exact component={EditActivity}/>
                <Route path="/showAnsweredActivity/:id/:activity/:answer" exact component={ShowAnsweredActivity}/>
            </Switch>
        </BrowserRouter>
    );
}   

export default Routes;