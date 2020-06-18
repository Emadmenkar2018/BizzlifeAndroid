import React ,{useState} from 'react';
import { StyleSheet ,Dimensions ,Text  } from 'react-native'   
import { theme } from '../../utils/theme';
import { TabView, SceneMap ,TabBar } from 'react-native-tab-view';
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
import LastConversationsScreen from './LastConversationsScreen'; 
import SuperMatchTab from './SuperMatchTab'; 


const initialLayout = { width: Dimensions.get('window').width };
 
const TabMenuChat = ({ ...props}) => {  
 
  const [position,setPosititon] = useState(0);
  const [index, setIndex] = React.useState(0);


  const FirstRoute = () => (
    <LastConversationsScreen
        props={props}
        title={'Last'}
        />
    );

    const SecondRoute = () => (
      <LastConversationsScreen
        props={props}
        title={'SayHi'}
      />
    );

    const ThirdRoute = () => (
        <SuperMatchTab
          props={props}
          title={'SuperMatch'}
        />
     );

    
    const [routes] = React.useState([
      { key: 'first', title: 'Chats' },
      { key: 'second', title: 'Say Hi ' },
      { key: 'third', title: 'Super Match' },
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
    });


    const renderTabBar = props => (
        <TabBar
          {...props} 
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color:'#fff', margin: 8,fontSize: responsiveScreenFontSize(1.5),fontFamily:'EBGaramond-Bold'}}>
              {route.title}
            </Text>
          )}
          indicatorStyle={{ backgroundColor: 'rgba(32, 88, 125,.3)' ,height:'100%'}}
          style={{ backgroundColor: theme.colors.blue  }}
        />
      );

    return (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
          position={position}
        />
      );
  }

export default TabMenuChat;

const styles = StyleSheet.create({
    scene: {
    height:'100%'
    },
  });