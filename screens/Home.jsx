import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Movie from "../components/movie";
import axios from "axios";
import { Button, Divider, Menu, PaperProvider, TextInput } from "react-native-paper";
import { Avatar, CheckBox, Dialog, Icon, ListItem } from "@rneui/themed";
import { useSelector } from "react-redux";

const Home = () => {
  const favs = useSelector(state=>state.favourites.favourites)
  const [movies, setMovies] = useState([]);
  const [text, setText] = React.useState("");
  const [searchMovies, setSearchMovies] = useState(movies);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=9813ce01a72ca1bd2ae25f091898b1c7"
      )
      .then((res) => {
        setMovies(res.data.results);
        setSearchMovies(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (text === "") {
      setSearchMovies(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchMovies(filteredMovies);
    }
  }, [text]);


  const handleNowPlayingFilter = ()=>{
    axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3&api_key=9813ce01a72ca1bd2ae25f091898b1c7").then(
      (res) => {
        setMovies(res.data.results)
        setSearchMovies(res.data.results)
      }
    )
  }

  const handlePopularFilter = ()=>{
    axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=9813ce01a72ca1bd2ae25f091898b1c7").then(
      (res) => {
        setMovies(res.data.results)
        setSearchMovies(res.data.results)
      }
    )
  }

  const handleAllMovies = ()=>{
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=9813ce01a72ca1bd2ae25f091898b1c7").then(
      (res) => {
        setMovies(res.data.results)
        setSearchMovies(res.data.results)
      }
    )
  }
  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          outlineColor="#FF4433"
          activeOutlineColor="#FF4433"
          textColor="#FF4433"
          placeholderTextColor="#FF4433"
          style={styles.textInput}
          mode="outlined"
          placeholder="Enter Movie Title"
          label="Enter Movie Title"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button buttonColor="#FF4433" mode="contained" onPress={openMenu}>Filter</Button>}
      >
        <Menu.Item onPress={() => {
          handleAllMovies();
          setVisible(false)
        }} title="All Movies" />
        <Menu.Item onPress={() => {
          handleNowPlayingFilter()
          setVisible(false)
        }} title="Now Playing" />
        <Menu.Item onPress={() => {
          handlePopularFilter()
          setVisible(false)
        }} title="Popular" />

        
      </Menu>
      
      </View>

      <FlatList
        style={styles.list}
        data={searchMovies}
        renderItem={({ item }) =>{
          // console.log(favs.find((movie)=>movie.id==item.id));
          return(
          <Movie
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={"https://image.tmdb.org/t/p/w500" + item.poster_path}
            isFavorite={favs.find((movie)=>movie.id==item.id)?true:false}
          ></Movie>
          
        )}}
        keyExtractor={(movie) => movie.id}
      ></FlatList>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "70%",
    backgroundColor:"#0E0C0A",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0E0C0A",
    gap:5,
    paddingVertical:30
  },
  list:{
    backgroundColor:"#0E0C0A",
    paddingHorizontal:20,
    paddingVertical:30
  }
});

export default Home;
