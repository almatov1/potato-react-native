import { PermissionsAndroid, Platform } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Разрешение на использование камеры',
                message: 'Приложению требуется разрешение на использование камеры',
                buttonPositive: 'ОК',
                buttonNegative: 'Отмена',
            });
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};
