import React from 'react';
import { Link } from 'react-router';
import { getAllTypes } from '../api/Types';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

const navbarInstance = (meuItems) => {return (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        { meuItems }
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Link Right</NavItem>
        <NavItem eventKey={2} href="#">Link Right</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)};

const navDropdown = (obj) => {
  let itemToWrap = [];
  const wrap = (items) => <NavDropdown id={obj.name} key={obj.name} title={obj.name}>{items}</NavDropdown>;

  obj.items.map((element, key) => {
    itemToWrap.push(<MenuItem key={key} eventKey={key}><Link to={`/monuments/${element.id}`}>{element.name}</Link></MenuItem>);
  });

  return wrap(itemToWrap);
};

class menuItems {
  constructor (){
    this.name = '';
    this.items = [];
    this.length = null;
  }

  setName = (name) => {
    this.name = name;
  };

  addItem = (item) => {
    this.items.push(item);
  };
}

class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  componentWillMount = () => {
    getAllTypes().then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        let newItems = new menuItems();
        newItems.setName(data[0].menu_name);
        let menuData = [];

        for(let i = 0; i < data.length; i++){
          const currEl = data[i];
          const next = data[i+1];

          newItems.addItem({name: currEl.name, id: currEl.id_type});

          if(next) {
            if(next !== currEl){
              menuData.push(newItems);
              newItems = new menuItems();
              newItems.setName(next.menu_name);
            }
          } else {
            menuData.push(newItems);
          }
        }

        this.setState({data: menuData})
      }
    })
  };

  createMenu = () => {
    let items = [];

    this.state.data.map((elem, topKey) => {
      if(elem.name == 'Главное меню'){
        elem.items.map((data, key) => {
          items.push(<NavItem key={topKey} eventKey={key}><Link key={topKey} to={`/monuments/${data.id}`}>{data.name}</Link></NavItem>)
        });
      } else {
        items.push(navDropdown(elem))
      }
    });

    return navbarInstance(items);
  };

  render () {
    return this.state.data ? this.createMenu() : null;
  }

}

export default Menu;