import React from 'react';

class OmdbRow extends React.Component {
  render() {
    return(
      <table className="tableRow" key={this.props.movie.imdbID}>
        <tbody>
          <tr>
            <td><img alt="movie img" width="185" height="278" src={this.props.movie.Poster}/></td>
            <td className="movieContent">
              {this.props.movie.Title}
              <p>{this.props.movie.Plot}</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default OmdbRow;
