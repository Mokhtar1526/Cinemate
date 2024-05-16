import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import {Card, Icon, IconButton, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import {addFavourite, removeFavourite} from '../redux/slices/favouritesSlice'
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Movie = ({id,title,poster_path,isFavorite}) => {
  const navigator = useNavigation();
  const [isLiked,setIsLiked] = useState(isFavorite?true:false);
  const [movieDetails,setMovieDetails] = useState(null)
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=9813ce01a72ca1bd2ae25f091898b1c7")
    .then((res)=>setMovieDetails(res.data))
  },[])
  const handleLikePress = ()=>{
    if(isLiked==false)
      dispatch(addFavourite({id,title,poster_path}))
    else
      dispatch(removeFavourite(id))
    setIsLiked(!isLiked);
  }
  if(movieDetails)
  return (
    <TouchableOpacity onPress={()=>{
      navigator.navigate("movieDetail",{movieId:id})
    }}>

      <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{uri: poster_path} } width={120} height={180} />
          <View style={styles.movieDetails}>
            <Text variant="titleSmall" style={{color:"white",paddingHorizontal:10}} >{title}</Text>
            <IconButton style={styles.icon} icon={"heart"} iconColor={isFavorite?"red":"grey"} onPress={handleLikePress}></IconButton>

              <Text style={{color:"white",padding:10,fontSize:10}}>
              <Icon source={movieDetails.status=="Released"?'check':'window-close'} size={10} color={movieDetails.status=="Released"?"green":"red"}  />
                {movieDetails.status} 
              </Text>
              <Text style={
                {
                  backgroundColor:movieDetails.vote_average>7?"green":"red"
                  ,width:50,
                  marginHorizontal:20,
                  borderRadius:15,
                  textAlign:"center"
                  }}>
                    {movieDetails.vote_average.toFixed(2)}
              </Text>
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    movieContainer:{
        margin:8,
        borderRadius:15,
        display:"flex",
        flexDirection:"row",
        borderBottomWidth:0.3,
        borderBottomColor:"red",
        paddingBottom:15,
    },
    icon:{
      position:"absolute",
      right:1,
      bottom:1
    },
    movieImage:{
      borderRadius:25,
      borderWidth:1,
      borderColor:"white"
    },
    movieDetails:{
      flex:1,
      paddingTop:10
    }
});

export default Movie;
