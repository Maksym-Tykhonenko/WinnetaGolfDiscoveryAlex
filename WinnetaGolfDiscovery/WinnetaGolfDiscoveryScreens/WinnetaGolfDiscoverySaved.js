import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import WinnetaGolfDiscoveryLayout from '../WinnetaGolfDiscoveryComponents/WinnetaGolfDiscoveryLayout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const WINNETA_GOLF_STORAGE_COURSES = 'golf_saved_courses';
const WINNETA_GOLF_STORAGE_TIPS = 'golf_saved_items';
const WINNETA_GOLF_STORAGE_NOTES = 'golf_saved_notes';

const WinnetaGolfDiscoverySaved = () => {
  const [winnetaGolfSavedCourses, winnetaGolfSetSavedCourses] = useState([]);
  const [winnetaGolfSavedTips, winnetaGolfSetSavedTips] = useState([]);
  const [winnetaGolfNotes, winnetaGolfSetNotes] = useState('');
  const [winnetaGolfScreen, winnetaGolfSetScreen] = useState('main');
  const winnetaGolfNavigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      winnetaGolfLoadAllData();
      return () => {
        winnetaGolfSetScreen('main');
      };
    }, []),
  );

  const winnetaGolfLoadAllData = async () => {
    const courses = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE_COURSES);
    const train = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE_TIPS);
    const notes = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE_NOTES);

    if (courses) winnetaGolfSetSavedCourses(JSON.parse(courses));
    if (train) winnetaGolfSetSavedTips(JSON.parse(train));
    if (notes) winnetaGolfSetNotes(notes);
  };

  const winnetaGolfSaveNotes = async value => {
    winnetaGolfSetNotes(value);
    await AsyncStorage.setItem(WINNETA_GOLF_STORAGE_NOTES, value);
  };

  const winnetaGolfRemoveCourse = async id => {
    const updated = winnetaGolfSavedCourses.filter(c => c.id !== id);
    winnetaGolfSetSavedCourses(updated);
    await AsyncStorage.setItem(
      WINNETA_GOLF_STORAGE_COURSES,
      JSON.stringify(updated),
    );
  };

  const winnetaGolfRemoveTip = async (id, type) => {
    const updated = winnetaGolfSavedTips.filter(
      t => !(t.id === id && t.type === type),
    );
    winnetaGolfSetSavedTips(updated);
    await AsyncStorage.setItem(
      WINNETA_GOLF_STORAGE_TIPS,
      JSON.stringify(updated),
    );
  };

  const winnetaGolfShareTip = async item => {
    Share.share({
      message: `${item.title}\n${item.text}`,
    });
  };

  const winnetaGolfShareCourse = async item => {
    Share.share({
      message: `${item.title}\n${item.address}\n\n${item.description}`,
    });
  };

  return (
    <WinnetaGolfDiscoveryLayout>
      <View style={styles.winnetaGolfContainer}>
        {winnetaGolfScreen === 'main' && (
          <>
            <Text style={styles.winnetaGolfSectionTitle}>Notes:</Text>

            <TextInput
              style={styles.winnetaGolfNotesInput}
              placeholder="Text..."
              placeholderTextColor="#5D647D"
              multiline
              value={winnetaGolfNotes}
              onChangeText={winnetaGolfSaveNotes}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.winnetaGolfBlockBtn}
              onPress={() => winnetaGolfSetScreen('courses')}
            >
              <Text style={styles.winnetaGolfBlockBtnText}>
                Saved Golf Courses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.winnetaGolfBlockBtn}
              onPress={() => winnetaGolfSetScreen('tips')}
            >
              <Text style={styles.winnetaGolfBlockBtnText}>
                Saved Tips & Facts
              </Text>
            </TouchableOpacity>

            <Image
              source={require('../../assets/images/winnetagolfsavedic.png')}
              style={{ alignSelf: 'flex-end', marginTop: 20 }}
            />

            <View style={{ height: 60 }} />
          </>
        )}

        {winnetaGolfScreen === 'courses' && (
          <View style={styles.winnetaGolfSectionWrapper}>
            {winnetaGolfSavedCourses.length === 0 ? (
              <Text style={styles.winnetaGolfEmptyText}>
                No saved courses yet.
              </Text>
            ) : (
              winnetaGolfSavedCourses.map((course, idx) => (
                <LinearGradient
                  colors={['#0C1C53', '#0D173B']}
                  style={styles.winnetaGolfCourseCardGradient}
                  key={idx}
                >
                  <View style={styles.winnetaGolfModalCard}>
                    <Text style={styles.winnetaGolfModalTitle}>
                      {course.title}
                    </Text>

                    <Text style={styles.winnetaGolfModalText}>
                      <Text style={styles.winnetaGolfModalLabel}>Address:</Text>{' '}
                      {course.address}
                    </Text>

                    <Text style={styles.winnetaGolfModalText}>
                      <Text style={styles.winnetaGolfModalLabel}>
                        Coordinates:
                      </Text>{' '}
                      {course.coords}
                    </Text>

                    <Text style={styles.winnetaGolfModalText}>
                      <Text style={styles.winnetaGolfModalLabel}>
                        Description:
                      </Text>{' '}
                      {course.description}
                    </Text>

                    <Image
                      source={course.img}
                      style={styles.winnetaGolfModalImg}
                    />

                    <View style={styles.winnetaGolfModalBtnRow}>
                      <TouchableOpacity
                        onPress={() => winnetaGolfShareCourse(course)}
                        style={styles.winnetaGolfModalIconBtn}
                      >
                        <Image
                          source={require('../../assets/images/winnetagolfshr.png')}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.winnetaGolfMapBtn}
                        onPress={() =>
                          winnetaGolfNavigation.navigate(
                            'WinnetaGolfDiscoveryTab',
                            {
                              screen: 'WinnetaGolfDiscoveryMap',
                              params: { coords: course.coords },
                            },
                          )
                        }
                      >
                        <Text style={styles.winnetaGolfMapBtnText}>
                          View on Map
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => winnetaGolfRemoveCourse(course.id)}
                        style={styles.winnetaGolfIconBtn}
                      >
                        <Image
                          source={require('../../assets/images/winnetagolfsvd.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              ))
            )}

            <View style={{ height: 40 }} />
          </View>
        )}

        {winnetaGolfScreen === 'tips' && (
          <View style={styles.winnetaGolfSectionWrapper}>
            {winnetaGolfSavedTips.length === 0 ? (
              <Text style={styles.winnetaGolfEmptyText}>
                No saved tips yet.
              </Text>
            ) : (
              winnetaGolfSavedTips.map((item, idx) => (
                <LinearGradient
                  key={idx}
                  colors={['#0C1C53', '#0D173B']}
                  style={styles.winnetaGolfTipCardGradient}
                >
                  <View style={styles.winnetaGolfCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.winnetaGolfCardTitle}>
                        {item.title}
                      </Text>
                      <Text style={styles.winnetaGolfCardText}>
                        {item.text}
                      </Text>
                    </View>

                    <View style={styles.winnetaGolfCardButtons}>
                      <TouchableOpacity
                        onPress={() => winnetaGolfShareTip(item)}
                        style={styles.winnetaGolfIconBtn}
                      >
                        <Image
                          source={require('../../assets/images/winnetagolfshr.png')}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => winnetaGolfRemoveTip(item.id, item.type)}
                        style={styles.winnetaGolfIconBtn}
                      >
                        <Image
                          source={require('../../assets/images/winnetagolfsvd.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              ))
            )}

            <View style={{ height: 40 }} />
          </View>
        )}
      </View>
    </WinnetaGolfDiscoveryLayout>
  );
};

const styles = StyleSheet.create({
  winnetaGolfContainer: {
    paddingTop: height * 0.09,
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  winnetaGolfSectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '300',
  },
  winnetaGolfNotesInput: {
    backgroundColor: '#8996C4',
    borderRadius: 25,
    padding: 16,
    minHeight: 190,
    fontSize: 14,
    color: '#30333D',
    marginBottom: 60,
    fontWeight: '400',
  },
  winnetaGolfBlockBtn: {
    backgroundColor: '#0C1C53',
    height: 47,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    width: '90%',
    alignSelf: 'center',
  },
  winnetaGolfBlockBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  winnetaGolfSectionWrapper: {
    paddingBottom: 20,
  },
  winnetaGolfEmptyText: {
    color: '#C8CDE0',
    fontSize: 13,
    marginTop: 10,
  },
  winnetaGolfCourseCardGradient: {
    borderRadius: 18,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  winnetaGolfModalCard: {
    width: '100%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#25305A',
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
  winnetaGolfIconBtn: {
    backgroundColor: '#D08813',
    width: 34,
    height: 34,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnetaGolfCard: {
    borderRadius: 18,
    padding: 10,
    width: '100%',
  },
  winnetaGolfCardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  winnetaGolfCardText: {
    color: '#E8E8E8',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
    marginBottom: 10,
  },
  winnetaGolfTipCardGradient: {
    borderRadius: 18,
    marginBottom: 18,
  },
  winnetaGolfCardButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export default WinnetaGolfDiscoverySaved;
