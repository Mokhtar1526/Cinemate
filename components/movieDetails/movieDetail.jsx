import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import OpenYouTubeButton from './openUtube';
import { ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

const MovieDetail = () => {
    const id = useRoute().params.movieId;
    console.log(id);
    const [movie,setMovie]= useState(null)
    const [movieVideo,setMovieVideo] = useState(null)
    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=9813ce01a72ca1bd2ae25f091898b1c7")
        .then((res)=>{setMovie(res.data)})
        axios.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=9813ce01a72ca1bd2ae25f091898b1c7")
        .then((res)=>{setMovieVideo(res.data)})
    },[])
    if(movie&&movieVideo)
    return (
<>
        <ImageBackground source={{uri:"https://image.tmdb.org/t/p/w500/"+movie.poster_path}} style={{width:"100%",height:"100%",position:"absolute",top:0,left:0}} >
        <View style={{ flex:1,backgroundColor:"rgba(0,0,0,0.85)"}}>
            {/* Other content */}
        </View>
    </ImageBackground>
    <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,alignItems:"center"}}>
        <Text  style={{height:90,paddingHorizontal:5,color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center",textTransform:"uppercase",borderWidth:2,borderColor:"red",borderRadius:15,textAlignVertical:"center"}}>{movie.title}</Text>
        <Text style={{color:"#fff",fontSize:15,paddingTop:20,paddingHorizontal:20,textAlign:"left"}}>{movie.overview}</Text>

    </View>
</>
    );
}

const styles = StyleSheet.create({
})

export default MovieDetail;
