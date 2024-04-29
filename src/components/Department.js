import React, { Component } from 'react'

export class Department extends Component {
 

  render() {
    let { title, description,imageUrl,newsUrl , author ,publishedAt,source } = this.props;
    return (
      <div className="container my-4">
        <div className="card">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'} }>{source}
            <span className="visually-hidden">unread messages</span>
            </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()} </small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">
            Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Department
