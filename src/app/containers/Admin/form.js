import React from 'react';
import { setForm } from '../../api/Form';
import AddControl from './controleForm/AddContole';
import ByForm from '../../components/ByForm';

class AdminForm extends React.Component{
  constructor(props) {
    super(props);
  };

  sendToServ = (objToSend) => {
    setForm(objToSend).then((data) => {
        if (data.error) {
         console.log(data.error)
        } else {
          console.log(data)
        }
    });
  };

  render() {
    return <div>
      <ByForm />
      <AddControl onSend={this.sendToServ} />
    </div>
  }
}

export default AdminForm;
