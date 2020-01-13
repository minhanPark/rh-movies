import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Presenter = ({ loading, popular, topRated, airingToday }) =>
  loading ? <Loader /> : <Text>TV</Text>;

Presenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  airingToday: PropTypes.array
};

export default Presenter;
