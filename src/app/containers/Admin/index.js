import { Tabs, Tab } from 'react-bootstrap'
import  React from 'react';
import Pam from './Pam';
import AdminMenu from './AdminMenu';
import Types from './Types';
import AdminForm from './form';

class Admin extends React.Component {
  render() {
    return <div id="content">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Pam"><Pam /></Tab>
        <Tab eventKey={2} title="Types"><Types /></Tab>
        <Tab eventKey={3} title="Menu"><AdminMenu /></Tab>
        <Tab eventKey={4} title="Form"><AdminForm /></Tab>
      </Tabs>
    </div>
  }
}

export default Admin;