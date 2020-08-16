import React, { Component } from 'react';

import {
  Modal,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Button from '../buttons/Button';
import ListItem from '../list/ListItem';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      yOffset: 0,
      defaultIndex: props.defaultIndex,
    };
  }

  toggleVisible = () => this.setState(({ visible }) => ({ visible: !visible }));

  handleLayoutChange = () => {
    this.modalContainer.measure((fx, fy, width, height, px, py) => {
      this.setState({ yOffset: py });
    });
  };

  onItemClick = (defaultIndex) => {
    this.setState({ defaultIndex });
    this.toggleVisible();
  };

  createListItemProps = (index, item) => {
    const { defaultIndex } = this.state;
    let obj = {
      ...item,
      onPress: () => this.onItemClick(index),
      ...(defaultIndex >= 0 &&
        index === defaultIndex && { rightIcon: { name: 'check' } }),
    };
    return obj;
  };

  render() {
    const { visible, yOffset, defaultIndex } = this.state;
    const { defaultValue, options, disabled } = this.props;

    const buttonTitle =
      (defaultIndex >= 0 && options[defaultIndex].title) || defaultValue;
    return (
      <View
        onLayout={(event) => {
          this.handleLayoutChange(event);
        }}
        ref={(view) => {
          this.modalContainer = view;
        }}
      >
        <Button
          title={buttonTitle}
          onPress={this.toggleVisible}
          disabled={disabled || !options.length}
        />
        <Modal visible={visible} transparent={true}>
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.modalView}>
              <View
                style={
                  ([styles.listContainer],
                  { maxHeight: 300, marginTop: yOffset })
                }
              >
                <ScrollView>
                  {options.map((item, i) => (
                    <ListItem key={i} {...this.createListItemProps(i, item)} />
                  ))}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  modalView: {
    flex: 1,
  },
  listContainer: { backgroundColor: 'white' },
});

Dropdown.propTypes = {
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  disable: PropTypes.bool,
  defaultIndex: PropTypes.number,
};

Dropdown.defaultProps = {
  defaultValue: 'Please select a value',
  options: [],
  disable: false,
  defaultIndex: -1,
};

export default Dropdown;
