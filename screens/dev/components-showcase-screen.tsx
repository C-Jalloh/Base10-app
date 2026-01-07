import React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { 
  AppButton, 
  IconButton, 
  AppCard, 
  AppText, 
  AppBadge, 
  AppColors,
  AppInput 
} from "@/components/ui";

const ComponentsShowcase = () => {
  const [inputValue, setInputValue] = React.useState("");

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
            <AppText variant="h3">Outline Card</AppText>
            <AppText variant="bodySmall" style={{ marginTop: 8 }}>
              This is the default card variant used for most content blocks.
            </AppText>
          </AppCard>

          <AppCard variant="elevated" style={styles.cardMargin}>
            <AppText variant="h3">Elevated Card</AppText>
            <AppText variant="bodySmall" style={{ marginTop: 8 }}>
              Used when you want the card to stand out with a shadow.
            </AppText>
          </AppCard>

          <AppCard variant="glass" style={styles.cardMargin}>
            <AppText variant="h3">Glass Card</AppText>
            <AppText variant="bodySmall" style={{ marginTop: 8 }}>
              Used for overlays or premium-feeling components.
            </AppText>
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

        <View style={{ height: 40 }} />
      </ScrollView>
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
