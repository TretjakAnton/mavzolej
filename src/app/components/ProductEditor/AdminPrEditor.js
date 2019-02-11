import React from 'react';
import {
  Modal,
  FormControl,
  Button
} from 'react-bootstrap';
import {
  getPam,
  deletePam,
  addUpdatePam,
  deleteImage,
} from '../../api/newPam';
import Pages from '../Pages';
import ImageControl from '../ImageControl';
import AdminTable from './AdminTable';

export default class AdminPrEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: this.props.types,
      curr_type: this.props.types[0],
      editing: null,
      countRows: 10,
      pams: null,
      error: null,
      DOMPages: null,
      showModal: false,
      itemToDelete: null,
      addingImages: null,
      deletingImages: [],
    }
  }

  componentWillReceiveProps() {
    const { curr_type, page } = this.state;
    const current = curr_type ? curr_type.type_name : '';
    this.getInfoForPage(null, current, page);
  }

  componentWillMount() {
    const { curr_type } = this.state;
    const current = curr_type ? curr_type.type_name : '';
    this.getInfoForPage(null, current);
  };

  changePage = (page) => {
    this.setState({ page: page });
    this.getInfoForPage(null, this.state.curr_type.type_name, page);
  };

  calcRange = (page) => {
    return (page - 1) * this.state.countRows;
  };

  typeConrol = (event) => {
    const newElem = this.state.types.find((elem) => {
      if (elem.type_name == event.target.value) {
        return elem;
      }
    });
    this.setState({ curr_type: newElem });
    this.getInfoForPage(null, newElem.type_name);
  };

  getInfoForPage = (id_prod, type_name, page) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageHref = parseInt(urlParams.get('page'));

    const newPage = page || pageHref || 1;

    getPam(id_prod, type_name, this.calcRange(newPage), this.state.countRows).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ pams: data })
      }
    });
  };

  setToDelete = (pam) => {
    this.setState({
      itemToDelete: pam,
      showModal: true,
    })
  }

  dropElement = () => {
    const { itemToDelete, pams } = this.state;
    deletePam(itemToDelete._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        this.cancelModal();
      } else {
        let newPamState = pams;
        let indexElem = newPamState.indexOf(itemToDelete);
        newPamState.splice(indexElem, 1);
        this.setState({ pams: newPamState });
        this.cancelModal();
      }
    });
  };

  setToEdit = (pam) => {
    this.setState({
      editing: pam,
      showModal: true,
    })
  }

  saveChanges = () => {
    const {
      pams,
      editing,
      types,
      addingImages,
      deletingImages,
    } = this.state;
    let index;
    pams.find((el, valIndex) => {
      if (el._id === editing._id) {
        index = valIndex;
      }
    });
    if(index == undefined) return;

    deletingImages.map((el) => {
      deleteImage(editing._id, el, editing.folder).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("success");
        }
      })
    })

    const changedType = types.find((el) => el.type_name === editing.type_name);

    addUpdatePam(editing.id_pam, changedType, editing.description, editing.price, addingImages, editing._id, editing.images ).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.cancelModal();
      } else {
        let newPam = pams;
        newPam.splice(index, 1);

        console.log("success");
        this.cancelModal();
        this.setState({
          pam: newPam.push(data),
        });
      }
    })
  }

  cancelModal = () => {
    this.setState({
      editing: null,
      itemToDelete: null,
      showModal: false,
      addingImages: null,
      deletingImages: [],
    })
  }

  editTypeConrol = (event) => {
    this.setState({
      editing: {
        ...this.state.editing,
        type_name: event.target.value
      }
    })
  }

  inputsConrol = (event) => {
    let state = {};
    if (event.target.name === 'id_pam')
      state = { id_pam: event.target.value }
    if (event.target.name === 'price')
      state = { price: event.target.value }
    if (event.target.name === 'description')
      state = { description: event.target.value }
    
    this.setState({
      editing: {
        ...this.state.editing,
        ...state,
      }
    })
  }

  deleteImages = (image) => {
    let newArr = this.state.deletingImages;
    newArr.push(image);
    this.setState({
      deletingImages: newArr,
    });
  }

  addNewImages = (images) => {
    this.setState({
      addingImages: images,
    });
  }

  render() {
    const {
      curr_type,
      showModal,
      itemToDelete,
      editing
    } = this.state;
    const getTypes = (value, change, name) => {
      return (<FormControl componentClass="select" name={name} value={value} onChange={change}>
        {this.state.types.map((val, key) => {
          return <option key={key} value={val.type_name}>{val.type_name}</option>;
        })}
      </FormControl>)
    }
    return <div>
      { getTypes(curr_type ? curr_type.type_name: '', this.typeConrol, "curr_type") }
      { this.state.pams && 
        <AdminTable 
          pams={this.state.pams} 
          folder={this.state.curr_type.folder}
          setToEdit={this.setToEdit}
          setToDelete={this.setToDelete}
        />
      }
      <Modal
        show={showModal}
        onHide={this.cancelModal}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Удаление памятника</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {itemToDelete &&
              <div className="delete-image-modal">
                <span>Номер памятника {itemToDelete.id_pam}</span>
                <ImageControl
                  images={itemToDelete.images}
                  previewFolder={'../../media/images' + itemToDelete.folder}
                />
              </div>
            }
            {editing &&
              <div className="delete-image-modal">
                <div className="deleting-item col-xs-11">
                  <span>Номер памятника</span> 
                  <FormControl
                    type="number"
                    name="id_pam"
                    value={editing.id_pam}
                    onChange={this.inputsConrol}
                  />
                </div>
                <div className="deleting-item col-xs-11">
                  <span>тип памятника</span>
                  { getTypes(editing.type_name, this.editTypeConrol, "edit_type") }
                </div>
                <ImageControl
                  images={editing.images}
                  info={editing}
                  previewFolder={'../../media/images' + editing.folder}
                  editing
                  deleteImages={this.deleteImages}
                  addNewImages={this.addNewImages}
                />
                <div className="deleting-item col-xs-11">
                  <span>Цена</span> 
                  <FormControl
                    type="number"
                    name="price"
                    value={editing.price}
                    onChange={this.inputsConrol}
                  />
                </div>
                <div className="deleting-item col-xs-11">
                  <span>Описание</span> 
                  <textarea style={{width: '100%', height: '100px'}}
                    name="description"
                    value={editing.description}
                    onChange={this.inputsConrol}
                  />
                </div>
              </div>
            }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.cancelModal}>Отменить</Button>
            {itemToDelete &&
              <Button
                bsStyle="primary"
                onClick={this.dropElement}
              >
                Удалить
              </Button>
            }
            {editing &&
              <Button
                bsStyle="primary"
                onClick={this.saveChanges}
              >
                Сохранить
              </Button>
            }
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <Pages
        countRows={this.state.countRows}
        type={curr_type ? curr_type.type_name: ''}
        onChange={this.changePage}
      />
    </div>
  }
}