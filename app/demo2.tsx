import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native";
import { Demo2 } from "@/features/demo2/Demo2";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Demo2Page() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Demo 2</Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Animation Effects Example</Text>
          </View>

          <View style={styles.canvasContainer}>
            <Demo2 />
          </View>

          <View style={[styles.description, { borderColor: theme.border }]}>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              This demo showcases animation capabilities using React Native Skia.
              It demonstrates how to create smooth, hardware-accelerated animations
              using the Skia rendering engine.
            </Text>
          </View>

          {/* Technical details section */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Animation Techniques
          </Text>

          <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              Skia Animation Methods
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • <Text style={{ fontWeight: "600" }}>useValue/useClock:</Text> For creating animated values
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • <Text style={{ fontWeight: "600" }}>useLoop:</Text> Create looping animations with minimal code
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • <Text style={{ fontWeight: "600" }}>useSpring:</Text> Physics-based spring animations
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • <Text style={{ fontWeight: "600" }}>useTiming:</Text> Time-based easing animations
              </Text>
            </View>
          </View>

          <View style={[styles.codeBlock, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.codeText, { color: theme.text }]}>
              {`// Basic animation example
const progress = useValue(0);
const animatedValue = useLoop({ 
  duration: 2000,
});

// Use in component
<Group transform={[{ rotate: animatedValue }]}>
  <Circle cx={r} cy={r} r={r} color="cyan" />
</Group>`}
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Performance Benefits
          </Text>

          <View style={[styles.performanceCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              Skia animations run on the GPU instead of the JavaScript thread, resulting in:
            </Text>
            <View style={styles.performanceMetrics}>
              <View style={[styles.metricItem, { backgroundColor: `${theme.accent}22`, borderColor: theme.accent }]}>
                <Text style={[styles.metricValue, { color: theme.accent }]}>60+</Text>
                <Text style={[styles.metricLabel, { color: theme.secondaryText }]}>FPS</Text>
              </View>
              <View style={[styles.metricItem, { backgroundColor: `${theme.accent}22`, borderColor: theme.accent }]}>
                <Text style={[styles.metricValue, { color: theme.accent }]}>~16ms</Text>
                <Text style={[styles.metricLabel, { color: theme.secondaryText }]}>Frame Time</Text>
              </View>
              <View style={[styles.metricItem, { backgroundColor: `${theme.accent}22`, borderColor: theme.accent }]}>
                <Text style={[styles.metricValue, { color: theme.accent }]}>Low</Text>
                <Text style={[styles.metricLabel, { color: theme.secondaryText }]}>CPU Usage</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              {
                backgroundColor: theme.card,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>← Back to Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  canvasContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  description: {
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    marginTop: 8,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 1,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  performanceCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  performanceMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  metricItem: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});