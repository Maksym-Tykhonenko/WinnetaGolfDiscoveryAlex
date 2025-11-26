import { ScrollView, View } from 'react-native';

const WinnetaGolfDiscoveryLayout = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0E2577' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default WinnetaGolfDiscoveryLayout;
