import { View, StyleSheet, Pressable, ScrollView, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";
import { Home } from "@/features/home/Home";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Index() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  const navigateTo = (path: "/demo1" | "/demo2" | "/demo3" | "/demo4") => {
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

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore Skia Demos</Text>

          <View style={styles.buttonContainer}>
            {[
              { id: "demo1", route: "/demo1" as const, title: "SVG Rendering" },
              { id: "demo2", route: "/demo2" as const, title: "Animation Effects" },
              { id: "demo3", route: "/demo3" as const, title: "SVG Scaling" },
              { id: "demo4", route: "/demo4" as const, title: "SVG No Scaling" },
            ].map((demo) => (
              <Pressable
                key={demo.id}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: theme.card,
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                onPress={() => navigateTo(demo.route)}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>{demo.title}</Text>
              </Pressable>
            ))}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
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
  buttonContainer: {
    gap: 16,
    marginVertical: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
