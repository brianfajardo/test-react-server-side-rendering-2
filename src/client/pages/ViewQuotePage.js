import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { decode } from 'he'
import { deleteEntry } from '../actions'

const propTypes = {
  quote: PropTypes.object,
  deleteEntry: PropTypes.func,
}

const ViewQuotePage = ({ quote, deleteEntry }) => (
  <div className="clearfix">
    <Link
      to="/"
      href="/"
      className="btn right"
      onClick={() => deleteEntry(quote.id)}
    >
      Delete
    </Link>
    {/* Quote block */}
    <div>
      <p className="ml1 mb0">ID: {quote.id}</p>
      <p className="ml1 mt0">Categories: {quote.categories.join(' ') || 'not found'}</p>
      <h2 className="center regular italic">{`"${decode(quote.joke)}"`}</h2>
    </div>
    <Link to="/" href="/" className="btn right">Back</Link>
  </div>
)

ViewQuotePage.propTypes = propTypes

const mapStateToProps = (state, ownProps) => {
  // Filter the array of jokes to return the joke whose
  // id matches the id in the URL param (StaticRouter).
  // joke id found in array is of type number,
  // joke id found in URL params is of type string,
  // using loose equality (==) should be okay here :)
  const quote = state.data.filter(({ id }) => id == ownProps.match.params.id)[0]

  return { quote }
}

export default connect(mapStateToProps, { deleteEntry })(ViewQuotePage)
