import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

// components
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Card, Skeleton } from "@rneui/themed";

// zustand
import { useStore } from '@/store';

// expo router
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function UserDetailsScreen() {

  // intercepting the id from the url
  const { id } = useLocalSearchParams();
  // importing the user from the store
  const user = useStore((state) => state.user);
  // importing the fetchUserById function from the store
  const fetchUserById = useStore((state) => state.fetchUserById);
  // importing the router from the expo-router
  const router = useRouter();

  // fetching the user by id
  useEffect(() => {
    if (id) {
      fetchUserById(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // skeleton loading while fetching the user
  if (!user) {
    return (
      <ThemedView style={styles.loadingContainer}>
          <Skeleton width={120} height={40} />
          <Skeleton width={120} height={40} />
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>User Details</ThemedText>
      </ThemedView>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.titleCard}>
          <ThemedText style={styles.title}>{user.name}</ThemedText>
        </Card.Title>
        <Card.Divider style={styles.divider} />
        <Card.FeaturedSubtitle>Email: {user.email}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Phone: {user.phone}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Website: {user.website}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Company: {user.company.name}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Address: {`${user.address.street}, ${user.address.city}, ${user.address.suite}, ${user.address.zipcode}`}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle style={styles.buttons}>
          <Button title="Go Back" onPress={() => router.back()} type='clear' />
        </Card.FeaturedSubtitle>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  card: {
    marginBottom: 4,
    backgroundColor: '#150f26',
    borderColor: '#323844',
    borderWidth: 2,
    borderRadius: 12,
  },
  divider: {
    width: '100%',
    height: 0,
    borderWidth: 2,
    borderColor: '#323844',
  },
  title: {
    color: '#e5e7eb',
  },
  titleCard: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
  },
  buttons: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    color: '#e5e7eb',
  },
});