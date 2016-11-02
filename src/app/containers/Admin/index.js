import  React, { Component } from 'react';
import Pam from './Pam';
import Sizes from './Sizes';
import Types from './Types';

const pages = {
    pam: {
        id: 1,
        name: 'Памятники'
    },
    types: {
        id: 2,
        name: 'Типы'
    },
    size: {
        id: 3,
        name: 'Размеры'
    }
};

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {
                id: 1
            }
        };
    };
    changePage = (id) => {
        this.setState({current: {id: id}})
    };
    render() {
        return <div id="content">
            <div className="tabs">
                <div onClick={() => this.changePage(pages.pam.id)}>{pages.pam.name}</div>
                <div onClick={() => this.changePage(pages.types.id)}>{pages.types.name}</div>
                <div onClick={() => this.changePage(pages.size.id)}>{pages.size.name}</div>
            </div>
            {this.state.current.id === 1 &&
                <Pam />
            }
            {this.state.current.id === 2 &&
                <Types />
            }
            {this.state.current.id === 3 &&
                <Sizes />
            }
        </div>
    }
}

export default Admin;