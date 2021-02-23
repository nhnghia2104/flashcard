import React, { Component } from "react";
import RootStackScreen from "./components/RootStackScreen";
import SplashScreen from "./components/SplashScreen";
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { isLoading: true };
  // }
  // async componentDidMount() {
  //   const data = await this.performTimeConsumingTask();
  //   if (data !== null) {
  //     this.setState({ sLoading: false });
  //   }
  // }
  // performTimeConsumingTask = async () => {
  //   return new Promise((resolve) =>
  //     setTimeout(() => {
  //       resolve("result");
  //     }, 2000)
  //   );
  // };
  render() {
    // if (this.state.isLoading) {
    //   return <SplashScreen />;
    // }
    return <RootStackScreen />;
  }
}
export default App;
