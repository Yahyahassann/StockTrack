import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useProducts from '@/src/ hooks/useProducts';

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const { products } = useProducts();

  const stats = {
    total: products.length,
    lowStock: products.filter((p: any) => p.quantity < 10).length,
    categories: [...new Set(products.map((p: any) => p.category))].length,
    totalValue: products.reduce((sum: number, p: any) => sum + (p.price * p.quantity), 0),
  };

  const quickActions = [
    { icon: "add-circle", label: "Add Product", color: "#4CAF50", route: "/product/create" },
    { icon: "list", label: "All Products", color: "#2196F3", route: "/products" },
    { icon: "stats-chart", label: "Analytics", color: "#FF9800", route: "/products" },
    { icon: "settings", label: "Settings", color: "#9C27B0", route: "/products" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#667eea", "#764ba2", "#f093fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="cube" size={60} color="#fff" />
          <Text style={styles.title}>StockTrack</Text>
          <Text style={styles.subtitle}>Inventory Management System</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="cube-outline" size={32} color="#2196F3" />
              <Text style={styles.statValue}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total Products</Text>
            </View>
           
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: "#F3E5F5" }]}>
              <Ionicons name="grid-outline" size={32} color="#9C27B0" />
              <Text style={styles.statValue}>{stats.categories}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
           
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={28} color="#fff" />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    marginTop: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    marginTop: -20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  featuresList: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
});
