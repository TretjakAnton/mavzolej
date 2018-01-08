import React from 'react';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { getMenuItems } from '../api/Menu';

class TypesControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      addElement: this.props.addElement,
      item: {
        _id: this.props.item._id || '',
        type_name: this.props.item.type_name || '',
        folder: this.props.item.folder || '',
        menu_name: this.props.item.menu_name || '',
      },
      newItem: {
        _id: this.props.item._id || '',
        type_name: this.props.item.type_name || '',
        folder: this.props.item.folder || '',
        menu_name: this.props.item.menu_name || '',
      },
      editStatus: false,
      addState: false,
      menu: null,
    };
  };

  componentWillMount = () => {
    return getMenuItems().then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({menu: data})
      }
    });
  };

  handleInputs = (elem) => {
    if (elem.target.name == 'name'){
      this.setState({
        newItem: {
          _id: this.state.newItem._id,
          folder: this.state.newItem.folder,
          menu_name: this.state.newItem.menu_name,
          type_name: elem.target.value
        },
      })
    }
    if (elem.target.name == 'folder'){
      this.setState({
        newItem: {
          _id: this.state.newItem._id,
          menu_name: this.state.newItem.menu_name,
          type_name: this.state.newItem.type_name,
          folder: elem.target.value
        },
      })
    }
    if (elem.target.name == 'menu_name'){
      this.setState({
        newItem: {
          _id: this.state.newItem._id,
          folder: this.state.newItem.folder,
          type_name: this.state.newItem.type_name,
          menu_name: elem.target.value,
        },
      })
    }
  };

  onEdit = () => {
    this.setState({
      editStatus: !this.state.editStatus,
    })
  };

  onCancelEdit = () => {
    this.setState({
      newItem: this.state.item,
    });
    this.onEdit();
  };

  onDelete = () => {
    this.props.onDeletItem(this.state.item)
  };

  onSave = () => {
    this.setState({item: this.state.newItem});
    this.props.onSaveItem({new: this.state.newItem, oldType_name: this.props.item.type_name});
    this.onEdit();
  };

  editRender = () => {
    let items = [];
    const menuItems = this.state.menu;
    items.push(<td key="1"><input type="text" name="name" value={ this.state.newItem.type_name } onChange={this.handleInputs} /></td>);
    items.push(<td key="2"><input type="text" name="folder" value={ this.state.newItem.folder } onChange={this.handleInputs} /></td>);
    items.push(<td key="3"><select name="menu_name" value={this.state.newItem.menu_name} onChange={this.handleInputs}>{menuItems.map((item, key) => {return <option key={key} value={item.menu_name}>{item.menu_name}</option>})}</select></td>);
    items.push(<td key="4"><Button onClick={this.onSave}>save</Button><Button onClick={this.onCancelEdit}>cancel</Button></td>);
    return items;
  };

  standardRender = () => {
    let items = [];
    items.push(<td key="1">{ this.state.item.type_name }</td>);
    items.push(<td key="2">{ this.state.item.folder }</td>);
    items.push(<td key="3">{ this.state.item.menu_name }</td>);
    items.push(<td key="4"><Button onClick={this.onEdit}>edit</Button><Button onClick={this.onDelete}>delete</Button></td>);
    return items;
  };

  addRender = () => {
    let items = [];
    const menuItems = this.state.menu;
    items.push(<td key="1"><input type="text" name="name" value={ this.state.newItem.type_name } onChange={this.handleInputs} /></td>);
    items.push(<td key="2"><input type="text" name="folder" value={ this.state.newItem.folder } onChange={this.handleInputs} /></td>);
    items.push(<td key="3"><select name="menu_name" value={this.state.newItem.menu_name} onChange={this.handleInputs}>{menuItems.map((item, key) => {return <option key={key} value={item.menu_name}>{item.menu_name}</option>})}</select></td>);
    items.push(<td key="4"><Button onClick={this.addItem}>save</Button><Button onClick={this.onCancelAdd}>cancel</Button></td>);
    return items;
  };

  addElement = () => {
    const defaultParent = this.state.menu[0].manu_name || "Главное";
    this.setState({
      addState: true,
      newItem: {
        folder: this.state.item.folder,
        type_name: this.state.item.type_name,
        menu_name: defaultParent
      }
    })
  };

  addItem = () => {
    this.props.onAdd(this.state.newItem);
  };

  onCancelAdd = () => {
    this.setState({
      newItem: this.state.item,
      addState: false,
    })
  };

  render () {
    const edit = this.state.editStatus;
    const addStatus = this.state.addState;
    let renderItem;

    if(this.state.addElement){
      renderItem = <div>
        {addStatus && this.state.menu &&
          <Table>
            <tbody>
              <tr>{this.addRender()}</tr>
            </tbody>
          </Table>
        }
        <Button
          bsStyle="primary"
          bsSize="sm"
          onClick={this.addElement}
        >
          Добавить
        </Button>
      </div>;
    } else {
      renderItem = <tr>{edit ? this.editRender() : this.standardRender()}</tr>;
    }

    return renderItem;
  }
}

export default TypesControl;