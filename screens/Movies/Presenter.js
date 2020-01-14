import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components/native";
import MovieSlider from "../../components/MovieSlider";
import { BG_COLOR } from "../../constants/Color";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
`;

const Presenter = ({ loading, upcoming, popular, nowPlaying }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <MovieSlider movies={nowPlaying} />
    </Container>
  );

Presenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  nowPlaying: PropTypes.array
};

export default Presenter;
