import React from "react"
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite';

class BodySection extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className={css(styles.bodySection)}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  bodySection: {
    marginLeft: '50px',
    marginRight: '50px'
  }
})

export default BodySection
