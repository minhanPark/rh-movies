import React, { Component } from "react";
import Presenter from "./Presenter";
import { tvApi } from "../../api";

export default class extends Component {
  state = {
    loading: true,
    popular: null,
    topRated: null,
    airingToday: null,
    error: null
  };

  async componentDidMount() {
    let popular, topRated, airingToday, error;
    try {
      ({
        data: { results: popular }
      } = await tvApi.popular());
      ({
        data: { results: topRated }
      } = await tvApi.topRated());
      ({
        data: { results: airingToday }
      } = await tvApi.airingToday());
    } catch (error) {
      error = "Something Wrong :(";
    } finally {
      this.setState({ loading: false, popular, topRated, airingToday, error });
    }
  }

  render() {
    const { loading, popular, topRated, airingToday } = this.state;
    return (
      <Presenter
        loading={loading}
        popular={popular}
        topRated={topRated}
        airingToday={airingToday}
      />
    );
  }
}
