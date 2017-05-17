import React from 'react';
import { getAllTypes } from '../../api/Types';

class Types extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
          data: ''
        };
    };

    componentWillMount(){
        getAllTypes().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({data: data.error})
            }
        })
    }

    render() {
        return <div className="flex-container">
            <div>{this.state.userLogin}</div>
        </div>
    }
}


export default Types;

