import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { requestCameraPermission } from '../utils/permission';
import ButtonComponent from '../components/ButtonComponent';
import { COLORS } from '../configs/template';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '../configs/route';
import { PLANTS_DATA } from '../configs/data';
import { saveLabel } from '../utils/storage';

const ScannerScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');
    useEffect(() => {
        const checkPermissions = async () => {
            await requestCameraPermission();
        };

        checkPermissions();
    }, []);

    const takePicture = async () => {
        if (camera.current && device) {
            try {
                const photo = await camera.current.takePhoto({});
                const uri = `file://${photo.path}`;
                console.log(uri);
                await saveLabel(PLANTS_DATA[0].label);
                navigation.navigate(ROUTES.RESULT, { plant: PLANTS_DATA[0] });
            } catch (error) {
                console.error('Ошибка при съемке фото:', error);
            }
        }
    };

    const pickImage = async () => {
        await launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                selectionLimit: 1
            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    console.log(response.assets?.[0].uri);
                    await saveLabel(PLANTS_DATA[1].label);
                    navigation.navigate(ROUTES.RESULT, { plant: PLANTS_DATA[1] });
                }
            },
        );
    };

    const handleImage = async (uri: string) => {

    };

    if (!device) {
        return <View style={styles.permissionContainer}><Text>Камера табылмады.</Text></View>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" size={30} color={COLORS.GREEN} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}>
                    <Icon name="cloud-upload" size={30} color={COLORS.GREEN} />
                </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo={true}
                />
                <View style={styles.scanFrame} />
            </View>
            <ButtonComponent
                onPress={takePicture}
                title='Сканерлеу'
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        gap: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 24,
        position: 'relative',
    },
    scanFrame: {
        position: 'absolute',
        top: '25%',
        left: '15%',
        width: '70%',
        height: '50%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 24,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default ScannerScreen;
