import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import WinnetaGolfDiscoveryLayout from './WinnetaGolfDiscoveryLayout';

const WinnetaGolfDiscoveryLoader = () => {
  const welcomeLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    --color: hsl(0, 0%, 87%);
    --animation: 2s ease-in-out infinite;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 22px;
    height: 22px;
    border: solid 2px var(--color);
    border-radius: 50%;
    margin: 0 8px;
    background-color: transparent;
    animation: circle-keys var(--animation);
  }

  .dot {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color);
    animation: dot-keys var(--animation);
  }

  .outline {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    animation: outline-keys var(--animation);
  }

  /* delays */
  .circle:nth-child(2) { animation-delay: 0.3s; }
  .circle:nth-child(3) { animation-delay: 0.6s; }
  .circle:nth-child(4) { animation-delay: 0.9s; }

  .circle:nth-child(2) .dot { animation-delay: 0.3s; }
  .circle:nth-child(3) .dot { animation-delay: 0.6s; }
  .circle:nth-child(4) .dot { animation-delay: 0.9s; }

  .circle:nth-child(1) .outline { animation-delay: 0.9s; }
  .circle:nth-child(2) .outline { animation-delay: 1.2s; }
  .circle:nth-child(3) .outline { animation-delay: 1.5s; }
  .circle:nth-child(4) .outline { animation-delay: 1.8s; }

  @keyframes circle-keys {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes dot-keys {
    0% { transform: scale(1); }
    50% { transform: scale(0); }
    100% { transform: scale(1); }
  }

  @keyframes outline-keys {
    0% {
      transform: scale(0);
      outline: solid 20px var(--color);
      outline-offset: 0;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      outline: solid 0 transparent;
      outline-offset: 20px;
      opacity: 0;
    }
  }
</style>
</head>

<body>
  <div class="loader">
    <div class="circle"><div class="dot"></div><div class="outline"></div></div>
    <div class="circle"><div class="dot"></div><div class="outline"></div></div>
    <div class="circle"><div class="dot"></div><div class="outline"></div></div>
    <div class="circle"><div class="dot"></div><div class="outline"></div></div>
  </div>
</body>
</html>
  `;

  return (
    <WinnetaGolfDiscoveryLayout>
      <View style={styles.winnetagolfcont}>
        <Image
          source={require('../../assets/images/winnetagolfldr.png')}
          style={{ bottom: 45 }}
        />
      </View>

      <View style={styles.winnetagolfwrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomeLoaderHTML }}
          style={{ width: 220, height: 100, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </WinnetaGolfDiscoveryLayout>
  );
};

const styles = StyleSheet.create({
  winnetagolfwrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  winnetagolfcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 570,
  },
});

export default WinnetaGolfDiscoveryLoader;
