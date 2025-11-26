import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WinnetaGolfDiscoveryOnboarding = () => {
  const [currentOnboardIndex, setCurrentOnboardIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/images/winnetagolfonbg.png')}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.winnetaGolfContainer}>
          {currentOnboardIndex === 0 && (
            <Image source={require('../../assets/images/winnetagolfon1.png')} />
          )}
          {currentOnboardIndex === 1 && (
            <Image source={require('../../assets/images/winnetagolfon2.png')} />
          )}
          {currentOnboardIndex === 2 && (
            <Image source={require('../../assets/images/winnetagolfon3.png')} />
          )}
          {currentOnboardIndex === 3 && (
            <Image source={require('../../assets/images/winnetagolfon4.png')} />
          )}
          {currentOnboardIndex === 4 && (
            <Image source={require('../../assets/images/winnetagolfon5.png')} />
          )}
          <LinearGradient
            colors={['#2A4192', '#0D2169']}
            style={styles.winnetaGolfGradContainer}
          >
            <View style={styles.winnetaGolfInsideContainer}>
              <Text style={styles.winnetaGolfTitle}>
                {currentOnboardIndex === 0 && 'Welcome to Italian Golf'}
                {currentOnboardIndex === 1 && 'Browse All Courses'}
                {currentOnboardIndex === 2 && 'Interactive Map'}
                {currentOnboardIndex === 3 && 'Tips & Facts'}
                {currentOnboardIndex === 4 && 'Personal Challenges'}
              </Text>
              <Text style={styles.winnetaGolfsubtitle}>
                {currentOnboardIndex === 0 &&
                  'Explore a curated selection of Italy’s finest golf courses. Plan, learn, and enjoy your next golf adventure'}
                {currentOnboardIndex === 1 &&
                  'Browse authentic photos and precise locations for each curated course. Find the right place easily with clean, category-based filters.'}
                {currentOnboardIndex === 2 &&
                  'See every course on the map. Tap a marker to instantly view address, coordinates, and key info.'}
                {currentOnboardIndex === 3 &&
                  'Learn essential golf tips and fun facts about Italy’s golf culture. Easily switch between categories.'}
                {currentOnboardIndex === 4 &&
                  'Set your own goals — visit new courses, complete real tasks, improve your game. Track your progress your way.'}
              </Text>

              <TouchableOpacity
                style={styles.winnetaGolfGetStartedBtn}
                activeOpacity={0.7}
                onPress={() =>
                  currentOnboardIndex === 4
                    ? navigation.replace('WinnetaGolfDiscoveryTab')
                    : setCurrentOnboardIndex(currentOnboardIndex + 1)
                }
              >
                <Text style={styles.winnetaGolfGetStartedBtnText}>
                  Continue
                </Text>
              </TouchableOpacity>

              {currentOnboardIndex < 4 && (
                <TouchableOpacity
                  style={styles.winnetaGolfSkipBtn}
                  activeOpacity={0.7}
                  onPress={() => navigation.replace('WinnetaGolfDiscoveryTab')}
                >
                  <Text style={styles.winnetaGolfSkipBtnText}>Skip</Text>
                  <Image
                    source={require('../../assets/images/winnetagolfnext.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  winnetaGolfContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  winnetaGolfTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  winnetaGolfsubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 17,
    marginBottom: 26,
  },
  winnetaGolfGetStartedBtn: {
    backgroundColor: '#E8AA00',
    width: 216,
    height: 33,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  winnetaGolfGetStartedBtnText: {
    color: '#000409',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  winnetaGolfSkipBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
    gap: 5,
  },
  winnetaGolfSkipBtnText: {
    color: '#C8C8CA',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  winnetaGolfInsideContainer: {
    padding: 24,
    paddingBottom: 70,
  },
  winnetaGolfGradContainer: {
    borderTopRightRadius: 52,
    borderTopLeftRadius: 52,
    minHeight: 300,
    marginTop: 20,
    width: '100%',
  },
});

export default WinnetaGolfDiscoveryOnboarding;
