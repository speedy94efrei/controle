import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue dans les Terres de Xefi</Text>
          <Text style={styles.paragraph}>
            Plongez dans le monde enchanté de Legends of Xefi,{"\n"}
            un jeu de rôle épique qui vous emmène au cœur d'une saga héroïque{"\n"}
            où le destin de nombreux royaumes est en jeu.
          </Text>
          <Text style={styles.subTitle}>Explorez des Paysages Envoûtants</Text>
          <Text style={styles.paragraph}>
            Voyagez à travers des forêts ancestrales, des montagnes interdites et des royaumes souterrains oubliés. Chaque région de Xefi offre ses propres défis et ses secrets à découvrir. Les graphismes somptueux et les environnements immersifs vous transportent dans un univers où la beauté se mêle au danger.
          </Text>
          <Text style={styles.subTitle}>Rencontrez des Personnages Inoubliables</Text>
          <Text style={styles.paragraph}>
            Xefi est peuplée de personnages complexes dotés de leurs propres histoires et motivations. Forgez des alliances ou rivalisez avec des héros et des antagonistes qui ne sont pas toujours ce qu'ils semblent être. Votre capacité à interagir avec ces personnages déterminera votre capacité à réussir dans les quêtes et à influencer le monde autour de vous.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
});
