import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="home-outline" color="#333333" size="16" />
          )}
          label="Home"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}

export default DrawerContent;
