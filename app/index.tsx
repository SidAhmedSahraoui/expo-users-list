import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { User } from '@/types';
import { useStore } from '@/store';
import { Link } from 'expo-router';

import { 
  Button,
  Card,
} from "@rneui/themed";


export default function HomeScreen() {
  const users = useStore((state) => state.users);
  const fetchUsers = useStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>Home</ThemedText>
      </ThemedView>
      {users.map((user: User) => (
        <Card key={user.id} containerStyle={styles.card}>
          <Card.Title style={styles.titleCard}>
            <ThemedText style={styles.title}>{user.name}</ThemedText>
          </Card.Title>
          <Card.Divider style={styles.divider} />
          <Card.FeaturedSubtitle>Email: {user.email}</Card.FeaturedSubtitle>
          <Card.FeaturedSubtitle style={styles.buttons}>
              <Link
                style={styles.button}
                href={{
                  pathname: `/details/[id]`,
                  params: { id: user.id },
                }}

                onPress={() => {
                  console.log('Pressed');
                  console.log(user.id);
                }}>
                View Details
              </Link>
            
         
          </Card.FeaturedSubtitle>
        </Card>
        
      ))}  
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  button: {
    padding: 8,
    borderRadius: 5,
    color: '#f82b0fcc',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
