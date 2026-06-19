import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { C, width } from "./theme";

export function ProgressScreen({ onBack }: { onBack: () => void }) {
  const bars = [40, 65, 50, 80, 70, 90, 85];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backBtnText}>← Home</Text>
        </TouchableOpacity>
        <Text style={s.topBarTitle}>My Progress</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        {/* Streak */}
        <View style={s.streakCard}>
          <Text style={{ fontSize: 40 }}>🔥</Text>
          <View>
            <Text style={s.streakNum}>7-Day Streak</Text>
            <Text style={s.streakSub}>You're on fire! Keep it up.</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          {[
            { v: "24", l: "Sessions" },
            { v: "3.5h", l: "Trained" },
            { v: "+1.5", l: "Octaves" },
          ].map((stat) => (
            <View key={stat.l} style={s.statBox}>
              <Text style={s.statVal}>{stat.v}</Text>
              <Text style={s.statLbl}>{stat.l}</Text>
            </View>
          ))}
        </View>

        {/* Chart */}
        <View style={s.chartCard}>
          <Text style={s.chartTitle}>This Week</Text>
          <View style={s.chartBars}>
            {bars.map((h, i) => (
              <View key={i} style={s.chartCol}>
                <View style={s.chartBarWrap}>
                  <View
                    style={[
                      s.chartBar,
                      {
                        height: h,
                        backgroundColor:
                          i === 6 ? C.accent : C.accentLight + "55",
                      },
                    ]}
                  />
                </View>
                <Text style={s.chartDay}>{days[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <Text style={s.sectionLabel}>Achievements</Text>
        <View style={s.achieveGrid}>
          {[
            { icon: "🎙", label: "First Session", done: true },
            { icon: "🔥", label: "7-Day Streak", done: true },
            { icon: "🎵", label: "Pitch Master", done: false },
            { icon: "🏆", label: "Top Performer", done: false },
          ].map((a) => (
            <View
              key={a.label}
              style={[s.achieveCard, !a.done && { opacity: 0.4 }]}
            >
              <Text style={{ fontSize: 28 }}>{a.icon}</Text>
              <Text style={s.achieveLabel}>{a.label}</Text>
              {a.done && <Text style={s.achieveDone}>✓</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  topBarTitle: { color: C.white, fontWeight: "700", fontSize: 16 },
  backBtn: { width: 60 },
  backBtnText: { color: C.accentLight, fontSize: 14, fontWeight: "600" },
  sectionLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
  },

  streakCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.gold + "33",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  streakNum: { color: C.white, fontWeight: "800", fontSize: 18 },
  streakSub: { color: C.muted, fontSize: 12, marginTop: 2 },

  statsRow: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 16,
  },
  statBox: { flex: 1, alignItems: "center", paddingVertical: 18 },
  statVal: { color: C.white, fontWeight: "800", fontSize: 22 },
  statLbl: { color: C.muted, fontSize: 11, marginTop: 3 },

  chartCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 16,
    padding: 20,
  },
  chartTitle: {
    color: C.white,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
  },
  chartCol: { alignItems: "center", flex: 1, gap: 6 },
  chartBarWrap: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  chartBar: { width: 16, borderRadius: 4 },
  chartDay: { color: C.muted, fontSize: 11 },

  achieveGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  achieveCard: {
    width: (width - 52) / 2,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  achieveLabel: {
    color: C.sub,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  achieveDone: { color: C.teal, fontSize: 16, fontWeight: "800" },
});
