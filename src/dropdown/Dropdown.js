import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Button } from '../buttons/Button';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = { visible: false };
  }

  toggleVisible = () => this.setState(({ visible }) => ({ visible: !visible }));

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button title="DropDown" onPress={this.toggleVisible} />
        <Modal visible={visible} />
      </>
    );
  }
}

export default Dropdown;
