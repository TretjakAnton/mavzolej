import React from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import {
  getCountPams
} from '../api/newPam';

export default class Pages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage: null,
      countPages: null,
      error: null,
      DOMPages: null
    }
  }

  componentWillMount(){

  };

  componentWillReceiveProps = (newProps) => {
    getCountPams(newProps.type).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        const countPages = Math.ceil(data/newProps.countRows);
        this.setState({countPages: countPages});
        this.calculatePages()
      }
    });
  };

  changePage = (page) => {
    this.setState({currentPage: page});
    this.props.onChange(page);
  };

  calculatePages = () => {
    const pages = [];
    for(let i=1; i<=this.state.countPages; i++){
      pages.push(<Button key={i} onClick={() => this.changePage(i)}>{i}</Button>)
    }
    this.setState({ DOMPages: pages });
  };

  render(){
    const prevPage = this.state.currentPage - 1;
    const nextPage = this.state.currentPage + 1;
    if(this.state.countPages > 1){
      return <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={() => this.changePage(prevPage)} > {`<`} </Button>
                {this.state.DOMPages}
                <Button onClick={() => this.changePage(nextPage)} > {`>`} </Button>
              </ButtonGroup>
            </ButtonToolbar>
    }
    return null;
  }
}