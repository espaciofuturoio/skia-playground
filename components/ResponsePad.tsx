import type { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export interface Option {
  id: string;
  text: string;
}

interface ResponsePadProps {
  title: string;
  options: Option[];
  children?: ReactNode;
  correctOptionId?: string;
  onAnswerSubmit?: (optionId: string, isCorrect: boolean) => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const ResponsePad = ({
  title,
  options,
  children,
  correctOptionId,
  onAnswerSubmit,
  showBackButton = true,
  onBackPress
}: ResponsePadProps) => {
  const selectedOption = useSharedValue<string | null>(null);
  const isCorrect = useSharedValue(false);
  const shake = useSharedValue(0);
  const progress = useSharedValue(0);

  const handleOptionPress = (optionId: string) => {
    if (selectedOption.get() !== null) return;

    selectedOption.set(optionId);
    const correct = correctOptionId ? optionId === correctOptionId : false;
    isCorrect.set(correct);

    if (correct) {
      // Success animation
      progress.set(withSpring(1, {
        damping: 15,
        stiffness: 100
      }));
    } else {
      // Error animation
      shake.set(withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      ));
    }

    // Notify parent component
    onAnswerSubmit?.(optionId, correct);

    // Reset after delay
    setTimeout(() => {
      selectedOption.set(null);
      isCorrect.set(false);
      progress.set(withTiming(0));
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showBackButton && (
          <Pressable
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Ionicons name="arrow-back" size={24} color="#4B4B4B" />
          </Pressable>
        )}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              useAnimatedStyle(() => ({
                width: `${progress.get() * 100}%`,
              }))
            ]}
          />
        </View>
      </View>

      {/* Content Area */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* Question */}
        <Text style={styles.question}>
          {title}
        </Text>

        {/* Custom Content */}
        <View style={styles.childrenContainer}>
          {children}
        </View>
      </ScrollView>

      {/* Response Pad Grid */}
      <Animated.View
        style={[
          styles.responsePad,
          useAnimatedStyle(() => ({
            transform: [{ translateX: shake.get() }]
          }))
        ]}
      >
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            {options.slice(0, 2).map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) => [
                  styles.optionButton,
                  selectedOption.get() === option.id && styles.selectedOption,
                  pressed && styles.pressedOption
                ]}
                onPress={() => handleOptionPress(option.id)}
              >
                <Animated.View
                  style={[
                    styles.optionContent,
                    useAnimatedStyle(() => ({
                      backgroundColor: selectedOption.get() === option.id
                        ? isCorrect.get()
                          ? withTiming('#58CC02')
                          : withTiming('#FF4B4B')
                        : withTiming('#FFFFFF')
                    }))
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    selectedOption.get() === option.id && styles.selectedOptionText
                  ]}>
                    {option.text}
                  </Text>
                </Animated.View>
              </Pressable>
            ))}
          </View>

          <View style={styles.gridRow}>
            {options.slice(2, 4).map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) => [
                  styles.optionButton,
                  selectedOption.get() === option.id && styles.selectedOption,
                  pressed && styles.pressedOption
                ]}
                onPress={() => handleOptionPress(option.id)}
              >
                <Animated.View
                  style={[
                    styles.optionContent,
                    useAnimatedStyle(() => ({
                      backgroundColor: selectedOption.get() === option.id
                        ? isCorrect.get()
                          ? withTiming('#58CC02')
                          : withTiming('#FF4B4B')
                        : withTiming('#FFFFFF')
                    }))
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    selectedOption.get() === option.id && styles.selectedOptionText
                  ]}>
                    {option.text}
                  </Text>
                </Animated.View>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 150, // Add extra padding to account for response pad
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4B4B4B',
    textAlign: 'center',
  },
  childrenContainer: {
    flex: 1,
    alignItems: 'center', // Center children horizontally
    width: '100%',
  },
  responsePad: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  gridContainer: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedOption: {
    elevation: 0,
    shadowOpacity: 0,
  },
  pressedOption: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  optionContent: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B4B4B',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
}); 