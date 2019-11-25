import React, {Component} from 'react';
import {Navbar, Nav }from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";


class Header extends Component {

    logout() {
        Cookies.set('access_token', '');
        Cookies.set('isLoggedIn', false);
        Cookies.remove('access_token');
        Cookies.remove('isLoggedIn')
        window.location.href = '/login';
    }
    render() {
        const isLoggedIn = Cookies.get('isLoggedIn');
        console.log(typeof isLoggedIn)
        if (this.props.isLoggedIn === 'true') {
            return (
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="#home">پروژه من</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" style={{direction: 'rtl'}}>
                        <Nav>
                            <Nav.Link>
                                <Link to='/Profile'>پروفایل کاربر</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='' onClick={this.logout}>خروج</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="#home">پروژه من</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" style={{direction: 'rtl'}}>
                        <Nav>
                            <Nav.Link>
                                <Link to='/register'>ثبت نام</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/login'>ورود</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}

export default Header;