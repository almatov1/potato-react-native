import React from 'react';
import { Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Plant } from '../configs/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../configs/template';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderComponent from '../components/HeaderComponent';

type RootStackParamList = {
  ResultScreen: { plant: Plant };
};
type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'ResultScreen'>;
const ResultScreen: React.FC<{ route: ResultScreenRouteProp }> = ({ route }) => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const { plant } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <ScrollView contentContainerStyle={{
        rowGap: 24
      }}>
        <ImageBackground
          source={plant.image}
          style={{
            width: '100%',
            height: 250
          }}
          imageStyle={{ resizeMode: 'cover', borderRadius: 24 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 600, color: COLORS.GREEN }}>{plant.name}</Text>
        <Text style={{ fontSize: 14, color: COLORS.GREEN }}>{plant.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 24
  }
});

export default ResultScreen;
