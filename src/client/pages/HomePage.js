import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchJokes } from '../actions'
import filterSort from '../selectors/filterSort'

import Search from '../components/Search'
import CreateEntry from '../components/CreateEntry'
import Table from '../components/Table'

class HomePage extends Component {

  static propTypes = {
    data: PropTypes.array,
    fetchJokes: PropTypes.func,
  }

  componentDidMount() {
    // hacky
    if (this.props.data) return
    this.props.fetchJokes()
  }

  render() {
    return (
      <div>
        <Search options={['id', 'joke', 'categories']} />
        <CreateEntry />
        <Table data={this.props.data} />
      </div>
    )
  }
}

const mapStateToProps = ({ data, filters }) => ({
  data: filterSort(data, filters),
})

export default {
  component: connect(mapStateToProps, { fetchJokes })(HomePage),
  initData: store => store.dispatch(fetchJokes()),
}
