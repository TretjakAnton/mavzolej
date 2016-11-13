import React from 'react';
import {
    getPam,
    getAllTypes,
    getSizes,
    getImages
} from '../../api/serverRequests';

class Pam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            types: null,
            sizes: null,
            images: null,
            pam: null
        };
    };

    componentWillMount(){
        getAllTypes().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({types: data})
            }
        });
        getSizes().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({sizes: data})
            }
        });
        getImages().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({images: data})
            }
        });
        getPam().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({images: data})
            }
        });
    }

    generateDOM = (name) => {
        let domElements = [];
        if(name === 'types' && this.state.types !== null){
            this.state.types.map((val, key) => {
                domElements.push(<option key={key} value={val.id_type}>{val.name_type}</option>);
            })
        } else if (name === 'sizes' && this.state.sizes !== null){
            this.state.sizes.map((val, key) => {
                domElements.push(<option key={key} value={val.id_size}>{val.size_name}</option>);
            })
        } else if(name === 'pam' && this.state.pam !== null){

        }
        return domElements;
    };

    render() {
        const checked = this.state.types !== null &&
                        this.state.sizes !== null &&
                        this.state.images !== null &&
                        this.state.pam !== null;
        if(checked){
            return <div className="flex-container">
                <div>
                    <input type="text" name="id_pam"/>
                    <select name="id_type">
                        {this.generateDOM('types')}
                    </select>
                    <input type="text" name="opis"/>
                    <input type="text" name="price"/>
                    <select name="id_size">
                        {this.generateDOM('sizes')}
                    </select>
                </div>
                <div>
                    {this.generateDOM('pam')}
                </div>
            </div>
        }
        return null;
    }
}


export default Pam;