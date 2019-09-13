import React, { Component } from 'react'
import { getYouTubeByQ, getYouTubeByQAndToken } from './services/apiServices'
import List from './components/List/List'
import Search from './components/Search/Search'
import LoadMore from './components/LoadMore/LoadMore'

export default class App extends Component {
  state = {
    youTubeData: {
      items: [],
      nextPageToken: ''
    },
    vimeoData: {
      items: [],
      nextPageToken: ''
    },
    searchParam: ''
  }

  loadYouTubeData = async () => {
    const { searchParam } = this.state
    const data = await getYouTubeByQ(searchParam)
    this.setState({
      youTubeData: data
    })
  }

  loadMoreYouTubeData = async () => {
    const { searchParam, youTubeData } = this.state
    const data = await getYouTubeByQAndToken(searchParam, youTubeData.nextPageToken )
    this.setState({
      youTubeData: {
        items: [...youTubeData.items, ...data.items],
        nextPageToken: data.nextPageToken
      }
    })
  }


  componentDidMount() {
    this.loadYouTubeData()
  }

  setSearchParam = async (searchParam) => {
    this.setState({
      searchParam
    })
  }

  render() {
    const { youTubeData } = this.state
    return (
      <div>
        <Search setSearchParam={this.setSearchParam} searchParam={this.searchParam} loadYouTubeData={this.loadYouTubeData}/>
        <List data={youTubeData}/>
        <LoadMore loadMoreYouTubeData={this.loadMoreYouTubeData}/>
      </div>
    )
  }
}

