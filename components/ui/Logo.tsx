import { AppColors } from '@/constants/app-colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LogoProps {
  size?: number;
  showText?: boolean;
  centered?: boolean;
}

export const Logo = ({ size = 40, showText = false, centered = false }: LogoProps) => {
  const iconSize = size * 0.6;
  
  return (
    <View style={[styles.container, centered && styles.centeredContainer]}>
      <View style={[styles.logoBox, { width: size, height: size }, centered && styles.centeredLogo]}>
        <MaterialCommunityIcons name="brain" size={iconSize} color="white" />
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.brandText}>
            <Text style={styles.baseText}>Base</Text>
            <Text style={styles.tenText}>10</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  centeredContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', // Default to left for now, but can be changed
  },
  centeredLogo: {
    marginBottom: 12,
  },
  logoBox: {
    backgroundColor: AppColors.primary, // Emerald 500
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for depth
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textContainer: {
    flexDirection: 'row',
  },
  brandText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: AppColors.textPrimary,
  },
  baseText: {
    color: AppColors.textPrimary,
  },
  tenText: {
    color: AppColors.primary,
  },
});
