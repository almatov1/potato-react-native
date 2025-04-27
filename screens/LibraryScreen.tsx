import React from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../configs/template';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PLANTS_DATA } from '../configs/data';
import { ROUTES } from '../configs/route';
import Icon from 'react-native-vector-icons/Ionicons';

const LibraryScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
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
                {PLANTS_DATA.map((plant) => (
                    <TouchableOpacity key={plant.label} onPress={() => navigation.navigate(ROUTES.RESULT, { plant })} style={{
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
                        <View>
                            <Text style={{ color: COLORS.GREEN, fontSize: 20, fontWeight: 600 }}>{plant.name}</Text>
                            <Text style={{ color: COLORS.GREEN, fontSize: 14 }}>
                                {plant.description.length > 200
                                    ? `${plant.description.slice(0, 150)}...`
                                    : plant.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView >
        </SafeAreaView >
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
        padding: 24,
    }
});

export default LibraryScreen;
