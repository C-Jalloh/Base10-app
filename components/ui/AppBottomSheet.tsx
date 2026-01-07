import { AppColors } from "@/constants/app-colors";
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./AppText";

interface AppBottomSheetProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  title?: string;
  snapPoints?: (string | number)[];
  containerStyle?: ViewStyle;
}

const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  ({ children, title, snapPoints: customSnapPoints, containerStyle, ...props }, ref) => {
    // Default snap points if none provided
    const snapPoints = useMemo(() => customSnapPoints || ["25%", "50%", "90%"], [customSnapPoints]);

    // Backdrop component
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.background}
        {...props}
      >
        <BottomSheetView style={[styles.contentContainer, containerStyle]}>
          {title && (
            <View style={styles.header}>
              <AppText variant="h3" align="center">
                {title}
              </AppText>
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

AppBottomSheet.displayName = "AppBottomSheet";

const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.slate950,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  indicator: {
    backgroundColor: AppColors.slate700,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.slate900,
  },
});

export default AppBottomSheet;
