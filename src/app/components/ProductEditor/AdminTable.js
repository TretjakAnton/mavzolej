import React, {PureComponent} from 'react';
import ImageControl from '../ImageControl';
import {
  Table
} from 'react-bootstrap';

export default class AdminTable extends PureComponent {
    render() {
        var body = [];
        var head = [];
        head.push(
          <thead key='8'>
            <tr key='7'>
              <th key='1'>image</th>
              <th key='2'>id</th>
              <th key='3'>price</th>
              <th key='4'>description</th>
              <th key='5'>control</th>
            </tr>
          </thead>
        );
        this.props.pams.map((val) => {
          body.push(
            <tr key={val.id_pam + "01"}>
              <td key={val.id_pam + "5"}>
                <ImageControl
                  images={val.images}
                  previewFolder={'../../media/images' + this.props.folder}
                />
              </td>
              <td key={val.id_pam + "1"}>{val.id_pam}</td>
              <td key={val.id_pam + "2"}>{val.price}</td>
              <td className="description" key={val.id_pam + "3"}>
                {val.description}
              </td>
              <td key={val.id_pam + "4"}>
                <button onClick={() => this.props.setToEdit(val)}>edit</button>
                <button onClick={() => this.props.setToDelete(val)}>delete</button>
              </td>
            </tr>
          )
        });
    
        return (<Table responsive className="monum-table">{head.concat(<tbody key="123">{body}</tbody>)}</Table>);
    }
}