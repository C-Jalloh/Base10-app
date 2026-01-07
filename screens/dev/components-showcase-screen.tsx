import {
    AppBadge,
    AppBottomSheet,
    AppButton,
    AppCard,
    AppColors,
    AppInput,
    AppText,
    IconButton
} from "@/components/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ComponentsShowcase = () => {
  const [inputValue, setInputValue] = React.useState("");
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <AppText variant="h1" style={styles.title}>UI Components</AppText>
        <AppText variant="body" color={AppColors.slate400} style={styles.subtitle}>
          Standardized building blocks for the Base100 App.
        </AppText>

        <Section title="Typography">
          <AppText variant="h1">Heading 1</AppText>
          <AppText variant="h2">Heading 2</AppText>
          <AppText variant="h3">Heading 3</AppText>
          <AppText variant="body">Body text - The quick brown fox jumps over the lazy dog.</AppText>
          <AppText variant="bodySmall">Body small - Standard informative text.</AppText>
          <AppText variant="caption">Caption text - Minor details and hints.</AppText>
          <AppText variant="label">LABEL TEXT</AppText>
          <AppText variant="tiny">TINY METADATA TEXT</AppText>
        </Section>

        <Section title="Buttons (Variants)">
          <View style={styles.row}>
            <AppButton title="Primary" onPress={() => {}} variant="primary" />
            <AppButton title="Secondary" onPress={() => {}} variant="secondary" />
          </View>
          <View style={styles.row}>
            <AppButton title="Outline" onPress={() => {}} variant="outline" />
            <AppButton title="Ghost" onPress={() => {}} variant="ghost" />
          </View>
          <View style={styles.row}>
            <AppButton title="Success" onPress={() => {}} variant="success" />
            <AppButton title="Danger" onPress={() => {}} variant="danger" />
            <AppButton title="Warning" onPress={() => {}} variant="warning" />
          </View>
        </Section>

        <Section title="Buttons (Sizes & Icons)">
          <View style={styles.row}>
            <AppButton title="Small" onPress={() => {}} size="sm" />
            <AppButton title="Medium" onPress={() => {}} size="md" />
            <AppButton title="Large" onPress={() => {}} size="lg" />
          </View>
          <View style={styles.row}>
            <AppButton title="With Icon" onPress={() => {}} icon="rocket-outline" />
            <AppButton title="Right Icon" onPress={() => {}} icon="arrow-forward" iconPosition="right" variant="secondary" />
          </View>
          <AppButton title="Full Width Button" onPress={() => {}} fullWidth />
          <AppButton title="Loading State" onPress={() => {}} loading />
        </Section>

        <Section title="Icon Buttons">
          <View style={styles.row}>
            <IconButton icon="search" onPress={() => {}} variant="filled" />
            <IconButton icon="notifications" onPress={() => {}} variant="outline" />
            <IconButton icon="settings" onPress={() => {}} variant="ghost" />
            <IconButton icon="add" onPress={() => {}} size="lg" />
            <IconButton icon="trash" onPress={() => {}} variant="outline" size="sm" />
          </View>
        </Section>

        <Section title="Cards">
          <AppCard variant="outline" style={styles.cardMargin}>
            <AppCard.Header title="Outline Card" subtitle="Default variant" />
            <AppCard.Content>
              <AppText variant="bodySmall">
                This is the revamped modular card. It now supports headers, content blocks, and footers.
              </AppText>
            </AppCard.Content>
            <AppCard.Footer>
              <AppButton title="Action" onPress={() => {}} size="sm" variant="ghost" />
            </AppCard.Footer>
          </AppCard>

          <AppCard variant="elevated" style={styles.cardMargin}>
            <AppCard.Cover source={{ uri: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop' }} />
            <AppCard.Header title="Elevated with Cover" />
            <AppCard.Content>
              <AppText variant="bodySmall">
                Cards can now have beautiful covers at the top.
              </AppText>
            </AppCard.Content>
          </AppCard>

          <AppCard variant="glass" style={styles.cardMargin} onPress={() => {}}>
            <AppCard.Header title="Interactive Glass" subtitle="Press me" />
            <AppCard.Content>
              <AppText variant="bodySmall">
                Glass cards are great for overlays. This one has a press handler.
              </AppText>
            </AppCard.Content>
          </AppCard>
        </Section>

        <Section title="Badges">
          <View style={styles.row}>
            <AppBadge label="Primary" variant="primary" />
            <AppBadge label="Success" variant="success" />
            <AppBadge label="Danger" variant="danger" />
          </View>
          <View style={styles.row}>
            <AppBadge label="Warning" variant="warning" />
            <AppBadge label="Info" variant="info" />
            <AppBadge label="Secondary" variant="secondary" />
          </View>
          <View style={styles.row}>
            <AppBadge label="Glass Badge" variant="glass" />
            <AppBadge label="Small" size="sm" variant="success" />
          </View>
        </Section>

        <Section title="Inputs">
          <AppInput 
            label="Email Address"
            placeholder="enter your email"
            value={inputValue}
            onChangeText={setInputValue}
            icon="mail-outline"
          />
          <AppInput 
            label="Password"
            placeholder="••••••••"
            value={inputValue}
            onChangeText={setInputValue}
            secureTextEntry
            icon="lock-closed-outline"
          />
          <AppInput 
            label="Input with Error"
            placeholder="Invalid value"
            value="Error value"
            onChangeText={() => {}}
            error="This field is required"
          />
          <AppInput 
            label="Input with Helper"
            placeholder="Optional field"
            value=""
            onChangeText={() => {}}
            helperText="This helps users understand what to type."
          />
        </Section>

        <Section title="Bottom Sheets">
          <AppButton 
            title="Open Bottom Sheet" 
            onPress={handleOpenSheet} 
            variant="primary" 
            icon="chevron-up" 
          />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>

      <AppBottomSheet 
        ref={bottomSheetRef} 
        title="Sheet Fragment"
      >
        <AppText variant="body" style={{ marginBottom: 24 }}>
          This is a reusable bottom sheet fragment. It supports snap points, backdrops, and native-feeling animations.
        </AppText>
        <AppButton 
          title="Close Sheet" 
          onPress={() => bottomSheetRef.current?.dismiss()} 
          variant="secondary" 
        />
      </AppBottomSheet>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <AppText variant="label" color={AppColors.primary} style={styles.sectionTitle}>{title}</AppText>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.slate950,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 40,
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
  },
  cardMargin: {
    marginBottom: 16,
  },
});

export default ComponentsShowcase;
