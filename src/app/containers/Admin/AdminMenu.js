import React from 'react';
import { Table, Button } from 'react-bootstrap';
import MenuItemControl from '../../components/MenuControl';
import Menu from '../../components/Menu';
import {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from '../../api/Menu';

class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      data: '',
      success: null,
      addStatus: false,
      newItem: {
        menu_name: ''
      },
    };
  };

  componentWillMount = () => {
    getMenuItems().then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({data: data})
      }
    })
  };

  onSave = (item) => {
    updateMenuItem(item.id_item, item.menu_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  onDelete = (item) => {
    deleteMenuItem(item.id_item).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  addElement = () => {
    this.setState({addStatus: true});
  };

  newItemHandler = (e) => {
    this.setState({newItem: { menu_name: e.target.value}})
  };

  onCancel = () => {
    this.setState({
      newItem: { menu_name: '' },
      addStatus: false,
    })
  };

  addItem = () => {
    let newData = this.state.data;
    newData.push(this.state.newItem);
    this.setState({
      data: newData,
      newItem: { menu_name: '' },
      addStatus: false,
    });

    addMenuItem(this.state.newItem.menu_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  render () {
    return (
      <div>
        <Menu />
        <Table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Контроль</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data && this.state.data.map((item, key) => {
            return <MenuItemControl key={key} item={item} onDeletItem={this.onDelete} onSaveItem={this.onSave} />
          })}
          </tbody>
        </Table>
        {this.state.addStatus &&
          <div>
            <div className="add-menu-item"> <input type="text" value={this.state.newItem.menu_name} onChange={this.newItemHandler} /> </div>
            <div className="add-menu-item-right"> <Button onClick={this.addItem}> <span>save</span> </Button> <Button onClick={this.onCancel}> <span>cancel</span> </Button> </div>
          </div>
        }
        <Button
          bsStyle="primary"
          bsSize="sm"
          onClick={this.addElement}
        >
          Добавить
        </Button>
      </div>
    )
  }
}

export default AdminMenu;