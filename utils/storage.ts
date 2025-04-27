import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'history_labels';
export interface HistoryItem {
    label: string;
    date: string;
}

export const saveLabel = async (label: string): Promise<void> => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const history: HistoryItem[] = existing ? JSON.parse(existing) : [];

        const newItem: HistoryItem = {
            label,
            date: new Date().toISOString(),
        };
        history.unshift(newItem);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Ошибка при сохранении label:', error);
    }
};

export const getLabels = async (): Promise<HistoryItem[]> => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        return existing ? JSON.parse(existing) : [];
    } catch (error) {
        console.error('Ошибка при получении labels:', error);
        return [];
    }
};

export const clearLabels = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Ошибка при очистке labels:', error);
    }
};
