import { AppColors } from "@/constants/app-colors";
import { 
  Canvas, 
  Path, 
  Skia, 
  Text, 
  useFont, 
  vec,
  Circle,
  Line
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { 
  useAnimatedProps, 
  useDerivedValue, 
  useSharedValue, 
  withSpring 
} from "react-native-reanimated";

interface RadarData {
  label: string;
  value: number; // 0 to 1
}

interface PerformanceRadarProps {
  data: RadarData[];
  size?: number;
  padding?: number;
}

const PerformanceRadar: React.FC<PerformanceRadarProps> = ({ 
  data, 
  size = 300, 
  padding = 40 
}) => {
  const center = size / 2;
  const radius = center - padding;
  const angleStep = (Math.PI * 2) / data.length;

  // Web-safe or standard font for labels
  // Note: Skia requires platform-specific font loading if you want custom ones.
  // For now, we'll focus on the geometry.

  const animatedValues = data.map(d => useSharedValue(d.value));

  React.useEffect(() => {
    data.forEach((d, i) => {
      animatedValues[i].value = withSpring(d.value);
    });
  }, [data]);

  // Generate background grid (3 levels)
  const gridPaths = useMemo(() => {
    return [0.33, 0.66, 1].map(level => {
      const path = Skia.Path.Make();
      const levelRadius = radius * level;
      
      data.forEach((_, i) => {
        const x = center + levelRadius * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + levelRadius * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) path.moveTo(x, y);
        else path.lineTo(x, y);
      });
      path.close();
      return path;
    });
  }, [data.length, radius, center, angleStep]);

  // Generate data path (animated)
  // We'll use useDerivedValue to build the path string or Skia Path
  const dataPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    data.forEach((_, i) => {
      const currentRadius = radius * animatedValues[i].value;
      const x = center + currentRadius * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + currentRadius * Math.sin(i * angleStep - Math.PI / 2);
      if (i === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    });
    path.close();
    return path;
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas style={{ flex: 1 }}>
        {/* Axes */}
        {data.map((_, i) => {
          const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <Line
              key={`axis-${i}`}
              p1={vec(center, center)}
              p2={vec(x, y)}
              color={AppColors.slate800}
              strokeWidth={1}
            />
          );
        })}

        {/* Grid lines */}
        {gridPaths.map((path, i) => (
          <Path
            key={`grid-${i}`}
            path={path}
            color={AppColors.slate800}
            style="stroke"
            strokeWidth={1}
          />
        ))}

        {/* Data Shape */}
        <Path
          path={dataPath}
          color={AppColors.primary + "66"} // Transparent primary
          style="fill"
        />
        <Path
          path={dataPath}
          color={AppColors.primary}
          style="stroke"
          strokeWidth={2}
        />

        {/* Data points */}
        {data.map((_, i) => {
          return <DataPoint 
            key={`point-${i}`}
            index={i}
            radius={radius}
            center={center}
            angleStep={angleStep}
            animatedValue={animatedValues[i]}
          />
        })}
      </Canvas>
    </View>
  );
};

const DataPoint = ({ index, radius, center, angleStep, animatedValue }: any) => {
  const cx = useDerivedValue(() => center + radius * animatedValue.value * Math.cos(index * angleStep - Math.PI / 2));
  const cy = useDerivedValue(() => center + radius * animatedValue.value * Math.sin(index * angleStep - Math.PI / 2));
  
  return (
    <Circle
      cx={cx}
      cy={cy}
      r={4}
      color={AppColors.primary}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});

export default PerformanceRadar;
