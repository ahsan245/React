import React, { Component } from "react";
import Department from "./Department";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component"
export class Office extends Component {
  static defaultProps = {
    country: "pk",
    pageSize: 5,
    category: "business",

  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capatalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      setProgress: 10,
    };
    document.title = `${this.capatalizeFirstLetter(props.category)} - Badami`;
  }
  async updateNews() {
    const {  setProgress } = this.props;
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    setProgress(100);
  
  }

  async componentDidMount() {
    this.updateNews();
  }

fetchMoreData = async ()=>{
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    loading: false,
  });
  
}

  render() {
    return (
     <>
        <h2 className="container my-2">
          Office Top {this.capatalizeFirstLetter(this.props.category)} Healines
        </h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner />}
        >
        <div className="container">
        <div className="row overflow-hidden" >
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Department
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://readwrite.com/wp-content/uploads/2024/04/eaa08a84-02bf-4e04-af55-67efc1e88950.webp"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        </>
        
    );
  }
}

export default Office;
