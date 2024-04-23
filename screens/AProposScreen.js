import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking, KeyboardAvoidingView, Platform, Alert } from 'react-native';

function About() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const sendEmail = () => {
    if (!email || !subject || !message) {
      Alert.alert('Attention', 'Veuillez remplir tous les champs.');
    } else if (!validateEmail(email)) {
      Alert.alert('Attention', "Veuillez saisir une adresse email valide se terminant par '@gmail.com'.");
    } else {
      const mailtoLink = `mailto:walidaitdaoud.sio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}&from=${email}`;
      Linking.openURL(mailtoLink);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>A propos</Text>
        <View style={styles.centeredView}>
          <Text style={styles.subtitle}>Mystic Forge Studios</Text>
          <Text style={styles.paragraph}>
            Situés au cœur de l'innovation et de la créativité, nous sommes une équipe passionnée de développeurs, de designers et de conteurs dédiée à la création d'expériences vidéoludiques immersives et captivantes.
          </Text>
          <Text style={styles.subtitle}>
            Notre Mission
          </Text>
          <Text style={styles.paragraph}>
            Chez Mystic Forge Studios, notre mission est de transcender les frontières traditionnelles du jeu vidéo pour offrir des aventures uniques et mémorables. Nous croyons en la puissance du jeu pour rassembler les gens, raconter des histoires profondes et offrir des expériences enrichissantes qui restent avec les joueurs longtemps après qu'ils aient mis de côté leur console.
          </Text>
          <Text style={styles.subtitle}>
            Contact
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Votre email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Objet *"
            value={subject}
            onChangeText={setSubject}
            required
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Votre message *"
            value={message}
            onChangeText={setMessage}
            multiline
            required
          />
          <TouchableOpacity onPress={sendEmail} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 12,
  },
  centeredView: {
    width: '80%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default About;
