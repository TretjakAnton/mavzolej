import { Tabs, Tab } from 'react-bootstrap'
import  React from 'react';
import Pam from './Pam';
import AdminMenu from './AdminMenu';
import Types from './Types';
import AdminForm from './form';

class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabValue: 1,
    }
  }
  handleSelect = (key) => {
    this.setState({ tabValue: key });
  }
  render() {
    const { tabValue } = this.state;
    return (
      <div id="content"  className="modal-container">
        <Tabs onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Pam">   { tabValue == 1 && <Pam /> }       </Tab>
          <Tab eventKey={2} title="Types"> { tabValue == 2 && <Types /> }     </Tab>
          <Tab eventKey={3} title="Menu">  { tabValue == 3 && <AdminMenu /> } </Tab>
          <Tab eventKey={4} title="Form">  { tabValue == 4 && <AdminForm /> } </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Admin;