import React from 'react';
import {
  Table,
  FormControl
} from 'react-bootstrap';
import {
  getPam,
  deletePam
} from '../../api/newPam';
import Pages from '../Pages';

export default class AdminPrEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      types: this.props.types,
      curr_type: this.props.types[0],
      page: 1,
      countRows: 10,
      pams: null,
      error: null,
      DOMPages: null
    }
  }

  componentWillMount(){
    this.getInfoForPage(null, this.state.curr_type.id_type);
  };

  changePage = (page) => {
    this.setState({page: page});
    this.getInfoForPage(null, this.state.curr_type.id_type);
  };

  calcRange = () => {
    return (this.state.page - 1) * this.state.countRows;
  };

  typeConrol = (event) => {
    this.setState({curr_type: event.target.value});
    this.getInfoForPage(null, event.target.value.id_type);
  };

  getInfoForPage = (id_prod, id_type) => {
    getPam(id_prod, id_type, this.calcRange(), this.state.countRows).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({pams: data})
      }
    });
  };

  pamsDom = () => {
    var imgStyle = {
      height: "110px"
    };
    var body = [];
    var head = [];
    head.push(
      <thead key='8'>
        <tr key='7'>
          <th key='1'>image</th>
          <th key='2'>id</th>
          <th key='3'>price</th>
          <th key='4'>control</th>
        </tr>
      </thead>
    );
    this.state.pams.map((val, key) => {
      var imgUrl = this.state.curr_type.folder + val.image;
      body.push(
        <tr key={key}>
          <td key={key + Math.random()}><img src={'../../../media/'+imgUrl} style={imgStyle}/></td>
          <td key={key + Math.random()}>{val.id_pam}</td>
          <td key={key + Math.random()}>{val.price}</td>
          <td key={key + Math.random()}>
            <button onClick={() => deletePam(val.id_img, val.id_prod, imgUrl)}>delete</button>
          </td>
        </tr>
      )
    });

    return (<Table responsive>{head.concat(<tbody key="123">{body}</tbody>)}</Table>);
  };

  render(){
    return <div>
      <FormControl componentClass="select" name="curr_type" value={this.state.curr_type} onChange={this.typeConrol}>
        {
          this.state.types.map((val, key) => {
            return <option key={key} value={val}>{val.name}</option>;
          })
        }
      </FormControl>
      {this.state.pams &&
          this.pamsDom()
      }
      <Pages
        countRows={this.state.countRows}
        type={this.state.curr_type.id_type}
        onChange={this.changePage}
      />
    </div>
  }
}