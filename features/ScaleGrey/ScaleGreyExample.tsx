import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScaleGrey } from './ScaleGrey';
import { createScaleGrids, create5x3Grids } from './gridUtils';

export const ScaleGreyExample = () => {
  // Create grids using utility functions
  const { leftGrid: leftGrid3x3, rightGrid: rightGrid3x3 } = createScaleGrids(3, 3, true);
  const { leftGrid: leftGrid5x3, rightGrid: rightGrid5x3 } = create5x3Grids(true);

  return (
    <View style={styles.container}>
      {/* Standard 3x3 grid */}
      <ScaleGrey
        leftGrid={leftGrid3x3}
        rightGrid={rightGrid3x3}
        displayValue="3x3 Grid"
      />

      {/* 5x3 grid with updated dimensions */}
      <ScaleGrey
        leftGrid={leftGrid5x3}
        rightGrid={rightGrid5x3}
        displayValue="5x3 Grid"
        gridColumns={5}
        gridRows={3}
        width={480}  // Slightly wider canvas to accommodate the 5 columns
        rightOffset={280}  // Adjusted right offset for better spacing
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
}); 