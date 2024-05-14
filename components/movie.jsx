import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import {Card, IconButton, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import {addFavourite, removeFavourite} from '../redux/slices/favouritesSlice'
import { useNavigation } from "@react-navigation/native";
const Movie = ({id,title,poster_path,isFavorite}) => {
  
  const [isLiked,setIsLiked] = useState(isFavorite?true:false);
  const dispatch = useDispatch();
  const handleLikePress = ()=>{
    if(isLiked==false)
      dispatch(addFavourite({id,title,poster_path}))
    else
      dispatch(removeFavourite(id))
    setIsLiked(!isLiked);
  }
  return (
      <View style={styles.movieContainer}>
        <Card mode="contained" style={{backgroundColor:"#36454F"}}>
          <Card.Cover style={{borderTopStartRadius:15,borderTopEndRadius:15,borderBottomLeftRadius:0,borderBottomRightRadius:0}} source={{uri: poster_path} } width={"100%"} height={"100%"} />
          <Card.Content style={styles.cardContent}>
            <Text variant="titleMedium" style={{color:"white"}}>{title}</Text>
            <IconButton style={styles.icon} icon={"heart-multiple"} iconColor={isFavorite?"#black":"white"} onPress={handleLikePress}></IconButton>
          </Card.Content>
        </Card>
      </View>
  );
};

const styles = StyleSheet.create({
    movieContainer:{
        margin:8,
        // borderWidth:3,
        borderColor:"#FF6644",
        borderRadius:15
        
    },
    cardContent:{
      width:"100%",
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#FF6644",
      borderBottomLeftRadius:11,
      borderBottomRightRadius:11,

    },
    icon:{
      position:"absolute",
      right:8
    }
});

export default Movie;
