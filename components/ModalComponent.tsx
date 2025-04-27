import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import ButtonComponent from "./ButtonComponent";

const ModalComponent = ({ isVisible, onClose, title, message, buttonText, onButtonPress }: { isVisible: boolean, onClose: () => void, title: string, message: string, buttonText: string, onButtonPress: () => void }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
            <View style={styles.modalContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                {message && <Text style={styles.message}>{message}</Text>}
                {buttonText && (
                    <ButtonComponent
                        onPress={onButtonPress}
                        title={buttonText}
                    />
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 24,
        gap: 24,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default ModalComponent;