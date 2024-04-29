import React, { Component } from "react";
import Department from "./Department";

export class Office extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cbd279ed0e394d3d827224ea85c51751&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();

    this.setState({ articles: parsedData.articles });
  }

  handleNextClick = async ()=>{
   
   
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cbd279ed0e394d3d827224ea85c51751&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        page:this.state.page+1,
        articles: parsedData.articles,
        totalResults: parsedData.totalResults
      });
  }
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business
&apiKey=cbd279ed0e394d3d827224ea85c51751&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles
    });
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="container my-2">Office Top Healines</h2>
        <div className="row">
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
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
      </div>
    );
  }
}

export default Office;
