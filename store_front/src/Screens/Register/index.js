import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Cookies from 'js-cookie';
import { Route, Redirect,Switch } from 'react-router-dom';

import Profile from '../Profile';

class Register extends Component {

    constructor() {
        super();
        this.state = {

            password : '',
            mobile: '',
            loading : false,

            redirect : false,
            token : ''
        };
    }


    dataChange(ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    postData(ev) {
        ev.preventDefault();

        this.setState({
            loading : true
        })

        const form_params = {
            'mobile' : this.state.mobile,
            'password' : this.state.password,
        }


        axios.post('/api/v1/register', form_params)
            .then(res => {
                Cookies.set('access_token', '');
                Cookies.set('access_token', res.data.data.access_token);
                Cookies.set('isLoggedIn', true);


                this.setState({
                    redirect: true
                })

            }).catch(err => {
            console.log(err)
        })

    }


    render() {

        if (this.state.redirect) {
            return (
                <Switch>
                    <Redirect to='/Profile'/>
                    <Route path="/Profile"
                           component={() => <Profile token={this.state.token} />}
                    ></Route>
                </Switch>

            );
        } else {
            return (
                <div className="main">
                    <div className="form row justify-content-center align-items-center vh-50 m-0 p-0">
                        <div className="formMain col-xs-10 col-sm-10 col-lg-4 col-md-6 flex-column d-flex">

                            <div>
                                <form onSubmit={this.postData.bind(this)}>
                                    <div className="form-group ">
                                        <input type="text" name="mobile" className="form-control" id="exampleInputEmail1"
                                               value={this.state.mobile}
                                               aria-describedby="emailHelp" placeholder="موبایل را وارد نمایید."
                                               onChange={this.dataChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">

                                        <input type="password" name="password" className="form-control"
                                               id="exampleInputPassword1" value={this.state.password}
                                               placeholder="رمز عبور را وارد نمایید."
                                               onChange={this.dataChange.bind(this)}/>
                                    </div>

                                    <button type="submit" className="btn btn-primary">ثبت نام</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Register;