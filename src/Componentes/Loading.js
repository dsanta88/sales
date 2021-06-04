import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({isVisible, text}) {
    return (
     <Overlay
      isVisible={isVisible}
      windowBackgoundColor="rgba(0,0,0,0.5)"
      OverlayBackgoundColor="transparent"
      overlayStyle={styles.Overlay}
      >
        <View style={styles.view}>
            <ActivityIndicator
             size="large"
             color="#442484"
            />
            {
                text && <Text style={styles.text}>{text}</Text>
            }
        </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
   overlay:{
       height:100,
       width: 200,
       backgroundColor:"#fff",
       borderColor: "#442484",
       borderWidth: 1,
       borderRadius: 10
   },
   view:{  
       alignItems:"center",
       justifyContent: "center"
   },
   text:{
        color:"#442484",
        margin:10
   }

})


// import React from 'react'
// import { StyleSheet, Text, View,Dimensions } from 'react-native'
// import {Overlay} from 'react-native-elements'
// import {Chase} from 'react-native-animated-spinkit'

// export default function Loading(props) {
//     const {isVisible, text}=props
//     return (
//         <Overlay
//          isVisible={isVisible}
//          overlayStyle={styles.overlay}
//         >
//            <View style={styles.view}>
//                <Chase 
//                  size={48}
//                  color="#166cb3"
//                />
//                {text && <Text style={styles.text}>{text}</Text>}
//            </View> 
//         </Overlay>
//     )
// }

// const styles = StyleSheet.create({
//     overlay:{
//         backgroundColor:"rgba(0,0,0,0.6)",
//         borderColor:"#166cb3",
//         borderRadius:20,
//         width:"90%",
//         height:Dimensions.get("window").height/2
//     },
//     view:{
//         flex:1,
//         justifyContent:"center",
//         alignItems:"center"
//     },
//     text:{
//         color:"#166cb3",
//         marginTop:20,
//         fontWeight:"bold",
//         fontSize:24,
//         textTransform:"uppercase",
//         textAlign:"center"
//     }
// })
