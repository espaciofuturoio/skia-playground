import { Text, View, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Home } from "@/features/home/Home";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Index() {

  const router = useRouter();
  const theme = useContext(ThemeContext);

  const navigateTo = (path: "/demo1" | "/demo2") => {
    router.push(path);
  };

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
            <Text style={[styles.title, { color: theme.text }]}>Skia Playground</Text>
          </View>

          <View style={styles.canvasContainer}>
            <Home />
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Demos
          </Text>

          <View style={styles.cardContainer}>
            {[
              { id: "demo1", title: "Demo 1", route: "/demo1" as const, description: "SVG Rendering" },
              { id: "demo2", title: "Demo 2", route: "/demo2" as const, description: "Animation Effects" },
            ].map((demo) => (
              <Pressable
                key={demo.id}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    shadowColor: theme.shadowColor,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                onPress={() => navigateTo(demo.route)}
              >
                <Text style={[styles.cardTitle, { color: theme.text }]}>{demo.title}</Text>
                <Text style={[styles.cardDescription, { color: theme.secondaryText }]}>{demo.description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={[styles.cardLink, { color: theme.accent }]}>Explore →</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Add some additional content to demonstrate scrolling */}
          <View style={styles.additionalSection}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              About Skia
            </Text>
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Text style={[styles.infoText, { color: theme.text }]}>
                Skia is a complete 2D graphics library for drawing text, geometries, and images.
                React Native Skia brings the Skia graphics library to React Native.
                It provides a set of declarative components for drawing 2D graphics with an API that
                is easy to use and familiar to React and React Native developers.
              </Text>
              <Text style={[styles.infoText, { color: theme.text, marginTop: 12 }]}>
                Skia serves as the graphics engine for Google Chrome and Chrome OS, Android, Flutter,
                Mozilla Firefox, Firefox OS, and many other products.
              </Text>
            </View>
          </View>
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
    fontSize: 14,
    opacity: 0.7,
  },
  canvasContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: 150,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  cardFooter: {
    marginTop: "auto",
  },
  cardLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  additionalSection: {
    marginBottom: 40,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
