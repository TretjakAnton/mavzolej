import React from 'react';
import TypesControl from '../../components/TypesControl';
import { Table } from 'react-bootstrap';
import {
  getAllTypes,
  updateType,
  addType,
  deleteType,
} from '../../api/Types';

class Types extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        error: '',
        data: '',
        success: '',
      };
  };

  componentWillMount(){
      getAllTypes().then((data) => {
          if(data.error){
              this.setState({error: data.error})
          } else {
              this.setState({data: data})
          }
      })
  }

  onSave = (item) => {
    updateType(item.id_type, item.name, item.folder, item.id_item).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  onDelete = (item) => {
    deleteType(item.id_item).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  onAdd = (item) => {
    let newData = this.state.data;
    const menu_item = this.state.data.find((elem) => {
      if(elem.parent == item.menu_name){
        return elem.menu_name
      }
    });
    newData.push({
      folder: item.folder,
      name: item.name,
      parent: item.menu_name,
      menu_name: menu_item.menu_name,
    });

    addType(item.name, item.folder, item.menu_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({
          success: data,
          data: newData,
        })
      }
    });
  };

  render() {
    const data = this.state.data;
    return (
      <div className="flex-container">
        <Table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Название папки</th>
              <th>Пункт меню</th>
              <th>Контроль</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element, key) => {
                return <TypesControl key={key} onSaveItem={this.onSave} onDeletItem={this.onDelete} item={element} addElement={false}/>
              })
            }
          </tbody>
        </Table>
        <TypesControl onAdd={this.onAdd} item={''} addElement={true}/>
      </div>
    )
  }
}


export default Types;

