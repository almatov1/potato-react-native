import React from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../configs/template';
import ButtonComponent from '../components/ButtonComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '../configs/route';

const MainScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                alignItems: 'center'
            }}>
                <Image source={require('../assets/logotype.png')} style={{ width: 150, height: 110 }} />
                <Text style={{
                    color: COLORS.GREEN,
                    fontSize: 48,
                    fontWeight: 700
                }}>AgroScan</Text>
            </View>
            <View style={{
                gap: 24,
                width: '100%'
            }}>
                <ButtonComponent
                    onPress={() => navigation.navigate(ROUTES.SCANNER)}
                    title='Сканерлеуді бастау'
                />
                <View style={{
                    flexDirection: 'row',
                    gap: 24
                }}>
                    <TouchableHighlight
                        onPress={() => navigation.navigate(ROUTES.HISTORY)}
                        underlayColor={COLORS.WHITE_DARK}
                        style={styles.tab}
                    >
                        <View style={styles.tabItem}>
                            <Icon name="folder-open-outline" size={30} color={COLORS.GREEN} />
                            <Text>Мұрағат</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => navigation.navigate(ROUTES.LIBRARY)}
                        underlayColor={COLORS.WHITE_DARK}
                        style={styles.tab}
                    >
                        <View style={styles.tabItem}>
                            <Icon name="book-outline" size={30} color={COLORS.GREEN} />
                            <Text>Анықтамалық</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 56
    },
    tab: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: 16,
        borderRadius: 24
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
});

export default MainScreen;
