import React from "react";
import Presenter from "./Presenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            id,
            posterPhoto,
            backgroundPhoto,
            title,
            voteAvg,
            overview,
            isMovie
          }
        }
      }
    } = props;
    this.state = {
      isMovie,
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading: true
    };
  }

  async componentDidMount() {
    const { isMovie, id } = this.state;
    let error, genres, overview, status, date, backgroundPhoto;
    try {
      if (isMovie) {
        ({
          data: {
            genres,
            overview,
            status,
            release_date: date,
            backdrop_path: backgroundPhoto
          }
        } = await moviesApi.movieDetail(id));
      } else {
        ({
          data: {
            genres,
            overview,
            status,
            first_air_date: date,
            backdrop_path: backgroundPhoto
          }
        } = await tvApi.showDetail(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
        genres,
        backgroundPhoto,
        overview,
        status,
        date
      });
    }
  }

  render() {
    const {
      isMovie,
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading,
      date,
      status,
      genres
    } = this.state;
    return (
      <Presenter
        id={id}
        posterPhoto={posterPhoto}
        backgroundPhoto={backgroundPhoto}
        title={title}
        voteAvg={voteAvg}
        overview={overview}
        loading={loading}
        date={date}
        status={status}
        isMovie={isMovie}
        genres={genres}
      />
    );
  }
}
