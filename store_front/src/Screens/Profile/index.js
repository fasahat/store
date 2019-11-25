import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import CategoryForm from '../../Components/CategoryForm';
import ProductForm from '../../Components/ProductForm';

import './index.css';


class Profile extends Component {

    constructor(props) {
        // console.log(cookie.load('email'))
        super(props);
        this.state = {
            name : '',
            code : '',
            loading : false,
            c_password : '',
            myProducts: [ ],
            myCategories : [],
            isMounted : '',
            new_form : ''
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    componentWillUnmount(){
        this.setState({ isMounted: false });
    }



    getMyCategories() {
        const Authorization = 'Bearer '+Cookies.get('access_token');

        axios.get('/api/v1/myCategories',{ headers: { Authorization: Authorization} })
            .then(response => {
                // if (this.state.isMounted) {
                    this.setState({
                        myCategories: (response.data.data),
                        myProducts: [],
                        new_form : ''
                    })
                // }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    getMyProducts() {
        const Authorization = 'Bearer '+Cookies.get('access_token');

        axios.get('/api/v1/myProducts',{ headers: { Authorization: Authorization} })
            .then(response => {
                if (this.state.isMounted) {
                    this.setState({
                        myProducts: (response.data.data),
                        myCategories: [],
                        new_form : ''
                    })
                }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    newCategory() {
        this.setState({
            'new_form' : 'category'
        })
    }

    newProduct() {
        this.setState({
            'new_form' : 'product'
        })
    }
    render() {
        let FormJSX = []
        FormJSX.length = 0
        if (this.state.new_form == 'category') {
            // FormJSX.length = 0
            FormJSX = []
            FormJSX = <CategoryForm/> ;
        } else if(this.state.new_form == 'product') {
            // FormJSX.length = 0
            FormJSX = []
            FormJSX = <ProductForm/> ;
        }
        let listItems = []
        listItems.length = 0;

        if (this.state.myCategories.length !== 0) {

            listItems.length = 0;
            let myCategories = this.state.myCategories

            listItems = myCategories.map((item) =>
                <li key={item.id}>{item.name}</li>
            );
            listItems.push(<a href="#"><li onClick={this.newCategory.bind(this)}>دسته بندی جدید</li></a>)


        }else if (this.state.myProducts.length !== 0) {
            listItems.length = 0;
            // console.log(listItems)
            listItems = this.state.myProducts.map((link) =>
                <li key={link.id}>{link.name}</li>
            );
            listItems.push(<a href="#"><li onClick={this.newProduct.bind(this)}>محصول جدید</li></a>)


        } else {
            listItems.length = 0;
        }

        if((Cookies.get('access_token') != '') && (Cookies.get('isLoggedIn') == 'true')) {
            return (

                <div className="main row">

                    <div className="showInfoMain col-lg-9 col-md-8">
                        <div className="showInfoInner">
                            <div className="showInfo">
                                <ul>
                                    {listItems}
                                </ul>
                                {FormJSX}
                                {/*<div className="">*/}
                                {/*    <div className="">*/}
                                {/*        <form onSubmit={this.postData.bind(this)}>*/}
                                {/*            <div className="form-group ">*/}
                                {/*                <input type="text" name="name" className="form-control" id=""*/}
                                {/*                       value={this.state.mobile}*/}
                                {/*                       aria-describedby="emailHelp" placeholder="نام دسته بندی"*/}
                                {/*                       onChange={this.dataChange.bind(this)}/>*/}
                                {/*            </div>*/}
                                {/*            <div className="form-group">*/}

                                {/*                <input type="text" name="code" className="form-control"*/}
                                {/*                       id="" value={this.state.password}*/}
                                {/*                       placeholder="کد دسته بندی"*/}
                                {/*                       onChange={this.dataChange.bind(this)}/>*/}
                                {/*            </div>*/}

                                {/*            <button type="submit" className="btn btn-primary">ثبت نام</button>*/}
                                {/*        </form>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="p_navbar  col-lg-3 col-md-4">
                        <div className="p_navbar_inner">
                            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="sideNav">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link js-scroll-trigger" href="#"
                                               onClick={this.getMyCategories.bind(this)}>دسته بندی ها</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link js-scroll-trigger" href="#"
                                               onClick={this.getMyProducts.bind(this)}>محصولات</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>

                </div>
            )

        } else {
            window.location.href = '/login';
        }

    }
}

export default Profile;