import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ResponsePad } from '@/components/ResponsePad';
import type { GridItem } from "@/features/ScaleGrey/types";
import { router } from 'expo-router';
import { Confetti, type ConfettiMethods } from 'react-native-fast-confetti';
import { useRef, useState } from 'react';
import { CombinedScaleSVGNative } from '@/features/ScaleGreySVGNative/CombinedScaleSVGNative';

const randomUUID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Initial configuration - two oranges
const initialGreyLeftGrid: GridItem[] = [
  { id: randomUUID(), row: 0, col: 0, type: "orange" },
];

const initialGreyRightGrid: GridItem[] = [
  { id: randomUUID(), row: 0, col: 0, type: "lemon" },
  { id: randomUUID(), row: 0, col: 1, type: "lemon" },
  { id: randomUUID(), row: 0, col: 2, type: "lemon" },
  { id: randomUUID(), row: 1, col: 0, type: "lemon" },
];

const secondRedGrid: GridItem[] = [
  { id: randomUUID(), row: 0, col: 0, type: "lemon" },
  { id: randomUUID(), row: 0, col: 1, type: "lemon" },
  { id: randomUUID(), row: 0, col: 2, type: "lemon" },
  { id: randomUUID(), row: 0, col: 3, type: "lemon" },
  { id: randomUUID(), row: 1, col: 0, type: "lemon" },
  { id: randomUUID(), row: 1, col: 1, type: "lemon" },
  { id: randomUUID(), row: 1, col: 2, type: "lemon" },
  { id: randomUUID(), row: 1, col: 3, type: "lemon" },
  { id: randomUUID(), row: 2, col: 0, type: "lemon" },
  { id: randomUUID(), row: 2, col: 1, type: "lemon" },
  { id: randomUUID(), row: 2, col: 2, type: "lemon" },
];

const firstRedGrid: GridItem[] = [
  { id: randomUUID(), row: 0, col: 0, type: "orange" },
  { id: randomUUID(), row: 1, col: 0, type: "orange" },
  { id: randomUUID(), row: 0, col: 1, type: "lemon" },
  { id: randomUUID(), row: 1, col: 1, type: "lemon" },
  { id: randomUUID(), row: 0, col: 2, type: "lemon" },
];

// Define the options based on the context
const options = [
  { id: 'A', text: '8' },
  { id: 'B', text: '32' },
  { id: 'C', text: '88' },
  { id: 'D', text: '16' },
];

export default function Demo8Page() {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const confettiRef = useRef<ConfettiMethods>(null);
  const [currentRedGrid, setCurrentRedGrid] = useState<GridItem[]>(firstRedGrid);
  const handleAnswerSubmit = (optionId: string, isCorrect: boolean) => {
    console.log(`Option ${optionId} selected, correct: ${isCorrect}`);
    setIsConfettiActive(isCorrect);
    if (isCorrect) confettiRef.current?.restart();
  };

  const handleBackPress = () => {
    router.push('/');
  };

  const handleSwitchFruits = () => {
    setCurrentRedGrid(currentRedGrid === firstRedGrid ? secondRedGrid : firstRedGrid);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
      <ResponsePad
        title="¿Cuanto pesa una naranja?"
        options={options}
        correctOptionId="B"
        onAnswerSubmit={handleAnswerSubmit}
        onBackPress={handleBackPress}
      >
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <CombinedScaleSVGNative
            greyLeftGrid={initialGreyLeftGrid}
            greyRightGrid={initialGreyRightGrid}
            redGrid={currentRedGrid}
            redDisplayValue="88"
            debug={true}
            scalesFontSize={25}
            fruitFontSize={19}
            scale={1}
          />

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleSwitchFruits}
            >
              <Text style={styles.buttonText}>
                Animate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ResponsePad>
      {isConfettiActive && <Confetti ref={confettiRef} fadeOutOnEnd isInfinite={false} fallDuration={3000} />}
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  }
});