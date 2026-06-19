import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { C, Screen } from "./theme";

function AuthInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[s.inputWrap, focused && s.inputFocused]}>
      <Text style={s.inputIcon}>{icon}</Text>
      <TextInput
        style={s.input}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

export function CreateAccountScreen({
  navigate,
}: {
  navigate: (s: Screen) => void;
}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [goal, setGoal] = useState<string | null>(null);

  const goals = [
    { id: "singer", icon: "🎵", label: "Singer" },
    { id: "speaker", icon: "🎤", label: "Public Speaker" },
    { id: "podcast", icon: "🎙", label: "Podcaster" },
    { id: "actor", icon: "🎭", label: "Actor" },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={s.logoWrap}>
          <View style={s.logoBubble}>
            <Text style={{ fontSize: 44 }}>🎙</Text>
          </View>
          <Text style={s.logoTitle}>Create Account</Text>
          <Text style={s.logoSub}>Start your voice journey today</Text>
        </View>

        {/* Card */}
        <View style={s.card}>
          <Text style={s.heading}>Join Alex Voice Academy</Text>
          <Text style={s.subheading}>Free forever · Premium from $4.99/mo</Text>

          <View style={{ gap: 12, marginTop: 24 }}>
            <AuthInput
              icon="👤"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />
            <AuthInput
              icon="🔖"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <AuthInput
              icon="🔒"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <AuthInput
              icon="🔒"
              placeholder="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
          </View>

          {/* Goal selector */}
          <Text style={s.goalLabel}>I want to train as a…</Text>
          <View style={s.goalRow}>
            {goals.map((g) => (
              <TouchableOpacity
                key={g.id}
                onPress={() => setGoal(g.id)}
                style={[s.goalChip, goal === g.id && s.goalChipActive]}
              >
                <Text style={{ fontSize: 16 }}>{g.icon}</Text>
                <Text
                  style={[s.goalChipText, goal === g.id && { color: C.white }]}
                >
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => navigate("payment")}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>Create Account</Text>
          </TouchableOpacity>

          <Text style={s.termsText}>
            By signing up you agree to our{" "}
            <Text style={{ color: C.accentLight }}>Terms of Service</Text> and{" "}
            <Text style={{ color: C.accentLight }}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={s.switchRow}>
          <Text style={s.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate("login")}>
            <Text style={s.switchLink}>Sign in →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },

  logoWrap: { alignItems: "center", gap: 10, marginBottom: 32, marginTop: 16 },
  logoBubble: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: C.accentGlow,
    borderWidth: 2,
    borderColor: C.accent + "55",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.accent,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
  },
  logoTitle: {
    color: C.white,
    fontWeight: "800",
    fontSize: 22,
    letterSpacing: -0.3,
  },
  logoSub: { color: C.muted, fontSize: 13 },

  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 24,
    padding: 24,
  },
  heading: { color: C.white, fontWeight: "800", fontSize: 20 },
  subheading: { color: C.muted, fontSize: 13, marginTop: 4 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputFocused: { borderColor: C.accent },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, color: C.white, fontSize: 15 },

  goalLabel: { color: C.muted, fontSize: 13, marginTop: 20, marginBottom: 10 },
  goalRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  goalChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  goalChipActive: { borderColor: C.accent, backgroundColor: C.accentGlow },
  goalChipText: { color: C.muted, fontSize: 13, fontWeight: "600" },

  primaryBtn: {
    backgroundColor: C.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: C.accent,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryBtnText: { color: C.white, fontWeight: "700", fontSize: 16 },

  termsText: {
    color: C.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },

  switchRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  switchText: { color: C.muted, fontSize: 14 },
  switchLink: { color: C.accentLight, fontSize: 14, fontWeight: "700" },
});
