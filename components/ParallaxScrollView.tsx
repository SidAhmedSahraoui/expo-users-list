import type { PropsWithChildren } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';


type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({
  children,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();


  return (
    <ImageBackground source={require('../assets/images/bg-image.png')} style={styles.bg}>
      <ThemedView style={styles.container}>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
