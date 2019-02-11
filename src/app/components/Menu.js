import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
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
        <Link to="/home">mavzolej-master</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        { meuItems }
      </Nav>
      <Nav pullRight>
        <LinkContainer key="111" to={`/aboutUs`}>
          <NavItem eventKey={2}>Контакты</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)};

const navDropdown = (obj) => {
  let itemToWrap = [];
  const wrap = (items) => <NavDropdown id={obj.name} key={`${obj.name}-${Math.random(10)}`} title={obj.name}>{items}</NavDropdown>;

  obj.items.map((element, key) => {
    itemToWrap.push(<LinkContainer key={element.id} to={`/monuments/${element.id}`}><MenuItem eventKey={key}>{element.id}</MenuItem></LinkContainer>);
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
    this.initData();
  }

  initData = () => {
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

          newItems.addItem({name: currEl.menu_name, id: currEl.type_name});

          if(next && next.menu_name !== currEl.menu_name) {
            menuData.push(newItems);
            newItems = new menuItems();
            newItems.setName(next.menu_name);
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
      if(elem.name == 'Главное'){
        elem.items.map((data, key) => {
          items.push(<LinkContainer key={data.id} to={`/monuments/${data.id}`}><NavItem eventKey={key}>{data.id}</NavItem></LinkContainer>)
        });
      } else {
        var prevName = this.state.data[topKey - 1] && this.state.data[topKey - 1].name || '';
        if(elem.name !== prevName){
          items.push(navDropdown(elem))
        }
      }
    });

    return navbarInstance(items);
  };

  render () {
    return this.state.data ? this.createMenu() : null;
  }

}

export default Menu;