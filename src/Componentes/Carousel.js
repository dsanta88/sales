import React from 'react'
import { View,Image } from 'react-native'
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";


export default function CarouselImages(props) {
   
    const { imagenes, height, width, activeSlide, setActiveSlide } = props;
    console.log(imagenes)
    const renderItem = ({ item }) => {
        return (
          <Image
            style={{ width, height }}
            source={{ uri: item }}
            resizeMode="stretch"
          />
        );
      };


    return (
        <View>
            <Carousel
               layout={"default"}
               data={imagenes}
               sliderWidth={width}
               itemWidth={width}
               renderItem={renderItem}
               onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Paginacion data={imagenes} activeSlide={activeSlide} />
        </View>
    )
}


function Paginacion(props) {
    const { data, activeSlide } = props;
    return (
      <Pagination
        dotsLength={size(data)}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: "transparent",
          zIndex: 1,
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 2,
          backgroundColor: "#25d366",
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 2,
          backgroundColor: "#128C7E",
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    );
  }