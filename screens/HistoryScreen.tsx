import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../configs/template';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Plant, PLANTS_DATA } from '../configs/data';
import { ROUTES } from '../configs/route';
import Icon from 'react-native-vector-icons/Ionicons';
import { clearLabels, getLabels, HistoryItem } from '../utils/storage';

const HistoryScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const storedHistory = await getLabels();
            setHistory(storedHistory);
        };

        fetchHistory();
    }, []);

    const getPlantByLabel = (label: string): Plant | undefined => {
        return PLANTS_DATA.find(plant => plant.label === label);
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('kk-KZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
        } catch (error) {
            console.error('Ошибка при форматировании даты:', error);
            return dateString;
        }
    };

    const renderItem = ({ item }: { item: HistoryItem }) => {
        const plant = getPlantByLabel(item.label);
        if (!plant) {
            return null;
        }
        return (
            <TouchableOpacity
                key={`${item.date}${item.label}`}
                onPress={() => navigation.navigate(ROUTES.RESULT, { plant })}
                style={{ flexDirection: 'row', gap: 24 }}
            >
                <ImageBackground
                    source={plant.image}
                    style={{ width: 100, height: 100 }}
                    imageStyle={{ resizeMode: 'cover', borderRadius: 16 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.GREEN, fontSize: 20, fontWeight: '600' }}>{plant.name}</Text>
                    <Text style={{ color: COLORS.GREEN, fontSize: 14 }}>{formatDate(item.date)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{
                rowGap: 24
            }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back-outline" size={30} color={COLORS.GREEN} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        await clearLabels();
                        navigation.replace(ROUTES.HISTORY);
                    }}>
                        <Icon name="trash-outline" size={30} color={COLORS.GREEN} />
                    </TouchableOpacity>
                </View>
                {history.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Мұрағатта жазбалар табылмады.</Text>
                    </View>
                ) : (history.map((item) => renderItem({ item })))}
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
        padding: 24
    }
});

export default HistoryScreen;