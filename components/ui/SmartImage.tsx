import { AppColors } from '@/constants/app-colors';
import { assetApi } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface SmartImageProps {
  filename: string;
  alt?: string;
  style?: any;
  quality?: 'low' | 'medium' | 'high' | 'auto';
}

export const SmartImage = ({ filename, alt, style, quality = 'auto' }: SmartImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // In a real app, you'd use @react-native-community/netinfo to detect network speed
  // For now we'll default to 'wifi' or 'high'
  const networkType = 'wifi'; 

  const imageUrl = assetApi.getImageUrl(filename, { 
    quality: quality === 'auto' ? undefined : quality,
    network: networkType 
  });

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={AppColors.primary} />
        </View>
      )}
      
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="image-outline" size={24} color={AppColors.slate400} />
        </View>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          contentFit="cover"
          transition={500}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: AppColors.slate800,
    borderRadius: 12,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.slate800,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
