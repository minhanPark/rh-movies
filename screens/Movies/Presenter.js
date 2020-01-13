import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Presenter = ({ loading, upcoming, popular, nowPlaying }) =>
  loading ? <Loader /> : <Text>Movies</Text>;

Presenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  nowPlaying: PropTypes.array
};

export default Presenter;
