import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

// components
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { 
  Card, Button
} from "@rneui/themed";

// types
import { User } from '@/types';

// zustand
import { useStore } from '@/store';

// expo router
import { Link } from 'expo-router';

// modal
import Modal from "react-native-modal";

// expo constants
import Constants from 'expo-constants';

// dimensions
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Constants.platform?.ios
  ? Dimensions.get("window").height
  : Constants.statusBarHeight + Dimensions.get("window").height;

export default function HomeScreen() {

  // importing the users from the store
  const users = useStore((state) => state.users);
  // importing the fetchUsers function from the store
  const fetchUsers = useStore((state) => state.fetchUsers);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const toggleModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(!isModalVisible);
  }

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  }
    
  // fetching the users
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
              <Button
                title="View Details"
                onPress={() => toggleModal(user)}
                type='clear'
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
              />
            
         
          </Card.FeaturedSubtitle>
        </Card>
        
      ))}  
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        hasBackdrop={true}
        swipeDirection={['down']}
        onSwipeComplete={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        animationIn={'slideInUp'}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
      >
          <View style={styles.detailsContainer}>
            <ThemedText type='title'>{selectedUser?.name}</ThemedText>
            <ThemedText>Username: {selectedUser?.username}</ThemedText>
            <ThemedText>Email: {selectedUser?.email}</ThemedText>
            <ThemedText>Phone: {selectedUser?.phone}</ThemedText>
            <ThemedText>Website: <ThemedText type='link'>{selectedUser?.website}</ThemedText></ThemedText>
            <ThemedText>Company: {selectedUser?.company.name}</ThemedText>
            <ThemedText>Catch Phrase: {selectedUser?.company.catchPhrase}</ThemedText>
            <ThemedText>BS: {selectedUser?.company.bs}</ThemedText>
            <ThemedText>Address: {`${selectedUser?.address.street}, ${selectedUser?.address.city}, ${selectedUser?.address.zipcode}`}</ThemedText>
            <ThemedText>Suite: {`${selectedUser?.address.suite}`}</ThemedText>
            <ThemedText>Geo: {`${selectedUser?.address.geo.lat}, ${selectedUser?.address.geo.lng}`}</ThemedText>

          </View>
          <View style={styles.modalButtons}>
            <Button title="Go Back" onPress={() => closeModal()} type='clear' />
            <Link
                style={styles.button}
                href={{
                  pathname: `/details/[id]`,
                  params: { id: selectedUser?.id as number },
                }}

                onPress={() => {
                  console.log('Pressed');
                  console.log(selectedUser?.id);
                }}>
                View Details
              </Link>
          </View>
      </Modal>
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
  },
  buttonStyle: {
    color: '#f82b0fcc',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  titleStyle: {
    color: '#f82b0fcc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: '#150f26',
    padding: 20,
    margin: 0,
    borderColor: '#323844',
    borderWidth: 2,
    borderRadius: 12,    
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
});
