import React from 'react';
import Footer from './Footer';
import Header from './Header';

class MainPage extends React.Component {
    render() {
        return(
            <div id="content">
                <Header/>
                    {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default MainPage;