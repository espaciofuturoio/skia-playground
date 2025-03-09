import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native";
import { Demo1 } from "@/features/demo1/Demo1";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Demo1Page() {
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
            <Text style={[styles.title, { color: theme.text }]}>Demo 1</Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>SVG Rendering Example</Text>
          </View>

          <View style={styles.canvasContainer}>
            <Demo1 />
          </View>

          <View style={[styles.description, { borderColor: theme.border }]}>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              This demo showcases SVG rendering capabilities using React Native Skia.
              The SVG is loaded from a string and rendered directly to the canvas.
            </Text>
          </View>

          {/* Technical details section */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Technical Details
          </Text>

          <View style={[styles.codeBlock, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.codeText, { color: theme.text }]}>
              {`// Load SVG from string
const svg = Skia.SVG.MakeFromString(svgString);

// Render to canvas
<Canvas style={{ width, height }}>
  <ImageSVG
    svg={svg}
    x={0}
    y={0}
    width={290}
    height={500}
  />
</Canvas>`}
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              Key Advantages
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • Hardware-accelerated rendering for smooth performance
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • Cross-platform compatibility with the same codebase
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • High-quality vector graphics that scale without pixelation
              </Text>
              <Text style={[styles.bulletPoint, { color: theme.text }]}>
                • Support for complex SVG features like gradients and paths
              </Text>
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
    marginVertical: 24,
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