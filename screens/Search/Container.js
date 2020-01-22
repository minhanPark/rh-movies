import React from "react";
import Presenter from "./Presenter";
import { tvApi, moviesApi } from "../../api";

export default class extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null
  };

  handleSearchUpdate = text => {
    this.setState({ searchTerm: text });
  };

  onSubmitEditing = async () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      let movieResults, tvResults, error;
      this.setState({
        loading: true
      });
      try {
        ({
          data: { results: movieResults }
        } = await moviesApi.search(searchTerm));
        ({
          data: { results: tvResults }
        } = await tvApi.search(searchTerm));
      } catch {
        error = "Something Wrong :(";
      } finally {
        this.setState({
          loading: false,
          movieResults,
          tvResults,
          error
        });
      }
    }
    return;
  };

  render() {
    const { loading, movieResults, tvResults, searchTerm } = this.state;
    return (
      <Presenter
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        handleSearchUpdate={this.handleSearchUpdate}
        onSubmitEditing={this.onSubmitEditing}
      />
    );
  }
}
