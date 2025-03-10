import type { ReactNode } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";

type DemoLayoutProps = {
  title: string;
  children: ReactNode;
};

export function DemoLayout({ title, children }: DemoLayoutProps) {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          {
            backgroundColor: theme.card,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={() => router.push("/")}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>← Back</Text>
      </Pressable>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>

        <View style={styles.canvasContainer}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  canvasContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
}); 