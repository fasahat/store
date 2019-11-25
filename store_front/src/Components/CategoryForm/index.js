import React, {Component} from 'react';
import {  Route } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";



class CategoryForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'name' : '',
            'code' : ''

        }
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
            'name' : this.state.name,
            'code' : this.state.code,
        }


        const Authorization = 'Bearer '+Cookies.get('access_token');

        axios.post('/api/v1/category/create',form_params,{ headers: { Authorization: Authorization} })
            .then(res => {
                console.log(res.data.data)

                axios.get('/api/v1/myCategories',{ headers: { Authorization: Authorization} })
                    .then(response => {
                        if (this.state.isMounted) {
                            this.setState({
                                myCategories: (response.data.data),
                                myProducts: [],
                            })
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching and parsing data', error);
                    });
                this.setState({
                    redirect: true
                })

            }).catch(err => {
            console.log(err)
        })

    }

    render() {

        return (
            <div>
                <div className="newform row">
                    <div className="newformMain">
                        <form onSubmit={this.postData.bind(this)}>
                            <div className="form-group ">
                                <input type="text" name="name" className="form-control" id=""
                                       value={this.state.mobile}
                                       aria-describedby="emailHelp" placeholder="نام محصول"
                                       onChange={this.dataChange.bind(this)}/>
                            </div>

                            <div className="form-group">

                                <input type="text" name="code" className="form-control"
                                       id="" value={this.state.password}
                                       placeholder="کد دسته بندی"
                                       onChange={this.dataChange.bind(this)}/>
                            </div>

                            <button type="submit" className="btn btn-primary">ثبت نام</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryForm;