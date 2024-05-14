import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Movie from '../components/movie';

const Favourites = () => {
    const favourites = useSelector(state=>state.favourites.favourites)
    if(favourites.length>0)
    return (
        <FlatList
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
        style={{justifyContent:"center",alignItems:"center"}}
        >

        <Image source={require('../assets/no favourites.jpg')}></Image>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Favourites;
