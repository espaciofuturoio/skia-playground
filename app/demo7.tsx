import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ResponsePad } from '@/components/ResponsePad';
import { CombinedScale } from "@/features/ScaleGrey/CombinedScale";
import type { GridItem } from "@/features/ScaleGrey/types";
import { router } from 'expo-router';
import { Confetti, type ConfettiMethods } from 'react-native-fast-confetti';
import { useRef, useState } from 'react';

// Initial configuration - two oranges
const initialLeftGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
];

const initialRightGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 0, col: 1, type: "lemon" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
];

// Configuration for eight lemons
const lemonLeftGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 1, col: 0, type: "lemon" },
];

const lemonRightGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 0, col: 1, type: "lemon" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
  { id: 5, row: 1, col: 1, type: "lemon" },
  { id: 6, row: 1, col: 2, type: "lemon" },
  { id: 7, row: 2, col: 0, type: "lemon" },
  { id: 8, row: 2, col: 1, type: "lemon" },
];

const redScaleGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
  { id: 2, row: 1, col: 0, type: "orange" },
  { id: 3, row: 0, col: 1, type: "lemon" },
  { id: 4, row: 1, col: 1, type: "lemon" },
  { id: 5, row: 0, col: 2, type: "lemon" },
];

// Define the options based on the context
const options = [
  { id: 'A', text: '8' },
  { id: 'B', text: '32' },
  { id: 'C', text: '88' },
  { id: 'D', text: '16' },
];

export default function Demo7Page() {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const confettiRef = useRef<ConfettiMethods>(null);

  // State to track which version of the grid to show
  const [showLemons, setShowLemons] = useState(false);
  // State to trigger animation
  const [isAnimating, setIsAnimating] = useState(false);
  // Current grids based on state
  const [leftGrid, setLeftGrid] = useState(initialLeftGrid);
  const [rightGrid, setRightGrid] = useState(initialRightGrid);

  const handleAnswerSubmit = (optionId: string, isCorrect: boolean) => {
    console.log(`Option ${optionId} selected, correct: ${isCorrect}`);
    setIsConfettiActive(isCorrect);

    if (isCorrect) {
      confettiRef.current?.restart();
    }
  };

  const handleBackPress = () => {
    router.push('/');
  };

  const handleSwitchFruits = () => {
    // Start the animation
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    // After animation completes, update the actual grid data
    if (showLemons) {
      setLeftGrid(initialLeftGrid);
      setRightGrid(initialRightGrid);
    } else {
      setLeftGrid(lemonLeftGrid);
      setRightGrid(lemonRightGrid);
    }
    setShowLemons(!showLemons);
    setIsAnimating(false);
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
          <CombinedScale
            leftGrid={leftGrid}
            rightGrid={rightGrid}
            redGrid={redScaleGrid}
            redDisplayValue="88"
            debug={false}
            scalesFontSize={25}
            fruitFontSize={19}
            animateItems={isAnimating}
            onAnimationComplete={handleAnimationComplete}
          />

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleSwitchFruits}
              disabled={isAnimating}
            >
              <Text style={styles.buttonText}>
                {showLemons ? 'Show 2 Oranges' : 'Show 8 Lemons'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.resultText}>
              {showLemons ? '8 lemons = 2 oranges' : '2 oranges = 8 lemons'}
            </Text>
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