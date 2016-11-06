import  React from 'react';
import { getByType } from '../api/serverRequests';

class MainPages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            typeId: this.props.params.id
        }
    }

    componentWillMount(){
        getByType(this.state.typeId).then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                console.log(data);
                this.setState({pams: data})
            }
        })
    }

    render(){
        if(this.state.pams){
            return <div>{this.state.pams[0].id_fake}</div>
        }
        return null;
    }
}

export default MainPages;