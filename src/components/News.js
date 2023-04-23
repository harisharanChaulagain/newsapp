import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles:[],
            loading: false
        }
        
    }
   async componentDidMount(){
        let url = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=377ddd4488954a2db7adf59f9e6fd1b4&page=1pageSize=20"
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }

     handlePrevClick = async () =>{
        console.log("precious");
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=377ddd4488954a2db7adf59f9e6fd1b4&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles
        })
    }
     handleNextClick = async () =>{
        console.log("Next");
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=377ddd4488954a2db7adf59f9e6fd1b4&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page+1,
            articles: parsedData.articles
        })
    }

  render() {
    return (
      <div className="container my-3">
        <h2>News Nepal - Top Headlines</h2>
      
        <div className="row">
        {this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title.slice(0, 45)} description={ element.description.slice(0,90)}imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
            
        </div>
       
       <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
       </div>

      </div>
    )
  }
}

export default News