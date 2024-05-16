import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Menu, Provider, TextInput } from "react-native-paper";
import axios from "axios";
import Movie from "../components/movie";
import { useSelector } from "react-redux";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const favorites = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    fetchData("https://api.themoviedb.org/3/discover/movie?api_key=9813ce01a72ca1bd2ae25f091898b1c7", setMovies);
    fetchData("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3&api_key=9813ce01a72ca1bd2ae25f091898b1c7", setNowPlayingMovies);
    fetchData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=9813ce01a72ca1bd2ae25f091898b1c7", setPopularMovies);
    fetchData("https://api.themoviedb.org/3/discover/movie?api_key=9813ce01a72ca1bd2ae25f091898b1c7", setAllMovies);
  }, []);

  useEffect(() => {
    if (!searchText) {
      setSearchMovies(movies);
    } else {
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchMovies(filteredMovies);
    }
  }, [searchText, movies]);

  const fetchData = (url, setter) => {
    axios.get(url)
      .then((res) => setter(res.data.results))
      .catch(error => console.error("Error fetching data: ", error));
  };

  const handleFilter = (moviesList) => {
    setSearchMovies(moviesList);
    setMovies(moviesList);
    setVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
        outlineColor="red"
        activeOutlineColor="red"
        textColor="red"
        placeholderTextColor="red"
          style={styles.textInput}
          mode="outlined"
          placeholder="Enter Movie Title"
          label="Enter Movie Title"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Button style={styles.filterBtn} mode="contained" buttonColor="red" onPress={() => setVisible(true)}>Filter</Button>}
        >
          <Menu.Item onPress={() => handleFilter(allMovies)} title="All Movies" />
          <Menu.Item onPress={() => handleFilter(nowPlayingMovies)} title="Now Playing" />
          <Menu.Item onPress={() => handleFilter(popularMovies)} title="Popular" />
        </Menu>
      </View>
      <FlatList
        style={styles.list}
        data={searchMovies}
        renderItem={({ item }) => (
          <Movie
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            isFavorite={favorites.some(movie => movie.id === item.id)}
          />
        )}
        keyExtractor={movie => movie.id.toString()}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  filterBtn:{
    marginTop:8,
  },
  textInput: {
    width: "70%",
    height:40,
    backgroundColor:"#1a1b1c",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#1a1b1c",
    gap:5,
    paddingVertical:15
  },
  list:{
    backgroundColor:"#1a1b1c",
    paddingHorizontal:20,
  }
});


export default Home;
