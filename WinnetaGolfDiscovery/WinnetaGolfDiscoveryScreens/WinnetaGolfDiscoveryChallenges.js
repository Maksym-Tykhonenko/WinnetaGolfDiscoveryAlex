import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WinnetaGolfDiscoveryLayout from '../WinnetaGolfDiscoveryComponents/WinnetaGolfDiscoveryLayout';
import { winnetaGolfChallengesData } from '../WinnetaGolfDiscoveryData/winnetaGolfData';

const WINNETA_GOLF_STORAGE_CHALLENGES = 'golf_challenges_done';
const { height } = Dimensions.get('window');

const WinnetaGolfDiscoveryChallenges = () => {
  const [winnetaGolfDone, winnetaGolfSetDone] = useState([]);

  useEffect(() => {
    winnetaGolfLoadStatus();
  }, []);

  const winnetaGolfLoadStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE_CHALLENGES);
      if (saved) winnetaGolfSetDone(JSON.parse(saved));
    } catch (e) {
      console.log('error', e);
    }
  };

  const winnetaGolfToggleChallenge = async index => {
    let updated = [...winnetaGolfDone];

    if (updated.includes(index)) {
      updated = updated.filter(i => i !== index);
    } else {
      updated.push(index);
    }

    winnetaGolfSetDone(updated);
    await AsyncStorage.setItem(
      WINNETA_GOLF_STORAGE_CHALLENGES,
      JSON.stringify(updated),
    );
  };

  return (
    <WinnetaGolfDiscoveryLayout
      contentContainerStyle={styles.winnetaGolfContainer}
    >
      <View style={styles.winnetaGolfContainerWrap}>
        <LinearGradient
          colors={['#0C1C53', '#0D173B']}
          style={styles.winnetaGolfCardWrapper}
        >
          <View style={styles.winnetaGolfCard}>
            <Text style={styles.winnetaGolfTitle}>Personal Challenges</Text>

            {winnetaGolfChallengesData.map((text, index) => {
              const checked = winnetaGolfDone.includes(index);

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.winnetaGolfItemRow}
                  onPress={() => winnetaGolfToggleChallenge(index)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.winnetaGolfCheckbox,
                      checked && styles.winnetaGolfCheckboxActive,
                    ]}
                  >
                    {checked && (
                      <Image
                        source={require('../../assets/images/winnetagolfcheck.png')}
                        resizeMode="contain"
                      />
                    )}
                  </View>

                  <Text style={styles.winnetaGolfItemText}>{text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </View>
    </WinnetaGolfDiscoveryLayout>
  );
};

const styles = StyleSheet.create({
  winnetaGolfContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  winnetaGolfContainerWrap: {
    paddingTop: height * 0.09,
    paddingBottom: 130,
  },
  winnetaGolfCardWrapper: {
    borderRadius: 22,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.3,
    borderColor: '#3E59B8',
  },
  winnetaGolfCard: {
    borderRadius: 22,
    padding: 25,
    paddingTop: 30,
    paddingBottom: 50,
  },
  winnetaGolfTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 38,
  },
  winnetaGolfItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingRight: 6,
  },
  winnetaGolfCheckbox: {
    width: 30,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#3D58B7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  winnetaGolfCheckboxActive: {
    backgroundColor: 'transparent',
  },
  winnetaGolfItemText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default WinnetaGolfDiscoveryChallenges;
