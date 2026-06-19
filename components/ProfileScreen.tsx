import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { C } from "./theme";

// ── Subscription Modal ────────────────────────────────────────────────────────
function SubscriptionModal({
  visible,
  onClose,
  currentPlan,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  currentPlan: "free" | "monthly" | "annual";
  onSelect: (plan: "monthly" | "annual") => void;
}) {
  const plans = [
    {
      id: "monthly" as const,
      label: "Monthly",
      price: "₦15,000",
      cycle: "per month",
      badge: null,
      color: C.accent,
      perks: [
        "🎙  Unlimited training sessions",
        "🤖  AI Voice Coach (24/7)",
        "📊  Full progress analytics",
        "💬  Coach chat & feedback",
        "🏆  Challenges & leaderboard",
        "🎵  50+ guided exercises",
      ],
    },
    {
      id: "annual" as const,
      label: "Annual",
      price: "₦100,000",
      cycle: "per year  ·  save ₦80k",
      badge: "BEST VALUE",
      color: C.gold,
      perks: [
        "🎙  Unlimited training sessions",
        "🤖  AI Voice Coach (24/7)",
        "📊  Full progress analytics",
        "💬  Coach chat & feedback",
        "🏆  Challenges & leaderboard",
        "🎵  50+ guided exercises",
        "🎁  2 months FREE vs monthly",
      ],
    },
  ];

  const planLabel =
    currentPlan === "free"
      ? "Free"
      : currentPlan === "monthly"
        ? "Monthly (₦15,000/mo)"
        : "Annual (₦100,000/yr)";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={m.overlay}>
        <View style={m.sheet}>
          {/* Handle */}
          <View style={m.handle} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
          >
            {/* Header */}
            <View style={m.header}>
              <Text style={m.title}>Subscription Plans</Text>
              <Text style={m.subtitle}>
                Current plan:{" "}
                <Text
                  style={{
                    color: currentPlan === "free" ? C.muted : C.teal,
                    fontWeight: "700",
                  }}
                >
                  {planLabel}
                </Text>
              </Text>
            </View>

            {/* Free tier info */}
            <View style={m.freeTier}>
              <View style={m.freeTierLeft}>
                <Text style={m.freeTierLabel}>Free Plan</Text>
                <Text style={m.freeTierSub}>
                  Limited access · 3 exercises · No AI coach
                </Text>
              </View>
              {currentPlan === "free" && (
                <View style={m.activePill}>
                  <Text style={m.activePillText}>ACTIVE</Text>
                </View>
              )}
            </View>

            {/* Paid plans */}
            {plans.map((plan) => {
              const isActive = currentPlan === plan.id;
              return (
                <View
                  key={plan.id}
                  style={[
                    m.planCard,
                    { borderColor: plan.color + (isActive ? "BB" : "44") },
                  ]}
                >
                  {/* Top */}
                  <View
                    style={[m.planTop, { backgroundColor: plan.color + "18" }]}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Text style={m.planLabel}>{plan.label}</Text>
                        {plan.badge && (
                          <View
                            style={[
                              m.planBadge,
                              { backgroundColor: plan.color },
                            ]}
                          >
                            <Text style={m.planBadgeText}>{plan.badge}</Text>
                          </View>
                        )}
                        {isActive && (
                          <View style={m.activePill}>
                            <Text style={m.activePillText}>ACTIVE</Text>
                          </View>
                        )}
                      </View>
                      <Text style={m.planCycle}>{plan.cycle}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={[m.planPrice, { color: plan.color }]}>
                        {plan.price}
                      </Text>
                    </View>
                  </View>

                  {/* Perks */}
                  <View style={m.planPerks}>
                    {plan.perks.map((perk) => (
                      <View key={perk} style={m.perkRow}>
                        <Text style={m.perkText}>{perk}</Text>
                      </View>
                    ))}
                  </View>

                  {/* CTA */}
                  <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    {isActive ? (
                      <View
                        style={[m.ctaBtn, { backgroundColor: C.cardBorder }]}
                      >
                        <Text style={[m.ctaBtnText, { color: C.muted }]}>
                          ✓ Current Plan
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[m.ctaBtn, { backgroundColor: plan.color }]}
                        onPress={() => {
                          onSelect(plan.id);
                          onClose();
                        }}
                        activeOpacity={0.85}
                      >
                        <Text style={m.ctaBtnText}>
                          {currentPlan === "free"
                            ? `Upgrade to ${plan.label}`
                            : `Switch to ${plan.label}`}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}

            {/* Cancel note */}
            <Text style={m.cancelNote}>
              Cancel anytime. No hidden fees. Billed in NGN.
            </Text>
          </ScrollView>

          <TouchableOpacity style={m.closeBtn} onPress={onClose}>
            <Text style={m.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Profile Screen ────────────────────────────────────────────────────────────
export function ProfileScreen({ onBack }: { onBack: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showSub, setShowSub] = useState(false);
  const [plan, setPlan] = useState<"free" | "monthly" | "annual">("free");

  const planBadgeLabel =
    plan === "free"
      ? "🔓 Free Plan"
      : plan === "monthly"
        ? "⭐ Monthly Pro"
        : "👑 Annual Pro";
  const planBadgeColor =
    plan === "free" ? C.muted : plan === "monthly" ? C.accent : C.gold;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <SubscriptionModal
        visible={showSub}
        onClose={() => setShowSub(false)}
        currentPlan={plan}
        onSelect={(p) => setPlan(p)}
      />

      <View style={s.topBar}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backBtnText}>← Home</Text>
        </TouchableOpacity>
        <Text style={s.topBarTitle}>Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        {/* Hero */}
        <View style={s.profileHero}>
          <View style={s.avatarLg}>
            <Text style={{ fontSize: 36 }}>🎤</Text>
          </View>
          <Text style={s.profileName}>Alex</Text>
          <Text style={s.profileRole}>Voice Academy Member</Text>
          <TouchableOpacity
            onPress={() => setShowSub(true)}
            style={[s.proBadge, { borderColor: planBadgeColor + "55" }]}
          >
            <Text
              style={{ color: planBadgeColor, fontSize: 12, fontWeight: "700" }}
            >
              {planBadgeLabel}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toggles */}
        <Text style={s.sectionLabel}>Settings</Text>
        {[
          {
            label: "Notifications",
            value: notifications,
            toggle: () => setNotifications((v) => !v),
          },
          {
            label: "Dark Mode",
            value: darkMode,
            toggle: () => setDarkMode((v) => !v),
          },
        ].map((item) => (
          <View key={item.label} style={s.settingRow}>
            <Text style={s.settingLabel}>{item.label}</Text>
            <TouchableOpacity
              onPress={item.toggle}
              style={[s.toggle, item.value && s.toggleOn]}
            >
              <View style={[s.toggleThumb, item.value && s.toggleThumbOn]} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Menu items */}
        {[
          { label: "Edit Profile", onPress: () => {} },
          { label: "Subscription", onPress: () => setShowSub(true) },
          { label: "Help & Support", onPress: () => {} },
          { label: "Log Out", onPress: () => {} },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={s.menuRow}
            onPress={item.onPress}
          >
            <Text
              style={[
                s.menuLabel,
                item.label === "Log Out" && { color: C.red },
              ]}
            >
              {item.label}
            </Text>
            <Text style={{ color: C.muted }}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
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
    marginBottom: -4,
  },

  profileHero: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 6,
  },
  avatarLg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.accentGlow,
    borderWidth: 2,
    borderColor: C.accent + "55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  profileName: { color: C.white, fontWeight: "800", fontSize: 22 },
  profileRole: { color: C.muted, fontSize: 13 },
  proBadge: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 4,
  },

  settingRow: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: { color: C.white, fontWeight: "600", fontSize: 14 },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.cardBorder,
    padding: 3,
  },
  toggleOn: { backgroundColor: C.accent },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.white,
  },
  toggleThumbOn: { transform: [{ translateX: 20 }] },

  menuRow: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLabel: { color: C.white, fontWeight: "600", fontSize: 14 },
});

const m = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    maxHeight: "90%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.cardBorder,
    alignSelf: "center",
    marginBottom: 16,
  },

  header: { gap: 4, marginBottom: 4 },
  title: { color: C.white, fontWeight: "800", fontSize: 22 },
  subtitle: { color: C.muted, fontSize: 13 },

  freeTier: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  freeTierLeft: { gap: 3 },
  freeTierLabel: { color: C.white, fontWeight: "700", fontSize: 14 },
  freeTierSub: { color: C.muted, fontSize: 12 },

  activePill: {
    backgroundColor: C.teal + "22",
    borderWidth: 1,
    borderColor: C.teal + "55",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activePillText: {
    color: C.teal,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  planCard: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderRadius: 18,
    overflow: "hidden",
  },
  planTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  planLabel: { color: C.white, fontWeight: "800", fontSize: 16 },
  planBadge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  planBadgeText: {
    color: C.bg,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  planCycle: { color: C.muted, fontSize: 11, marginTop: 3 },
  planPrice: { fontWeight: "800", fontSize: 22 },

  planPerks: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  perkRow: { flexDirection: "row", alignItems: "center" },
  perkText: { color: C.sub, fontSize: 12 },

  ctaBtn: {
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  ctaBtnText: { color: C.white, fontWeight: "700", fontSize: 14 },

  cancelNote: { color: C.muted, fontSize: 11, textAlign: "center" },

  closeBtn: {
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  closeBtnText: { color: C.muted, fontSize: 15, fontWeight: "600" },
});
