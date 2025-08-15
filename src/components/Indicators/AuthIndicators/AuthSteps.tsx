import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface AuthStepsProps {
  currentStep: number; // 1, 2, or 3
}

const AuthSteps: React.FC<AuthStepsProps> = ({ currentStep }) => {
  return (
    <View style={styles.MainContainerView}>
    <View style={styles.ContainerView}>
      {/* Background line (grey) */}
      <View style={[styles.LineView, { backgroundColor: '#303030' }]} />

      {/* Progress line (green, width based on currentStep) */}
      <View
        style={[
          styles.LineView,
          {
            backgroundColor: '#B2ED54',
            width: `${((currentStep - 0.3) / 2) * 100}%`, // 0%, 50%, 100%
          },
        ]}
      />

      {/* Circles */}
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={[
            styles.CirclesView,
            { backgroundColor: step <= currentStep ? '#B2ED54' : '#303030' },
          ]}
        />
      ))}
    </View>
    </View>
  );
};

export default AuthSteps

const styles = StyleSheet.create({
  MainContainerView: {
    width: '100%',
    paddingVertical: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContainerView: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  LineView: {
    position: 'absolute',
    top: '48%',
    left: 0,
    right: 0,
    height: 3,
  },
  CirclesView: {
    width: 24,
    height: 24,
    borderRadius: '100%',
    backgroundColor: '#B2ED54'
  }
})