import React, { Component } from 'react'
import { getYouTubeByQ, getYouTubeByQAndToken, getVimeoByQ, getVimeoByPageNumber } from './services/apiServices'
import List from './components/List/List'
import Search from './components/Search/Search'
import LoadMore from './components/LoadMore/LoadMore'
import Loader from './components/Loader/Loader'

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
    allItems: [],
    searchParam: '',
    isLoadingYouTube: false,
    isLoadingVimeo: false
  }

  loadYouTubeData = async () => {
    const { searchParam } = this.state
    this.setState({ isLoadingYouTube: true })
    const data = await getYouTubeByQ(searchParam)
    this.setState({
      youTubeData: data,
      isLoadingYouTube: false
    })
  }

  loadVimeoData = async () => {
    const { searchParam } = this.state
    this.setState({ isLoadingVimeo: true })
    const data = await getVimeoByQ(searchParam)
    this.setState({
      vimeoData: data,
      isLoadingVimeo: false
    })
  }

  loadMoreYouTubeData = async () => {
    const { searchParam, youTubeData } = this.state
    this.setState({ isLoadingYouTube: true })
    const data = await getYouTubeByQAndToken(searchParam, youTubeData.nextPageToken)
    if (!data)  { this.setState({ youTubeData: {isLoadingYouTube: false}})}
    else {
      this.setState({
        youTubeData: {
          items: [...youTubeData.items, ...data.items],
          nextPageToken: data.nextPageToken,
        },
        isLoadingYouTube: false
      })
    }
  }
  
  loadMoreVimeoData = async () => {
    const { searchParam, vimeoData } = this.state
    this.setState({ isLoadingVimeo: true })
    const data = await getVimeoByPageNumber(searchParam, vimeoData.nextPageToken)
    if(!data) { this.setState({vimeoData: {isLoadingVimeo: false}})}
    else {
      this.setState({
        vimeoData: {
          items: [...vimeoData.items, ...data.items],
          nextPageToken: data.nextPageToken,
        },
        isLoadingVimeo: false
      })
    }
  }
 
  componentDidMount() {
    this.loadData()
  }

  loadData = async() => {
    await this.loadYouTubeData()
    await this.loadVimeoData()
    this.mergeData()
  }

  setSearchParam = async (searchParam) => {
    this.setState({
      searchParam
    })
  }

  loadMoreData = async () => { 
    if (this.state.vimeoData.nextPageToken) {await this.loadMoreVimeoData()};
    if (this.state.youTubeData.nextPageToken) {await this.loadMoreYouTubeData()};
    this.mergeData()
  } 

  mergeData = () => {
    const { youTubeData, vimeoData, isLoadingYouTube, isLoadingVimeo } = this.state
    let data = []
        if(!isLoadingYouTube && !isLoadingVimeo) {
            for(let i = 0; i < youTubeData.items.length; i++) {
                if(vimeoData.items[i]) data.push({...vimeoData.items[i], type: 'vd'})
                if(youTubeData.items[i]) data.push({...youTubeData.items[i], type: 'yt'})
            }
        }
    this.setState({
      allItems: data
    })
  }
  render() {
    const { youTubeData, vimeoData, isLoadingYouTube, isLoadingVimeo, allItems, searchParam } = this.state
    return (
      <div className="app">
        <Search setSearchParam={this.setSearchParam} searchParam={searchParam} loadData={this.loadData}/>
        {!youTubeData.items.length || !vimeoData.items.length  ? null : <List allItems={allItems} isLoadingYouTube={isLoadingYouTube} isLoadingVimeo={isLoadingVimeo}/>}
        { isLoadingYouTube || isLoadingVimeo ? <Loader/> : null }
        <LoadMore loadMoreData={this.loadMoreData} />
      </div>
    )
  }
}

