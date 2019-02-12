import React from 'react';
import AdminPrEditor from './AdminPrEditor';
import CustomerPrEditor from './CustomerPrEditor';
import { ADMIN } from '../../Constants';
import {
  getPam,
  deleteImage,
  deletePam,
  addUpdatePam
} from '../../api/newPam';

export default class ProductEditor extends React.Component {
  constructor(props){
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const pageHref = parseInt(urlParams.get('page'));

    this.state = {
      contentFor: props.content,
      error: '',
      success: '',
      page: pageHref || 1,
      pams: null,
      typeId: props.params ? props.params.id : '',
      types: props.types || []
    }
  }

  getPamInfo = (id_prod, type_name, page, countRows, trueFalse) => {
    const currPage = (page - 1) * countRows;

    getPam(id_prod, type_name, currPage, countRows, trueFalse).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({
          pams: data,
          page: page
        });
      }
    });
  }

  deletePamById = (itemToDelete) => {
    deletePam(itemToDelete._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let newPamState = this.state.pams.filter(el => el !== itemToDelete);
        this.setState({ pams: newPamState });
      }
    });
  }

  saveChanges = (editing, addingImages, deletingImages) => {
    deletingImages.map((el) => {
      deleteImage(editing._id, el, editing.folder).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("success");
        }
      })
    })

    const changedType = this.state.types.find((el) => el.type_name === editing.type_name);

    addUpdatePam(editing.id_pam, changedType, editing.description, editing.price, addingImages, editing._id, editing.images ).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({error: data.error})
      } else {
        let newPam = this.state.pams.filter(el => el._id !== editing._id);
        newPam.push(data)

        this.setState({
          pams: newPam,
        });
      }
    })
  }

  render(){
    const {
      page,
      pams,
      contentFor,
      typeId
    } = this.state;

    if(contentFor == ADMIN){
      return (
        <AdminPrEditor 
          page={page}
          pams={pams}
          getPamInfo={this.getPamInfo}
          deletePamById={this.deletePamById}
          types={this.props.types}
          saveChanges={this.saveChanges}
        />
      )
    } else if (contentFor == null || contentFor == undefined){
      return (
        <CustomerPrEditor 
          pams={pams}
          getPamInfo={this.getPamInfo}
          id_type={typeId}
          page={page}
        />
      )
    }
  }
}