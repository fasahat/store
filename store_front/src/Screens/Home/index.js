import React, {Component} from 'react';
import Header from '../../Components/Header';
import Content from "../../Components/Content";


import { BrowserRouter as  Router} from 'react-router-dom';
import Cookies from "js-cookie";

class Home extends Component {
    render() {
        // Cookies.set('isLoggedIn',false)
        let isLoggedIn = Cookies.get('isLoggedIn')

        return (
            <div>
                <Router>
                    <Header isLoggedIn={isLoggedIn}/>
                    <Content isLoggedIn={isLoggedIn}/>

                </Router>
            </div>
        );
    }
}

export default Home;