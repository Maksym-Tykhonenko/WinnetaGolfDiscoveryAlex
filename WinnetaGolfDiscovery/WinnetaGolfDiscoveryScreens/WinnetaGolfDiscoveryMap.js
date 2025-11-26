import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { golfCourses } from '../WinnetaGolfDiscoveryData/winnetaGolfData';

const { width } = Dimensions.get('window');

const WINNETA_GOLF_STORAGE = 'golf_saved_courses';

const WinnetaGolfDiscoveryMap = () => {
  const winnetaGolfRoute = useRoute();
  const winnetaGolfMapRef = useRef(null);
  const [winnetaGolfSelectedCourse, winnetaGolfSetSelectedCourse] =
    useState(null);
  const [winnetaGolfSavedCourses, winnetaGolfSetSavedCourses] = useState([]);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useEffect(() => {
    (async () => {
      const c = await AsyncStorage.getItem(WINNETA_GOLF_STORAGE);
      if (c) winnetaGolfSetSavedCourses(JSON.parse(c));
    })();
  }, []);

  const winnetaGolfIsSaved = id =>
    winnetaGolfSavedCourses.some(c => c.id === id);

  const winnetaGolfToggleSaved = async course => {
    let updated;

    if (winnetaGolfIsSaved(course.id)) {
      updated = winnetaGolfSavedCourses.filter(c => c.id !== course.id);
    } else {
      updated = [...winnetaGolfSavedCourses, course];
    }

    winnetaGolfSetSavedCourses(updated);
    await AsyncStorage.setItem(WINNETA_GOLF_STORAGE, JSON.stringify(updated));
  };

  const winnetaGolfShareCourse = item => {
    Share.share({
      message: `${item.title}\n${item.address}\n\n${item.description}`,
    });
  };

  const winnetaGolfParseCoords = str => {
    const parts = str.split(',');
    return {
      latitude: parseFloat(parts[0]),
      longitude: parseFloat(parts[1]),
    };
  };

  useEffect(() => {
    if (winnetaGolfRoute.params?.coords && winnetaGolfMapRef.current) {
      const { latitude, longitude } = winnetaGolfParseCoords(
        winnetaGolfRoute.params.coords,
      );

      winnetaGolfMapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        },
        700,
      );
    }
  }, [winnetaGolfRoute.params?.coords]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={winnetaGolfMapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.0,
          longitude: 11.0,
          latitudeDelta: 5.5,
          longitudeDelta: 5.5,
        }}
      >
        {golfCourses.map(course => {
          const { latitude, longitude } = winnetaGolfParseCoords(course.coords);
          return (
            <Marker
              key={course.id}
              coordinate={{ latitude, longitude }}
              onPress={() => winnetaGolfSetSelectedCourse(course)}
            >
              <Image
                source={require('../../assets/images/winnetagolfmark.png')}
                style={{ width: 32, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
      </MapView>

      {winnetaGolfSelectedCourse && (
        <View style={styles.winnetaGolfModalWrapper}>
          <LinearGradient
            colors={['#0C1C53', '#0D173B']}
            style={{ borderRadius: 18, width: width - 50 }}
          >
            <View style={styles.winnetaGolfModalCard}>
              <TouchableOpacity
                style={styles.winnetaGolfModalClose}
                onPress={() => winnetaGolfSetSelectedCourse(null)}
              >
                <Text style={{ color: '#fff', fontSize: 24 }}>×</Text>
              </TouchableOpacity>

              <Text style={styles.winnetaGolfModalTitle}>
                {winnetaGolfSelectedCourse.title}
              </Text>

              <Text style={styles.winnetaGolfModalLabel}>
                Address:{' '}
                <Text style={styles.winnetaGolfModalValue}>
                  {winnetaGolfSelectedCourse.address}
                </Text>
              </Text>

              <Text style={styles.winnetaGolfModalLabel}>
                Coordinates:{' '}
                <Text style={styles.winnetaGolfModalValue}>
                  {winnetaGolfSelectedCourse.coords}
                </Text>
              </Text>

              <Text style={styles.winnetaGolfModalLabel}>
                Description:{' '}
                <Text style={styles.winnetaGolfModalValue}>
                  {winnetaGolfSelectedCourse.description}
                </Text>
              </Text>

              <Image
                source={winnetaGolfSelectedCourse.img}
                style={styles.winnetaGolfModalImg}
              />

              <View style={styles.winnetaGolfModalBtnRow}>
                <TouchableOpacity
                  onPress={() =>
                    winnetaGolfShareCourse(winnetaGolfSelectedCourse)
                  }
                  style={styles.winnetaGolfModalIconBtn}
                >
                  <Image
                    source={require('../../assets/images/winnetagolfshr.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    winnetaGolfToggleSaved(winnetaGolfSelectedCourse)
                  }
                  style={styles.winnetaGolfModalIconBtn}
                >
                  <Image
                    source={
                      winnetaGolfIsSaved(winnetaGolfSelectedCourse.id)
                        ? require('../../assets/images/winnetagolfsvd.png')
                        : require('../../assets/images/winnetagolfsv.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default WinnetaGolfDiscoveryMap;

const styles = StyleSheet.create({
  winnetaGolfModalWrapper: {
    position: 'absolute',
    top: 100,
    width: '100%',
    alignItems: 'center',
  },
  winnetaGolfModalCard: {
    width: '100%',
    borderRadius: 18,
    padding: 18,
    paddingTop: 30,
  },
  winnetaGolfModalClose: {
    position: 'absolute',
    top: 8,
    left: 10,
  },
  winnetaGolfModalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },
  winnetaGolfModalLabel: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  winnetaGolfModalValue: {
    color: '#E8E8E8',
    fontWeight: '300',
  },
  winnetaGolfModalImg: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginVertical: 14,
  },
  winnetaGolfModalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  winnetaGolfModalIconBtn: {
    backgroundColor: '#D08813',
    width: 38,
    height: 38,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
