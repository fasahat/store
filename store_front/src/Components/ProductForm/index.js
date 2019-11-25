import React, {Component} from 'react';
import {  Route } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";



class ProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'name' : '',
            'code' : '',
            'allCategory' : [],
            'allColor': [],
            'selectColor' : '',
            'selectCategory' : '',
            'RAM' : ''

        }
    }

    componentDidMount() {
        const Authorization = 'Bearer '+Cookies.get('access_token');
        axios.get('/api/v1/category',{ headers: { Authorization: Authorization} })
            .then(res => {
                console.log(res.data.data)

                this.setState({
                    allCategory: res.data.data
                })

            }).catch(err => {
            console.log(err)
        })

        axios.get('/api/v1/color',{ headers: { Authorization: Authorization} })
            .then(res => {
                console.log(res.data.data)

                this.setState({
                    allColor: res.data.data
                })

            }).catch(err => {
            console.log(err)
        })
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
        // console.log(this.state.selectCategory+'   '+ this.state.selectColor)
        const form_params = {
            'name' : this.state.name,
            'color' : this.state.selectColor,
            'category_id' : this.state.selectCategory,
            'RAM' : this.state.RAM
        }
 console.log(form_params)

        const Authorization = 'Bearer '+Cookies.get('access_token');

        axios.post('/api/v1/product/create',form_params,{ headers: { Authorization: Authorization} })
            .then(res => {
                console.log(res.data.data)

                // axios.get('/api/v1/myCategories',{ headers: { Authorization: Authorization} })
                //     .then(response => {
                //         if (this.state.isMounted) {
                //             this.setState({
                //                 myCategories: (response.data.data),
                //                 myProducts: [],
                //             })
                //         }
                //     })
                //     .catch(error => {
                //         console.log('Error fetching and parsing data', error);
                //     });
                // this.setState({
                //     redirect: true
                // })

            }).catch(err => {
            console.log(err)
            })

    }

    render() {
        let categoryOptions = ''
        let colorOptions = ''

        if (this.state.allCategory != '') {
            categoryOptions = this.state.allCategory.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
            );
        }

        if(this.state.allColor) {
            colorOptions = this.state.allColor.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
            );
        }
        return (
            <div>
                <div className="">
                    <div className="">
                        <form onSubmit={this.postData.bind(this)}>
                            <div className="form-group ">
                                <input type="text" name="name" className="form-control" id=""
                                       value={this.state.name}
                                       aria-describedby="emailHelp" placeholder="نام محصول"
                                       onChange={this.dataChange.bind(this)}/>
                            </div>
                            <div className="form-group ">
                                <input type="text" name="RAM" className="form-control" id=""
                                       value={this.state.RAM}
                                       aria-describedby="emailHelp" placeholder="RAM"
                                       onChange={this.dataChange.bind(this)}/>
                            </div>
                            <div>
                                <select name="selectCategory" value={this.state.selectCategory} onChange={this.dataChange.bind(this)}>
                                    <option key="0" value="0">انتخاب دسته بندی</option>
                                    {categoryOptions}
                                </select>
                            </div>
                            <div>
                                <select name="selectColor" value={this.state.selectColor} onChange={this.dataChange.bind(this)}>
                                    <option key="0" value="0">انتخاب رنگ</option>
                                    {colorOptions}
                                </select>
                            </div>
                            {/*<div className="form-group">*/}

                            {/*    <input type="text" name="code" className="form-control"*/}
                            {/*           id="" value={this.state.password}*/}
                            {/*           placeholder="کد دسته بندی"*/}
                            {/*           onChange={this.dataChange.bind(this)}/>*/}
                            {/*</div>*/}

                            <button type="submit" className="btn btn-primary">ثبت نام</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductForm;