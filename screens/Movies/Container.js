import React, { Component } from "react";
import Presenter from "./Presenter";
import { moviesApi } from "../../api";

export default class extends Component {
  state = {
    loading: true,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null
  };

  async componentDidMount() {
    let upcoming, popular, nowPlaying, error;
    try {
      ({
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying());
      ({
        data: { results: upcoming }
      } = await moviesApi.upcoming());
      ({
        data: { results: popular }
      } = await moviesApi.popular());
    } catch (error) {
      error = "Something wrong :(";
    } finally {
      this.setState({ loading: false, upcoming, popular, nowPlaying, error });
    }
  }

  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state;
    return (
      <Presenter
        loading={loading}
        upcoming={upcoming}
        popular={popular}
        nowPlaying={nowPlaying}
      />
    );
  }
}
