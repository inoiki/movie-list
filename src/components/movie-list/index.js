import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      selectedYear: null,
      result: []
    };
  }

  onYearChange = (e) => {
    this.setState({selectedYear: e.target.value});
  }

  onSearchClick = () => {
    if (this.state.selectedYear) {
      fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${this.state.selectedYear}`)
        .then((response) => response.json())
        .then(result => this.setState({
          result: result.data
        }))
    }
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" onBlur={this.onYearChange}/>
          <button className="" data-testid="submit-button" onClick={this.onSearchClick}>Search</button>
        </section>

        {this.state.selectedYear && this.state.result.length > 0 && 
          <ul className="mt-50 styled" data-testid="movieList">
            {this.state.result.map((resp, index) => {
              return (
                <li className="slide-up-fade-in py-10" key={index + 1}>{resp.Title}</li>
              );
            })}
          </ul>
        }
        
        {this.state.selectedYear && this.state.result.length === 0 && 
          <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Movies found</div>
        }
      </div>
    );
  }
}