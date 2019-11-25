import React, {Component} from 'react';
import {  Route } from 'react-router-dom';

import Profile from "../../Screens/Profile";
import Login from "../../Screens/Login";
import Register from "../../Screens/Register";
import HomeContent from "../HomeContent";


class Content extends Component {
    render() {

        return (
            <div>
                {/*<Switch>*/}
                <Route path="/Profile" component={Profile}
                ></Route>

                <Route path="/login" component={Login}
                ></Route>

                <Route path="/register" component={Register}
                ></Route>

                <Route exact path="/" component={HomeContent} />
                {/*</Switch>*/}
            </div>
        );
    }
}

export default Content;