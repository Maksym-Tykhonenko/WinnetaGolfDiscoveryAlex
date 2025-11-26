import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
  Modal,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import {
  golfCourses,
  winnetaCoursesCategories,
} from '../WinnetaGolfDiscoveryData/winnetaGolfData';
import WinnetaGolfDiscoveryLayout from '../WinnetaGolfDiscoveryComponents/WinnetaGolfDiscoveryLayout';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const WINNETA_GOLF_STORAGE = 'golf_saved_courses';

const WinnetaGolfDiscoveryCourses = () => {
  const [winnetaGolfActiveCategory, winnetaGolfSetActiveCategory] =
    useState('All');
  const [winnetaGolfSaved, winnetaGolfSetSaved] = useState([]);
  const [winnetaGolfModalVisible, winnetaGolfSetModalVisible] = useState(false);
  const [winnetaGolfSelectedCourse, winnetaGolfSetSelectedCourse] =
    useState(null);

  const winnetaGolfNavigation = useNavigation();

  useEffect(() => {
    winnetaGolfLoadSaved();
  }, []);

  const winnetaGolfLoadSaved = async () => {
    const json = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE);
    if (json) winnetaGolfSetSaved(JSON.parse(json));
  };

  const winnetaGolfToggleSave = async course => {
    let updated;

    if (winnetaGolfSaved.some(el => el.id === course.id)) {
      updated = winnetaGolfSaved.filter(el => el.id !== course.id);
    } else {
      updated = [...winnetaGolfSaved, course];
    }

    winnetaGolfSetSaved(updated);
    await AsyncStorage.setItem(WINNETA_GOLF_STORAGE, JSON.stringify(updated));
  };

  const winnetaGolfFiltered =
    winnetaGolfActiveCategory === 'All'
      ? golfCourses
      : golfCourses.filter(c => c.category === winnetaGolfActiveCategory);

  const winnetaGolfShare = course => {
    Share.share({
      message: `${course.title}\n${course.address}\n\n${course.description}`,
    });
  };

  return (
    <WinnetaGolfDiscoveryLayout>
      <View
        style={[
          styles.winnetaGolfContainer,
          winnetaGolfModalVisible &&
            Platform.OS === 'android' && { filter: 'blur(2px)' },
        ]}
      >
        <View style={styles.winnetaGolfFilterRow}>
          {winnetaCoursesCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.winnetaGolfFilterBtn,
                winnetaGolfActiveCategory === cat &&
                  styles.winnetaGolfFilterBtnActive,
              ]}
              onPress={() => winnetaGolfSetActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.winnetaGolfFilterText,
                  winnetaGolfActiveCategory === cat && { color: '#2B1507' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 7 }}>
          {winnetaGolfFiltered.map(course => (
            <LinearGradient
              key={course.id}
              colors={['#0C1C53', '#0D173B']}
              style={styles.winnetaGolfCardWrap}
            >
              <View style={styles.winnetaGolfCardImgRow}>
                <Image source={course.img} style={styles.winnetaGolfCardImg} />
                <View style={{ flex: 1, padding: 8 }}>
                  <Text style={styles.winnetaGolfCardTitle}>
                    {course.title}
                  </Text>
                  <Text style={styles.winnetaGolfCardSmall}>
                    {course.description}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.winnetaGolfOpenBtn}
                    onPress={() => {
                      winnetaGolfSetSelectedCourse(course);
                      winnetaGolfSetModalVisible(true);
                    }}
                  >
                    <Text style={styles.winnetaGolfOpenBtnText}>Open</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>

        {winnetaGolfSelectedCourse && (
          <Modal
            transparent
            visible={winnetaGolfModalVisible}
            animationType="fade"
            statusBarTranslucent={Platform.OS === 'android'}
          >
            <View
              style={[
                styles.winnetaGolfModalOuter,
                Platform.OS === 'android' &&
                  winnetaGolfModalVisible && {
                    backgroundColor: 'rgba(0, 0, 0, 0.28)',
                  },
              ]}
            >
              {Platform.OS === 'ios' && (
                <BlurView
                  style={styles.winnetaGolfBlur}
                  blurType="dark"
                  blurAmount={4}
                />
              )}

              <LinearGradient
                colors={['#0C1C53', '#0D173B']}
                style={{ borderRadius: 18, width: '90%' }}
              >
                <View style={styles.winnetaGolfModalCard}>
                  <TouchableOpacity
                    style={styles.winnetaGolfModalClose}
                    onPress={() => winnetaGolfSetModalVisible(false)}
                  >
                    <Text style={{ color: '#fff', fontSize: 20 }}>×</Text>
                  </TouchableOpacity>

                  <Text style={styles.winnetaGolfModalTitle}>
                    {winnetaGolfSelectedCourse.title}
                  </Text>

                  <Text style={styles.winnetaGolfModalText}>
                    <Text style={styles.winnetaGolfModalLabel}>Address:</Text>{' '}
                    {winnetaGolfSelectedCourse.address}
                  </Text>

                  <Text style={styles.winnetaGolfModalText}>
                    <Text style={styles.winnetaGolfModalLabel}>
                      Coordinates:
                    </Text>{' '}
                    {winnetaGolfSelectedCourse.coords}
                  </Text>

                  <Text style={styles.winnetaGolfModalText}>
                    <Text style={styles.winnetaGolfModalLabel}>
                      Description:
                    </Text>{' '}
                    {winnetaGolfSelectedCourse.description}
                  </Text>

                  <Image
                    source={winnetaGolfSelectedCourse.img}
                    style={styles.winnetaGolfModalImg}
                  />

                  <View style={styles.winnetaGolfModalBtnRow}>
                    <TouchableOpacity
                      onPress={() =>
                        winnetaGolfShare(winnetaGolfSelectedCourse)
                      }
                      style={styles.winnetaGolfModalIconBtn}
                    >
                      <Image
                        source={require('../../assets/images/winnetagolfshr.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.winnetaGolfMapBtn}
                      onPress={() => {
                        winnetaGolfNavigation.navigate(
                          'WinnetaGolfDiscoveryTab',
                          {
                            screen: 'WinnetaGolfDiscoveryMap',
                            params: {
                              coords: winnetaGolfSelectedCourse.coords,
                            },
                          },
                        );
                        winnetaGolfSetModalVisible(false);
                      }}
                    >
                      <Text style={styles.winnetaGolfMapBtnText}>
                        View on Map
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        winnetaGolfToggleSave(winnetaGolfSelectedCourse)
                      }
                      style={styles.winnetaGolfModalIconBtn}
                    >
                      {winnetaGolfSaved.some(
                        el => el.id === winnetaGolfSelectedCourse.id,
                      ) ? (
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
            </View>
          </Modal>
        )}
      </View>
    </WinnetaGolfDiscoveryLayout>
  );
};

const styles = StyleSheet.create({
  winnetaGolfContainer: {
    flex: 1,
    paddingTop: height * 0.06,
    paddingHorizontal: 12,
    paddingBottom: 130,
  },
  winnetaGolfFilterRow: {
    marginBottom: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  winnetaGolfFilterBtn: {
    backgroundColor: '#0C1C53',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 7,
  },
  winnetaGolfFilterBtnActive: {
    backgroundColor: '#D08813',
  },
  winnetaGolfFilterText: {
    color: '#fff',
    fontSize: 12,
  },
  winnetaGolfCardWrap: {
    borderRadius: 18,
    marginBottom: 15,
  },
  winnetaGolfCardImgRow: {
    flexDirection: 'row',
    gap: 10,
  },
  winnetaGolfCardImg: {
    width: '35%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  winnetaGolfCardTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
    marginBottom: 4,
  },
  winnetaGolfCardSmall: {
    color: '#D3DDFF',
    fontSize: 11,
    marginBottom: 14,
  },
  winnetaGolfOpenBtn: {
    backgroundColor: '#D08813',
    marginTop: 6,
    width: 70,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnetaGolfOpenBtnText: {
    color: '#2B1507',
    fontSize: 12,
    fontWeight: '600',
  },
  winnetaGolfModalOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnetaGolfBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  winnetaGolfModalCard: {
    width: '100%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#25305A',
  },
  winnetaGolfModalClose: {
    position: 'absolute',
    top: 10,
    left: 12,
    zIndex: 10,
  },
  winnetaGolfModalTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  winnetaGolfModalLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '400',
  },
  winnetaGolfModalText: {
    color: '#E8E8E8',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '300',
  },
  winnetaGolfModalImg: {
    width: '90%',
    height: 110,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 6,
    alignSelf: 'center',
  },
  winnetaGolfModalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  winnetaGolfModalIconBtn: {
    backgroundColor: '#D08813',
    width: 34,
    height: 34,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnetaGolfMapBtn: {
    backgroundColor: '#D08813',
    height: 34,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  winnetaGolfMapBtnText: {
    color: '#2B1507',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default WinnetaGolfDiscoveryCourses;
