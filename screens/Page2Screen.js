import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

function CharacterTable() {
  const [charactersByAttack, setCharactersByAttack] = useState([]);
  const [charactersByHP, setCharactersByHP] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCharacterData();
  }, []);

  const fetchCharacterData = async () => {
    try {
      const ids = [1, 2, 3, 4, 5, 6, 7]; // Liste des ID des personnages à récupérer
      const characterDataPromises = ids.map(async (id) => {
        const response = await fetch(`http://api-fantasygame.eu-4.evennode.com/get-character/${id}`);
        return await response.json();
      });

      const characterData = await Promise.all(characterDataPromises);
      
      // Trier les personnages par points d'attaque (du plus haut au plus bas)
      const charactersByAttackSorted = [...characterData].sort((a, b) => b.attack_points - a.attack_points);
      setCharactersByAttack(charactersByAttackSorted);

      // Trier les personnages par points de vie (hp) (du plus haut au plus bas)
      const charactersByHPSorted = [...characterData].sort((a, b) => b.hp - a.hp);
      setCharactersByHP(charactersByHPSorted);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Tableau des personnages par points d'attaque</Text>
        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (
          <View style={styles.characterContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Image</Text>
              <Text style={[styles.headerText, styles.centeredText]}>Nom</Text>
              <Text style={[styles.headerText, styles.centeredText]}>Points d'attaque</Text>
            </View>
            {charactersByAttack.map((character) => (
              <View key={character.id} style={styles.characterRow}>
                <Image source={{ uri: character.img }} style={styles.characterImage} />
                <Text style={[styles.characterData, styles.centeredText]}>{character.name}</Text>
                <Text style={[styles.characterData, styles.centeredText]}>{character.attack_points}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.title}>Tableau des personnages par points de vie (HP)</Text>
        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (
          <View style={styles.characterContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Image</Text>
              <Text style={[styles.headerText, styles.centeredText]}>Nom</Text>
              <Text style={[styles.headerText, styles.centeredText]}>Points de vie (HP)</Text>
            </View>
            {charactersByHP.map((character) => (
              <View key={character.id} style={styles.characterRow}>
                <Image source={{ uri: character.img }} style={styles.characterImage} />
                <Text style={[styles.characterData, styles.centeredText]}>{character.name}</Text>
                <Text style={[styles.characterData, styles.centeredText]}>{character.hp}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  characterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  centeredText: {
    textAlign: 'center',
  },
  characterRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterData: {
    flex: 1,
  },
});

export default CharacterTable;
