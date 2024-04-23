import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('http://api-fantasygame.eu-4.evennode.com/get-characters');
      const data = await response.json();
      setCharacters(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleCharacterPress = async (character) => {
    try {
      const response = await fetch(`http://api-fantasygame.eu-4.evennode.com/get-character/${character.id}`);
      const characterData = await response.json();
      setSelectedCharacter(characterData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCharacterCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCharacterPress(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.rarity}>Rareté: {item.rarity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Liste des personnages</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacterCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatList}
        />
      )}
      {selectedCharacter && (
        <View style={styles.characterDetailsContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedCharacter(null)}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
      
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Détails du personnage</Text>
            <Image source={{ uri: selectedCharacter.img }} style={styles.characterImage} />
            <Text style={styles.details}>Nom : {selectedCharacter.name}</Text>
            <Text style={styles.details}>Description : {selectedCharacter.description}</Text>
            <Text style={styles.details}>Rareté : {selectedCharacter.rarity}</Text>
            <Text style={styles.details}>HP : {selectedCharacter.hp}</Text>
            <Text style={styles.details}>Points d'attaque : {selectedCharacter.attack_points}</Text>
            <Text style={styles.details}>Attaques principales : {selectedCharacter.main_attack}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B5998', // Fond principal en #3B5998
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#cccccc', // Fond de carte en gris
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  rarity: {
    fontSize: 14,
    color: '#888',
  },
  characterDetailsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
  },
  characterImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default CharacterList;
