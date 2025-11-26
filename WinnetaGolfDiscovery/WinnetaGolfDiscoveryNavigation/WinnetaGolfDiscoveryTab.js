import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import WinnetaGolfDiscoveryCourses from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoveryCourses';
import WinnetaGolfDiscoveryTips from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoveryTips';
import WinnetaGolfDiscoveryMap from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoveryMap';
import WinnetaGolfDiscoveryChallenges from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoveryChallenges';
import WinnetaGolfDiscoverySaved from '../WinnetaGolfDiscoveryScreens/WinnetaGolfDiscoverySaved';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const WinnetaGolfDiscoveryTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.winnetaGolfTabs,
        tabBarActiveTintColor: '#E8AA00',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#2A4192', '#0D2169']}
            style={styles.winnetaGolfTabBg}
          ></LinearGradient>
        ),
      }}
    >
      <Tab.Screen
        name="WinnetaGolfDiscoveryCourses"
        component={WinnetaGolfDiscoveryCourses}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/winnetagolficon1.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.winnetaGolfLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Courses
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="WinnetaGolfDiscoveryTips"
        component={WinnetaGolfDiscoveryTips}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/winnetagolficon2.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.winnetaGolfLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Tips & Facts
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="WinnetaGolfDiscoveryMap"
        component={WinnetaGolfDiscoveryMap}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/winnetagolficon3.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.winnetaGolfLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Map
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="WinnetaGolfDiscoveryChallenges"
        component={WinnetaGolfDiscoveryChallenges}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/winnetagolficon4.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.winnetaGolfLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Challenges
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="WinnetaGolfDiscoverySaved"
        component={WinnetaGolfDiscoverySaved}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/winnetagolficon5.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.winnetaGolfLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Saved
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  winnetaGolfTabs: {
    marginHorizontal: 10,
    elevation: 0,
    paddingTop: 8,
    paddingBottom: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 51,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
  },
  winnetaGolfTabBg: {
    height: 68,
    borderRadius: 16,
  },
  winnetaGolfLabel: {
    fontSize: 10,
  },
});

export default WinnetaGolfDiscoveryTab;
