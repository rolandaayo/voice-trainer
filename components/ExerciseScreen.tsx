import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PressCard } from "./PressCard";
import { Waveform } from "./Waveform";
import { C } from "./theme";

const EXERCISES = [
  {
    id: "warmup",
    icon: "🔥",
    title: "Vocal Warm-Up",
    duration: "5 min",
    level: "Beginner",
    color: C.teal,
  },
  {
    id: "pitch",
    icon: "🎵",
    title: "Pitch Control",
    duration: "8 min",
    level: "Intermediate",
    color: C.accent,
  },
  {
    id: "breath",
    icon: "💨",
    title: "Breath Support",
    duration: "6 min",
    level: "Beginner",
    color: C.gold,
  },
  {
    id: "resonance",
    icon: "🔊",
    title: "Resonance Training",
    duration: "10 min",
    level: "Advanced",
    color: "#FF6B6B",
  },
  {
    id: "articulation",
    icon: "👄",
    title: "Articulation Drills",
    duration: "7 min",
    level: "Intermediate",
    color: C.accentLight,
  },
  {
    id: "range",
    icon: "🎤",
    title: "Range Expansion",
    duration: "12 min",
    level: "Advanced",
    color: C.gold,
  },
];

export function ExerciseScreen({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState(false);
  const [selectedEx, setSelectedEx] = useState<string | null>(null);

  if (selectedEx) {
    const ex = EXERCISES.find((e) => e.id === selectedEx)!;
    return (
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <View style={s.topBar}>
          <TouchableOpacity
            onPress={() => setSelectedEx(null)}
            style={s.backBtn}
          >
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.topBarTitle}>{ex.title}</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 24, gap: 20 }}>
          <View style={[s.sessionCard, { borderColor: ex.color + "44" }]}>
            <View
              style={{ alignItems: "center", gap: 16, paddingVertical: 20 }}
            >
              <Text style={{ fontSize: 56 }}>{ex.icon}</Text>
              <Text style={s.sessionTitle}>{ex.title}</Text>
              <View style={s.sessionMeta}>
                <Text
                  style={[
                    s.badge,
                    { color: ex.color, backgroundColor: ex.color + "22" },
                  ]}
                >
                  {ex.level}
                </Text>
                <Text
                  style={[
                    s.badge,
                    { color: C.sub, backgroundColor: C.cardBorder },
                  ]}
                >
                  {ex.duration}
                </Text>
              </View>
              <Waveform
                color={ex.color}
                count={24}
                maxH={40}
                animate={active}
              />
              <TouchableOpacity
                onPress={() => setActive(!active)}
                style={[
                  s.recordBtn,
                  {
                    borderColor: active ? C.red : ex.color,
                    backgroundColor: active ? C.red + "22" : ex.color + "11",
                  },
                ]}
              >
                <View
                  style={[
                    s.recordDot,
                    { backgroundColor: active ? C.red : ex.color },
                  ]}
                />
              </TouchableOpacity>
              <Text style={s.sessionStatus}>
                {active ? "🔴 Session in progress..." : "Tap to begin session"}
              </Text>
            </View>
          </View>
          <View style={s.instructionCard}>
            <Text style={s.instructionTitle}>Instructions</Text>
            <Text style={s.instructionText}>
              1. Find a quiet space and sit or stand comfortably.{"\n"}
              2. Follow the on-screen waveform for timing cues.{"\n"}
              3. Match your voice to the target pitch shown.{"\n"}
              4. Take short breaks between repetitions.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backBtnText}>← Home</Text>
        </TouchableOpacity>
        <Text style={s.topBarTitle}>Exercises</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Text style={s.screenSub}>Pick a session and start training</Text>
        {EXERCISES.map((ex) => (
          <PressCard
            key={ex.id}
            style={[s.exCard, { borderLeftColor: ex.color }]}
            onPress={() => setSelectedEx(ex.id)}
          >
            <Text style={{ fontSize: 30 }}>{ex.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.exTitle}>{ex.title}</Text>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
                <Text style={[s.exBadge, { color: ex.color }]}>{ex.level}</Text>
                <Text style={s.exDuration}>⏱ {ex.duration}</Text>
              </View>
            </View>
            <Text style={{ color: C.muted, fontSize: 18 }}>›</Text>
          </PressCard>
        ))}
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
  screenSub: { color: C.muted, fontSize: 13, marginBottom: 4 },

  exCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderLeftWidth: 3,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  exTitle: { color: C.white, fontWeight: "700", fontSize: 15 },
  exBadge: { fontSize: 11, fontWeight: "700" },
  exDuration: { color: C.muted, fontSize: 11 },

  sessionCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  sessionTitle: { color: C.white, fontWeight: "800", fontSize: 20 },
  sessionMeta: { flexDirection: "row", gap: 8 },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sessionStatus: { color: C.muted, fontSize: 13 },
  recordBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  recordDot: { width: 36, height: 36, borderRadius: 18 },

  instructionCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  instructionTitle: { color: C.white, fontWeight: "700", fontSize: 15 },
  instructionText: { color: C.sub, fontSize: 13, lineHeight: 22 },
});
