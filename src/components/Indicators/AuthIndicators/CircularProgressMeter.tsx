import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import TextScallingFalse from '../../TextScallingFalse';

const CompleteCircle = () => {
  const size = 255; // Outer size
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 80;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // Function to get point coordinates from angle
  const polarToCartesian = (angle: number) => {
    const a = (angle - 90) * (Math.PI / 180.0);
    const x = size / 2 + radius * Math.cos(a);
    const y = size / 2 + radius * Math.sin(a);
    return { x, y };
  };

  // Start circle position (0%)
  const start = polarToCartesian(0);
  // End circle position (progress%)
  const end = polarToCartesian(progress * 3.6); // 100% = 360°

  return (
    <View style={styles.componentView}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke="#303030"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <Circle
          stroke="#BAFF4C"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />

        {/* White start circle */}
        <Circle cx={start.x} cy={start.y} r={strokeWidth / 2} fill="white" />

        {/* White end circle */}
        <Circle cx={end.x} cy={end.y} r={strokeWidth / 2} fill="white" />
      </Svg>

      {/* Percentage text */}
      <View style={styles.textContainer}>
        <TextScallingFalse style={styles.percentageText}>{progress}%</TextScallingFalse>
        <TextScallingFalse style={styles.TextStyle}>Completed</TextScallingFalse>
      </View>
    </View>
  );
};

export default CompleteCircle;

const styles = StyleSheet.create({
  componentView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 55,
    fontWeight: 'semibold',
    color: 'white',
  },
  TextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
});
