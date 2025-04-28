import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../configs/template";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({ navigation, children }: { navigation: StackNavigationProp<any, any>, children?: any }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={30} color={COLORS.GREEN} />
            </TouchableOpacity>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }
});

export default HeaderComponent;