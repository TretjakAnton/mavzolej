import React from 'react';
import { Button } from 'react-bootstrap';

class MenuControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      data: {
        _id: this.props.item._id,
        menu_name: this.props.item.menu_name
      },
      newName: this.props.item.menu_name,
      editStatus: false,
    };
  };

  handleName = (elem) => {
    this.setState({
      newName: elem.target.value,
    })
  };

  onEdit = () => {
    this.setState({
      editStatus: !this.state.editStatus,
    })
  };

  onCancelEdit = () => {
    this.setState({
      newName: this.state.data.menu_name,
    });
    this.onEdit();
  };

  onDelete = () => {
    this.props.onDeletItem(this.state.data)
  };

  onSave = () => {
    this.setState({data: {menu_name: this.state.newName}});
    this.props.onSaveItem({
      _id: this.state.data._id,
      menu_name: this.state.newName,
      oldMenu_name: this.state.data.menu_name
    });
    this.onEdit();
  };

  editRender = () => {
    let items = [];
    items.push(<td key="1"><input type="text" value={this.state.newName} onChange={this.handleName}/></td>);
    items.push(<td key="2"><Button onClick={this.onSave}>save</Button><Button onClick={this.onCancelEdit}>cancel</Button></td>);
    return items;
  };

  standardRender = () => {
    let items = [];
    items.push(<td key="1">{this.state.data.menu_name}</td>);
    items.push(<td key="2"><Button onClick={this.onEdit}>edit</Button><Button onClick={this.onDelete}>delete</Button></td>);
    return items;
  };

  render () {
    const edit = this.state.editStatus;
    return (
      <tr>
        {edit ? this.editRender() : this.standardRender()}
      </tr>
    );
  }
}

export default MenuControl;