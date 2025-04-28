import { PermissionsAndroid, Platform } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Камераны пайдалануға рұқсат',
                message: 'Қолданбаға камераны пайдалануға рұқсат қажет',
                buttonPositive: 'ОК',
                buttonNegative: 'Бас тарту',
            });
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};
