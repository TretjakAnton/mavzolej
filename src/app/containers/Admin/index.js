import { Tabs, Tab } from 'react-bootstrap';
//import Bootstra from 'react-bootstrap';
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
      <div>
        <div className='tab-names'>
          <ul>
            <li
              onClick={() => this.handleSelect(1)}
              className={tabValue == 1 ? 'active-tab': ''}
            >
              Памятники
            </li>
            <li
              onClick={() => this.handleSelect(2)}
              className={tabValue == 2 ? 'active-tab': ''}
            >
              Типы
            </li>
            <li
              onClick={() => this.handleSelect(3)}
              className={tabValue == 3 ? 'active-tab': ''}
            >
              Меню
            </li>
            <li
              onClick={() => this.handleSelect(4)}
              className={tabValue == 4 ? 'active-tab': ''}
            >
              Форма
            </li>
          </ul>
        </div>
        <div id="content"  className="modal-container">
          { tabValue == 1 && <Pam /> }
          { tabValue == 2 && <Types /> }
          { tabValue == 3 && <AdminMenu /> } 
          { tabValue == 4 && <AdminForm /> } 
        </div>
      </div>
    );
  }
}

export default Admin;