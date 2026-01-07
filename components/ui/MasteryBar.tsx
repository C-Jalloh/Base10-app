import { AppColors } from "@/constants/app-colors";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useDerivedValue,
  useSharedValue, 
  withSpring,
} from "react-native-reanimated";
import AppText from "./AppText";

interface MasteryBarProps {
  label: string;
  progress: number; // 0 to 1
  height?: number;
  showPercentage?: boolean;
}

const MasteryBar: React.FC<MasteryBarProps> = ({ 
  label, 
  progress, 
  height = 12, 
  showPercentage = true 
}) => {
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withSpring(progress, {
      damping: 15,
      stiffness: 100,
    });
  }, [progress]);

  const barWidth = useDerivedValue(() => {
    return animatedProgress.value * layoutWidth;
  }, [layoutWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="bodySmall" style={styles.label}>{label}</AppText>
        {showPercentage && (
          <AppText variant="tiny" color={AppColors.slate500}>
            {Math.round(progress * 100)}%
          </AppText>
        )}
      </View>
      
      <View 
        style={[styles.barContainer, { height }]}
        onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
      >
        <Canvas style={{ flex: 1 }}>
          {/* Background Track */}
          <Rect
            x={0}
            y={0}
            width={layoutWidth}
            height={height}
            color={AppColors.slate800}
          />
          
          {/* Progress Bar with Gradient */}
          <Rect
            x={0}
            y={0}
            width={barWidth}
            height={height}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(layoutWidth, 0)}
              colors={[AppColors.primary, AppColors.emerald500]}
            />
          </Rect>
        </Canvas>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontWeight: "500",
  },
  barContainer: {
    width: "100%",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: AppColors.slate800,
  },
});

export default MasteryBar;
