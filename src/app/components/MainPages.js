import  React from 'react';
import { getByType } from '../api/serverRequests';

class MainPages extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        getByType("1").then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                console.log(data);
                this.setState({pams: data.rows})
            }
        })
    }

    render(){
        return <div>{this.pams}</div>
    }
}

export default MainPages;