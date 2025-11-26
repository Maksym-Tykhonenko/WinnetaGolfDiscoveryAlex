import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WinnetaGolfDiscoveryLayout from '../WinnetaGolfDiscoveryComponents/WinnetaGolfDiscoveryLayout';
import {
  golfTips,
  golfFacts,
} from '../WinnetaGolfDiscoveryData/winnetaGolfData';

const { height } = Dimensions.get('window');
const WINNETA_GOLF_STORAGE_ITEMS = 'golf_saved_items';

const WinnetaGolfDiscoveryTips = () => {
  const [winnetaGolfMode, winnetaGolfSetMode] = useState('tips');
  const [winnetaGolfSaved, winnetaGolfSetSaved] = useState([]);

  const winnetaGolfData = winnetaGolfMode === 'tips' ? golfTips : golfFacts;

  useEffect(() => {
    winnetaGolfLoadSaved();
  }, []);

  const winnetaGolfLoadSaved = async () => {
    const json = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE_ITEMS);
    if (json) winnetaGolfSetSaved(JSON.parse(json));
  };

  const winnetaGolfToggleSave = async item => {
    let updated;

    if (
      winnetaGolfSaved.some(
        el => el.id === item.id && el.type === winnetaGolfMode,
      )
    ) {
      updated = winnetaGolfSaved.filter(
        el => !(el.id === item.id && el.type === winnetaGolfMode),
      );
    } else {
      updated = [...winnetaGolfSaved, { ...item, type: winnetaGolfMode }];
    }

    winnetaGolfSetSaved(updated);
    await AsyncStorage.setItem(
      WINNETA_GOLF_STORAGE_ITEMS,
      JSON.stringify(updated),
    );
  };

  const winnetaGolfShare = async item => {
    try {
      await Share.share({
        message: `${item.title}\n${item.text}`,
      });
    } catch {}
  };

  const winnetaGolfIsSaved = item =>
    winnetaGolfSaved.some(
      el => el.id === item.id && el.type === winnetaGolfMode,
    );

  return (
    <WinnetaGolfDiscoveryLayout>
      <View style={styles.winnetaGolfContainer}>
        <View style={styles.winnetaGolfModeSwitch}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.winnetaGolfSwitchBtn,
              winnetaGolfMode === 'tips' &&
                styles.winnetaGolfSwitchBtnActiveDark,
            ]}
            onPress={() => winnetaGolfSetMode('tips')}
          >
            <Text
              style={[
                styles.winnetaGolfSwitchBtnText,
                winnetaGolfMode === 'tips' && { color: '#2B1507' },
              ]}
            >
              Tips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.winnetaGolfSwitchBtn,
              winnetaGolfMode === 'facts' &&
                styles.winnetaGolfSwitchBtnActiveDark,
            ]}
            onPress={() => winnetaGolfSetMode('facts')}
          >
            <Text
              style={[
                styles.winnetaGolfSwitchBtnText,
                winnetaGolfMode === 'facts' && { color: '#2B1507' },
              ]}
            >
              Facts
            </Text>
          </TouchableOpacity>
        </View>

        {winnetaGolfData.map(item => (
          <LinearGradient
            key={item.id}
            colors={['#0C1C53', '#0D173B']}
            style={styles.winnetaGolfCardGradient}
          >
            <View style={styles.winnetaGolfCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.winnetaGolfCardTitle}>{item.title}</Text>
                <Text style={styles.winnetaGolfCardText}>{item.text}</Text>
              </View>

              <View style={styles.winnetaGolfCardButtons}>
                <TouchableOpacity
                  onPress={() => winnetaGolfShare(item)}
                  style={styles.winnetaGolfIconBtn}
                >
                  <Image
                    source={require('../../assets/images/winnetagolfshr.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => winnetaGolfToggleSave(item)}
                  style={styles.winnetaGolfIconBtn}
                >
                  {winnetaGolfIsSaved(item) ? (
                    <Image
                      source={require('../../assets/images/winnetagolfsvd.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/winnetagolfsv.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        ))}
      </View>
    </WinnetaGolfDiscoveryLayout>
  );
};

const styles = StyleSheet.create({
  winnetaGolfContainer: {
    flex: 1,
    paddingTop: height * 0.07,
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  winnetaGolfModeSwitch: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  winnetaGolfSwitchBtn: {
    backgroundColor: '#0C1C53',
    height: 27,
    borderRadius: 7,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnetaGolfSwitchBtnActiveDark: {
    backgroundColor: '#D08813',
  },
  winnetaGolfSwitchBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '300',
  },
  winnetaGolfCardGradient: {
    borderRadius: 18,
    marginBottom: 18,
  },
  winnetaGolfCard: {
    borderRadius: 18,
    padding: 10,
    width: '100%',
  },
  winnetaGolfCardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  winnetaGolfCardText: {
    color: '#E8E8E8',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
  winnetaGolfCardButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  winnetaGolfIconBtn: {
    backgroundColor: '#D08813',
    width: 34,
    height: 34,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WinnetaGolfDiscoveryTips;
