import React from 'react';
import {
  Modal,
  FormControl,
  Button
} from 'react-bootstrap';
import Pages from '../Pages';
import ImageControl from '../ImageControl';
import AdminTable from './AdminTable';

export default class AdminPrEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      curr_type: props.types[0],
      editing: null,
      countRows: 10,
      error: props.error || '',
      showModal: false,
      itemToDelete: null,
      addingImages: null,
      deletingImages: [],
    }
    const current = this.state.curr_type ? this.state.curr_type.type_name : '';
    this.props.getPamInfo(null, current, props.page, this.state.countRows, false);
  }

  changePage = (page) => {
    this.props.getPamInfo(null, this.state.curr_type.type_name, page, this.state.countRows, false);
  };

  typeConrol = (event) => {
    const newElem = this.props.types.find((elem) => {
      if (elem.type_name == event.target.value) {
        return elem;
      }
    });
    this.setState({ curr_type: newElem });
    this.props.getPamInfo(null, newElem.type_name, this.state.page, this.state.countRows, false);
  };

  reload = () => {
    this.props.getPamInfo(null, this.state.curr_type.type_name, this.state.page, this.state.countRows, false);
  }

  setToDelete = (pam) => {
    this.setState({
      itemToDelete: pam,
      showModal: true,
    })
  }

  dropElement = () => {
    this.props.deletePamById(this.state.itemToDelete);
    this.cancelModal();
  };

  setToEdit = (pam) => {
    this.setState({
      editing: pam,
      showModal: true,
    })
  }

  saveChanges = () => {
    const {
      editing,
      addingImages,
      deletingImages,
    } = this.state;

    this.props.saveChanges(editing, addingImages, deletingImages);
    this.cancelModal();
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
        {this.props.types.map((val, key) => {
          return <option key={key} value={val.type_name}>{val.type_name}</option>;
        })}
      </FormControl>)
    }
    return (
      <div className="admin-product-editor">
        { getTypes(curr_type ? curr_type.type_name: '', this.typeConrol, "curr_type") }

        <Button className="reload-button" onClick={this.reload}>Перезагрузить</Button>

        { this.props.pams && 
          <AdminTable 
            pams={this.props.pams} 
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
          currentPage={this.props.page}
        />
      </div>
    )
  }
}