import { createStackNavigator } from '@react-navigation/stack';
import WinnetaGolfDiscoveryTab from './WinnetaGolfDiscoveryTab';
import WinnetaGolfDiscoveryOnboarding from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoveryOnboarding';

const Stack = createStackNavigator();

const WinnetaGolfDiscoveryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="WinnetaGolfDiscoveryOnboarding"
        component={WinnetaGolfDiscoveryOnboarding}
      />
      <Stack.Screen
        name="WinnetaGolfDiscoveryTab"
        component={WinnetaGolfDiscoveryTab}
      />
    </Stack.Navigator>
  );
};

export default WinnetaGolfDiscoveryStack;
