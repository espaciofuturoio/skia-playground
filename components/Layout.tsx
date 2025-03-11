import { type StyleProp, type ViewStyle, View, Platform, StyleSheet } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  onLayout?: () => void;
}

export const MainContainer = ({
  children,
  style,
  maxWidth = 1024,
  onLayout,
}: ContainerProps) => {
  return (
    <View
      style={[
        styles.outerContainer,
        Platform.OS === 'web' && { maxHeight: '100vh' }
      ]}
      onLayout={onLayout}
    >
      <View style={[
        styles.innerContainer,
        Platform.OS === 'web' && { maxWidth },
        style
      ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
});