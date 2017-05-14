import React from 'react';
import { FormControl } from 'react-bootstrap';

class Selection extends React.Component {
  render() {
    const items = this.props.items;
    return (
      <FormControl componentClass="select">
        {
          items.map((item) => {
            return (<option key={item.id_field + Math.random()}
                            value={item.price}>{item.description}, {item.price}</option>);
          })
        }
      </FormControl>
    )
  }
}

export default Selection;