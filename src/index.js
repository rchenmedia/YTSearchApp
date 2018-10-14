import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDDsKvwxgK9OnoeYA8TA7UOkS2vv_zxe6c';


class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
				});
			});
		}


	render() {
		//limits its triggering to every 300 milliseconds(throttling)
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

		return (
			<div className='container-fluid'>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
				  	videos={this.state.videos}/>
			</div>
			);
		}
	}

ReactDOM.render(<App />, document.getElementById('root'));
