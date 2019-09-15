import React, { Component } from 'react'
import List from './components/List/List'
import Search from './components/Search/Search'
import Loader from './components/Loader/Loader'
import { connect } from 'react-redux'



class App extends Component {
 
  render() {
    return (
      <div className="app">
        <Search />
        <List />
        { this.props.isLoading ? <Loader/> : null }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading
}) 
export default connect(mapStateToProps)(App)

