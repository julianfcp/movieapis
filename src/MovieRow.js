import React from 'react';

class MovieRow extends React.Component {
  render() {
    return(
      <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td><img alt="movie img" src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+this.props.movie.poster_path}/></td>
            <td>
              {this.props.movie.title}
              <p>{this.props.movie.overview}</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MovieRow;
