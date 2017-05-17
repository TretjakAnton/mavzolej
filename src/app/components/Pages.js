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
    getCountPams(this.props.type).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        const countPages = Math.round(data/this.props.countRows);
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
    for(var i=0; i<=this.state.countPages; i++){
      let page = i+1;
      pages.push(<Button key={i} onClick={(page) => this.changePage}>{page}</Button>)
    }
    this.setState({ DOMPages: pages });
  };

  render(){
    const prevPage = this.state.currentPage - 1;
    const nextPage = this.state.currentPage + 1;
    if(this.state.countPages > 1){
      return <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={(prevPage) => this.changePage} > {`<`} </Button>
                {this.state.DOMPages}
                <Button onClick={(nextPage) => this.changePage} > {`>`} </Button>
              </ButtonGroup>
            </ButtonToolbar>
    }
    return null;
  }
}