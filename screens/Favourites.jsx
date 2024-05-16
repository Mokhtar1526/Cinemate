import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Movie from '../components/movie';
import { Icon } from 'react-native-paper';

const Favourites = () => {
    const favourites = useSelector(state=>state.favourites.favourites)
    if(favourites.length>0)
    return (
        <FlatList
        style={{backgroundColor:"#1a1b1c",padding:15}}
        data={favourites}
        renderItem={({item}) => (
          <Movie
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={"https://image.tmdb.org/t/p/w500" + item.poster_path}
            isFavorite={true}
          ></Movie>
        )}
        keyExtractor={(movie)=>movie.id}
      ></FlatList>
    );
    // {console.warn("No Favourites")}
    return(
        <View
        style={styles.container}
        >
          <View style={{backgroundColor:"grey",width:200,height:230,borderRadius:30,justifyContent:"center",alignItems:"center"}}>
            <Icon source={"star-box"} size={150} ></Icon>
            <Text>No Favorites</Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#1a1b1c",
    justifyContent:"center",
    alignItems:"center"
  }
})

export default Favourites;
