import React from 'react';
import { getPam, deletePam } from '../../api/newPam';
import ImageLoader from 'react-imageloader';

export default class AdminPrEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      types: this.props.types,
      curr_type: this.props.types[0],
      page: 1,
      countRows: 10,
      pams: null,
      error: null
    }
  }

  componentWillMount(){
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
      <thead>
        <tr>
          <th>image</th>
          <th>id</th>
          <th>price</th>
          <th>control</th>
        </tr>
      </thead>
    );
    this.state.pams.map((val, key) => {
      var imgUrl = this.state.curr_type.folder + val.image;
      body.push(
        <tr key={key}>
          <td><img src={'../../../media/'+imgUrl} style={imgStyle}/></td>
          <td>{val.id_pam}</td>
          <td>{val.price}</td>
          <td>
            <button>edit</button>
            <button onClick={() => deletePam(val.id_img, val.id_prod, imgUrl)}>delete</button>
          </td>
        </tr>
      )
    });

    return (<table>{head.concat(<tbody>{body}</tbody>)}</table>);
  };

  render(){
    return <div>
      <select name="curr_type" value={this.state.curr_type} onChange={this.typeConrol}>
        {
          this.state.types.map((val, key) => {
            return <option key={key} value={val}>{val.name}</option>;
          })
        }
      </select>
      {this.state.pams &&
          this.pamsDom()
      }
    </div>
  }
}