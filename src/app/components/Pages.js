import React from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import {
  getCountPams
} from '../api/newPam';

export default class Pages extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      currentPage: props.currentPage,
      countPages: null,
      error: null
    }
    this.initPages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id_type !== prevProps.id_type) {
      this.initPages();
    }
  }

  initPages = () => {
    getCountPams(this.props.type).then((data) => {
      if(data.error){
        this.setState({error: data.error})
      } else {
        const countPages = Math.ceil(data.length/this.props.countRows);
        this.setState({
          countPages: countPages
        });
      }
    });
  }

  changePage = (page) => {
    if(page && page <= this.state.countPages){
      window.history.pushState('', `page ${page}`, `${window.location.pathname}?page=${page}`);
      this.setState({currentPage: page});
      this.props.onChange(page);
    }
  };

  calculatePages = () => {
    const {currentPage, countPages} = this.state;
    const pages = [];
    for(let i=1; i <= countPages; i++){
      if(currentPage === i) {
        pages.push(<Button key={i} onClick={() => this.changePage(i)}><b>{i}</b></Button>)
      } else {
        pages.push(<Button key={i} onClick={() => this.changePage(i)}>{i}</Button>)
      }
    }
    return pages;
  };

  render(){
    const {currentPage, countPages} = this.state;
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    if(countPages > 1){
      return (
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={() => this.changePage(prevPage)} > {`<`} </Button>
              {this.calculatePages()}
            <Button onClick={() => this.changePage(nextPage)} > {`>`} </Button>
          </ButtonGroup>
        </ButtonToolbar>
      )
    }
    return null;
  }
}