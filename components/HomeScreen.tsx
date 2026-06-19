import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PressCard } from "./PressCard";
import { Waveform } from "./Waveform";
import { C, Screen } from "./theme";

export function HomeScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const dailyExercises = [
    { icon: "🔥", title: "Morning Warm-Up", duration: "5 min", color: C.teal },
    { icon: "🎵", title: "Pitch Control", duration: "8 min", color: C.accent },
    { icon: "💨", title: "Breath Support", duration: "6 min", color: C.gold },
  ];

  const quickActions = [
    {
      icon: "🎙",
      label: "Quick Record",
      color: C.accent,
      screen: "exercise" as Screen,
    },
    {
      icon: "📊",
      label: "Progress",
      color: C.teal,
      screen: "progress" as Screen,
    },
    {
      icon: "🏆",
      label: "Challenges",
      color: C.gold,
      screen: "progress" as Screen,
    },
    {
      icon: "👤",
      label: "Profile",
      color: C.accentLight,
      screen: "profile" as Screen,
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.bg }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerGlow} />
        <View style={s.headerTop}>
          <View>
            <Text style={s.greeting}>Good morning 👋</Text>
            <Text style={s.title}>Alex Voice Academy</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate("profile")}
            style={s.avatarSm}
          >
            <Text style={{ fontSize: 22 }}>🎤</Text>
          </TouchableOpacity>
        </View>

        <View style={s.streakBadge}>
          <Text style={s.streakText}>
            🔥 7-Day Streak · 24 Sessions Completed
          </Text>
        </View>

        {/* Focus card */}
        <TouchableOpacity
          onPress={() => navigate("exercise")}
          activeOpacity={0.85}
          style={s.focusCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={s.focusLabel}>TODAY'S FOCUS</Text>
            <Text style={s.focusTitle}>Vocal Range{"\n"}Expansion</Text>
            <View style={s.focusCta}>
              <Text style={s.focusCtaText}>Start Training →</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end", gap: 10 }}>
            <Text style={{ fontSize: 40 }}>🎤</Text>
            <Waveform color="rgba(255,255,255,0.7)" count={10} maxH={28} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, gap: 24 }}>
        {/* Quick actions */}
        <View>
          <Text style={s.sectionLabel}>Quick Actions</Text>
          <View style={s.quickGrid}>
            {quickActions.map((a) => (
              <PressCard
                key={a.label}
                style={[s.quickCard, { borderColor: a.color + "33" }]}
                onPress={() => navigate(a.screen)}
              >
                <View
                  style={[s.quickIcon, { backgroundColor: a.color + "22" }]}
                >
                  <Text style={{ fontSize: 22 }}>{a.icon}</Text>
                </View>
                <Text style={s.quickLabel}>{a.label}</Text>
              </PressCard>
            ))}
          </View>
        </View>

        {/* Today's plan */}
        <View>
          <View style={s.rowBetween}>
            <Text style={s.sectionLabel}>Today's Plan</Text>
            <TouchableOpacity onPress={() => navigate("exercise")}>
              <Text style={s.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10 }}>
            {dailyExercises.map((ex, i) => (
              <PressCard
                key={ex.title}
                style={[s.dailyCard, { borderLeftColor: ex.color }]}
                onPress={() => navigate("exercise")}
              >
                <Text style={{ fontSize: 26 }}>{ex.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.dailyTitle}>{ex.title}</Text>
                  <Text style={s.dailyDur}>⏱ {ex.duration}</Text>
                </View>
                <View
                  style={[s.dailyNum, { backgroundColor: ex.color + "22" }]}
                >
                  <Text style={[s.dailyNumText, { color: ex.color }]}>
                    {i + 1}
                  </Text>
                </View>
              </PressCard>
            ))}
          </View>
        </View>

        {/* Tip */}
        <View style={s.tipCard}>
          <Text style={s.tipTitle}>💡 Coach's Tip</Text>
          <Text style={s.tipText}>
            Humming is one of the best ways to warm up your vocal cords. Try 2
            minutes of gentle humming at a comfortable pitch before every
            session.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    overflow: "hidden",
    gap: 14,
  },
  headerGlow: {
    position: "absolute",
    top: -40,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: C.accentGlow,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: C.muted, fontSize: 13, marginBottom: 2 },
  title: {
    color: C.white,
    fontWeight: "800",
    fontSize: 22,
    letterSpacing: -0.3,
  },
  avatarSm: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.accentGlow,
    borderWidth: 1.5,
    borderColor: C.accent + "55",
    alignItems: "center",
    justifyContent: "center",
  },
  streakBadge: {
    alignSelf: "flex-start",
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  streakText: { color: C.sub, fontSize: 12, fontWeight: "500" },

  focusCard: {
    backgroundColor: C.accent,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: C.accent,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
  },
  focusLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  focusTitle: {
    color: C.white,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  focusCta: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  focusCtaText: { color: C.white, fontWeight: "700", fontSize: 13 },

  sectionLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAll: { color: C.accentLight, fontSize: 13, fontWeight: "600" },

  quickGrid: { flexDirection: "row", gap: 10 },
  quickCard: {
    flex: 1,
    backgroundColor: C.card,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 8,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: { color: C.sub, fontSize: 11, fontWeight: "600" },

  dailyCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderLeftWidth: 3,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  dailyTitle: { color: C.white, fontWeight: "700", fontSize: 14 },
  dailyDur: { color: C.muted, fontSize: 12, marginTop: 3 },
  dailyNum: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dailyNumText: { fontWeight: "800", fontSize: 14 },

  tipCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.gold + "33",
    borderRadius: 16,
    padding: 18,
    gap: 8,
  },
  tipTitle: { color: C.gold, fontWeight: "700", fontSize: 14 },
  tipText: { color: C.sub, fontSize: 13, lineHeight: 20 },
});
