import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { requestCameraPermission } from '../utils/permission';
import ButtonComponent from '../components/ButtonComponent';
import { COLORS } from '../configs/template';
import { SafeAreaView } from 'react-native-safe-area-context';
import mime from "mime";
import { ROUTES } from '../configs/route';
import { PLANTS_DATA } from '../configs/data';
import { saveLabel } from '../utils/storage';

const ScannerScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const [isLoading, setIsLoading] = useState(false);
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
                await handleImage(uri);
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
                    if (!response.assets?.[0].uri) {
                        Alert.alert("Жүктелмеді");
                        return;
                    }
                    await handleImage(response.assets?.[0].uri);
                }
            },
        );
    };

    const SERVER_URL = 'https://umemarket.kz/fastapi/predict';
    const handleImage = async (uri: string) => {
        setIsLoading(true);
        try {
            const newImageUri = "file:///" + uri.split("file:/").join("");
            const formData = new FormData();
            formData.append('file', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });

            const request = await fetch(SERVER_URL, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });
            if (!request.ok) {
                Alert.alert('Сурет жүктелмеді');
                setIsLoading(false);
                return;
            }

            const predictionResult = await request.json();
            let bestLabel = '';
            let maxProbability = -1;

            for (const label in predictionResult) {
                if (predictionResult[label] > maxProbability) {
                    maxProbability = predictionResult[label];
                    bestLabel = label;
                }
            }

            if (maxProbability > 0.5) {
                const foundedPlant = PLANTS_DATA.find(item => item.label === bestLabel);
                if (!foundedPlant) return;
                await saveLabel(bestLabel);
                navigation.navigate(ROUTES.RESULT, { plant: foundedPlant });
            } else {
                Alert.alert('Нәтижесі', 'Суреттегі объект анықталмады.');
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            Alert.alert('Сурет жүктелмеді');
            setIsLoading(false);
        }
    };

    if (!device) {
        return <View style={styles.permissionContainer}><Text>Камера табылмады.</Text></View>;
    }
    return (
        <SafeAreaView style={styles.container}>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.GREEN} />
                    <Text style={styles.loadingText}>Жүктелуде...</Text>
                </View>
            )}
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
    loadingContainer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 10,
    },
    loadingText: { marginTop: 10, color: 'white', fontSize: 16, }
});

export default ScannerScreen;
