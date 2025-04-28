import { Text, TouchableHighlight } from "react-native";
import { COLORS } from "../configs/template";

const ButtonComponent = ({ onPress, title, backgroundColor = COLORS.GREEN, textColor = COLORS.WHITE }: { onPress: () => void; title: string, backgroundColor?: string; textColor?: string }) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={COLORS.GREEN_DARK}
            style={{
                backgroundColor: backgroundColor,
                borderRadius: 100,
                paddingVertical: 20,
                paddingHorizontal: 20,
                alignItems: 'center',
                width: '100%'
            }}>
            <Text style={{
                color: textColor,
                fontSize: 20,
                fontWeight: 600
            }}>{title}</Text>
        </TouchableHighlight>
    );
};

export default ButtonComponent;