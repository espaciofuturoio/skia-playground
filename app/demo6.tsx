import { View } from 'react-native';
import { ResponsePad } from '@/components/ResponsePad';
import { ScaleGrey } from "@/features/ScaleGrey/ScaleGrey";
import { ScaleRed } from "@/features/ScaleGrey/ScaleRed";
import type { GridItem } from "@/features/ScaleGrey/types";
import { router } from 'expo-router';
import { Confetti } from 'react-native-fast-confetti';
import { useState } from 'react';

const greyScaleLeftGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
];

const greyScaleRightGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 0, col: 1, type: "lemon" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
];

const redScaleGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
  { id: 2, row: 0, col: 1, type: "orange" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
  { id: 5, row: 1, col: 1, type: "lemon" },
];

// Define the options based on the context
const options = [
  { id: 'A', text: '8' },
  { id: 'B', text: '32' },
  { id: 'C', text: '88' },
  { id: 'D', text: '16' },
];

export default function Demo6Page() {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const handleAnswerSubmit = (optionId: string, isCorrect: boolean) => {
    console.log(`Option ${optionId} selected, correct: ${isCorrect}`);
    if (isCorrect) {
      setIsConfettiActive(true);
    } 
  };

  const handleBackPress = () => {
    router.push('/');
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
          <ScaleGrey leftGrid={greyScaleLeftGrid} rightGrid={greyScaleRightGrid} debug={false} />
          <ScaleRed grid={redScaleGrid} displayValue="88" debug={false} />
        </View>
      </ResponsePad>
      {isConfettiActive && <Confetti fadeOutOnEnd />}
    </View>
  );
}