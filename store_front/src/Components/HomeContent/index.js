import React, {Component} from 'react';
import axios from "axios";


class HomeContent extends Component {

    constructor(props) {

        super(props);
        this.state = {
            categories : [],
            isMounted : ''
        };
    }

    componentDidMount() {
        axios.get('/api/v1/category')
            .then(response => {
                // if (this.state.isMounted) {
                    this.setState({
                        categories: response.data.data,
                    })
                // }
                console.log(response.data.data)
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        let listItems = ''
        if (this.state.categories !== undefined) {

            listItems = this.state.categories.map((link) =>
                <li key={link.id}>{link.name}</li>
            );
        }
        return (
            <div className="showInfoMain col-lg-9 col-md-8">
                <div className="showInfoInner">
                    <div className="showInfo" >
                        <ul>
                           {listItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeContent;