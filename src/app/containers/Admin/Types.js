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
      this.initData();
  };

  initData(){
    getAllTypes().then((data) => {
        if(data.error){
            this.setState({error: data.error})
        } else {
            this.setState({data: data})
        }
    })
}

  onSave = (item) => {
    updateType(item.new.type_name, item.new.folder, item.new.menu_name, item.oldType_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        this.setState({success: data})
      }
    })
  };

  onDelete = (item) => {
    deleteType(item.type_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        const newData = [...this.state.data];
        this.setState({
          success: data,
          data: newData.filter(el => el._id !== item._id)
        })
      }
    })
  };

  onAdd = (item) => {
    const newData = [...this.state.data];

    addType(item.type_name, item.folder, item.menu_name).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        newData.push(data);
        this.setState({
          success: true,
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
          {data && data.length !== 0 &&
            <tbody>
              {
                data.map((element, key) => {
                  return (
                    <TypesControl
                      key={key}
                      onSaveItem={this.onSave}
                      onDeletItem={this.onDelete}
                      item={element}
                      addElement={false}
                    />
                  )
                })
              }
            </tbody>
          }
        </Table>
        <TypesControl onAdd={this.onAdd} item={''} addElement={true}/>
      </div>
    )
  }
}


export default Types;

