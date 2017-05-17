import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllTypes } from '../api/serverRequests';
import { setTypes } from '../actions/Actions'

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    componentWillMount(){
        getAllTypes().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                console.log(data);
                this.props.setTypes(data)
            }
        })
    }

    render() {
        return <div className="flex-container">
            <div>{this.state.error}</div>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTypes: bindActionCreators(setTypes, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)