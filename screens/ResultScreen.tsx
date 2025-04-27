import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Plant } from '../configs/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../configs/template';
import { StackNavigationProp } from '@react-navigation/stack';

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
      <ScrollView contentContainerStyle={{
        rowGap: 24
      }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color={COLORS.GREEN} />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  }
});

export default ResultScreen;
