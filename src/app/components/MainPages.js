import  React from 'react';

class MainPages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            typeId: this.props.params.id
        }
    }

    componentWillMount(){

    }

    render(){
        return null;
    }
}

export default MainPages;