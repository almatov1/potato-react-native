import React from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../configs/template';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PLANTS_DATA } from '../configs/data';
import { ROUTES } from '../configs/route';
import HeaderComponent from '../components/HeaderComponent';

const LibraryScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={navigation} />
            <ScrollView contentContainerStyle={{
                rowGap: 24
            }}>
                {PLANTS_DATA.map((plant) => (
                    <Pressable key={plant.label} onPress={() => navigation.navigate(ROUTES.RESULT, { plant })} style={{
                        flexDirection: 'row',
                        gap: 24
                    }}>
                        <ImageBackground
                            source={plant.image}
                            style={{
                                width: 100,
                                height: 100
                            }}
                            imageStyle={{ resizeMode: 'cover', borderRadius: 16 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLORS.GREEN, fontSize: 20, fontWeight: 600 }}>{plant.name}</Text>
                            <Text style={{ color: COLORS.GREEN, fontSize: 14 }}>
                                {plant.description.length > 120
                                    ? `${plant.description.slice(0, 120)}...`
                                    : plant.description}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        gap: 24
    }
});

export default LibraryScreen;
