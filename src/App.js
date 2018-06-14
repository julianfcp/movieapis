import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery';

class App extends Component {
// Movie DB api Search Movie: https://api.themoviedb.org/3/search/movie?query=marvel&api_key=7600d69fad4c78edddf4575ce437ea4a

  constructor (props) {
    super(props)
    // console.log("This is my initializer");
    // const movies = [
    //   {id: 0, poster_url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg", title: "Deadpool", overview: "this is an overview"},
    //   {id: 1, poster_url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "The Avangers", overview: "this is the second overview"}
    // ];
    //
    // var moviesRows = [];
    //
    // movies.forEach((movie) => {
    //   console.log(movie.id)
    //   const movieRow = <MovieRow key={movie.id} movie={movie}/>
    //   moviesRows.push(movieRow)
    // })
    // this.state = {rows: moviesRows}
    this.state = {selectOption: 'Moviedb'};
    //this.performSearch("");
  }
  performSearchMoviedb(searchTerm) {
    console.log("Perform Search using movie db");
    const urlString = "https://api.themoviedb.org/3/search/movie?query="+ searchTerm +"&api_key=7600d69fad4c78edddf4575ce437ea4a"
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
        const results = searchResults.results; // guardo el json de resultados
        var movieRows = [];
        results.forEach((movie) => { // recorro el json de respuesta
          console.log(movie.title);//imprimo los titulos en la consola
          const movieRow = <MovieRow key={movie.id} movie={movie} /> // creo las filas
          movieRows.push(movieRow); // guardo la respuesta en el array
        })
        this.setState({rows: movieRows}); // guardo el array en el State

      },
      error:  (xhr, status, err) => {
        console.log("Failed to fetch data");
      }
    });
  }

  performSearchOmdb(searchTerm) {
    console.log("Search OMDB");
    const urlString = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=80b38af7";
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
        const results = searchResults; // guardo el json de resultados
        console.log(results.Title);//imprimo los titulos en la consola
        var movieRowOMDB = <table><tr><td>{results.Title}</td><td><img src={results.Poster} /></td></tr></table>;
        this.setState({rowsOMDb: movieRowOMDB})
      },
      error:  (xhr, status, err) => {
        console.log("Failed to fetch data");
      }
    });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const searchTerm = event.target.value;
    switch (this.state.selectOption) {
      case "Moviedb":
        this.performSearchMoviedb(searchTerm);
        break;
      case "OMDb":
        this.performSearchOmdb(searchTerm);
        break;
      default:

    }
    /*
    if(this.state.selectOption === "Moviedb"){
      this.performSearchMoviedb(searchTerm); // se debe enlazar la funcion onChange con la funcion performSearch con bind(this)
    }
    if(this.state.selectOption === "OMDb"){
      this.performSearchMoviedb(searchTerm); // se debe enlazar la funcion onChange con la funcion performSearch con bind(this)
    }*/

  }

  handleSelectChange(event){
    console.log(event.target.value);
    this.setState({selectOption: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td><img alt="app icon" width="50" src="img/moviedb.png" /></td>
              <td width="8"></td>
              <td><h1>Movies DB Search</h1></td>
            </tr>
          </tbody>
        </table>
        <select className="selectApi" name="movie_api" onChange={this.handleSelectChange.bind(this)}>
          <option value="Moviedb">MovieDB</option>
          <option value="OMDb">OMDb</option>
        </select>
        <input onChange={this.searchChangeHandler.bind(this)} className="inputText" type="text" placeholder="Enter text"/>

        {this.state.rows}
        {this.state.rowsOMDb}

      </div>

    );
  }
}

export default App;
