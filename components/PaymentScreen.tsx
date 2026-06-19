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

type PayMethod = "card" | "transfer";

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength,
  secureTextEntry = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
  maxLength?: number;
  secureTextEntry?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={s.fieldWrap}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        style={[s.fieldInput, focused && s.fieldInputFocused]}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

export function PaymentScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [method, setMethod] = useState<PayMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  // Auto-format card number with spaces
  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  // Auto-format expiry MM/YY
  const handleExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    } else {
      setExpiry(digits);
    }
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate("home");
    }, 2000);
  };

  const canPay =
    method === "transfer" ||
    (cardName &&
      cardNumber.length >= 19 &&
      expiry.length === 5 &&
      cvv.length === 3);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerGlow} />
          <View style={s.lockBadge}>
            <Text style={s.lockIcon}>🔒</Text>
            <Text style={s.lockText}>Secure Payment</Text>
          </View>
          <Text style={s.headerTitle}>Unlock Full Access</Text>
          <Text style={s.headerSub}>
            One simple monthly plan. Cancel anytime.
          </Text>
        </View>

        {/* Plan card */}
        <View style={s.planCard}>
          <View style={s.planTop}>
            <View>
              <Text style={s.planName}>Alex Voice Academy</Text>
              <Text style={s.planCycle}>Monthly Membership</Text>
            </View>
            <View style={s.planPriceWrap}>
              <Text style={s.planCurrency}>₦</Text>
              <Text style={s.planPrice}>15,000</Text>
            </View>
          </View>
          <View style={s.planDivider} />
          <View style={s.planPerks}>
            {[
              "🎙  Unlimited training sessions",
              "🤖  AI Voice Coach (24/7)",
              "📊  Full progress analytics",
              "💬  Coach chat & feedback",
              "🏆  Challenges & leaderboard",
              "🎵  50+ guided exercises",
            ].map((perk) => (
              <View key={perk} style={s.perkRow}>
                <Text style={s.perkText}>{perk}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment method toggle */}
        <View style={s.methodToggle}>
          {(["card", "transfer"] as PayMethod[]).map((m) => (
            <TouchableOpacity
              key={m}
              style={[s.methodBtn, method === m && s.methodBtnActive]}
              onPress={() => setMethod(m)}
              activeOpacity={0.8}
            >
              <Text
                style={[s.methodBtnText, method === m && s.methodBtnTextActive]}
              >
                {m === "card" ? "💳  Card" : "🏦  Bank Transfer"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card form */}
        {method === "card" && (
          <View style={s.formCard}>
            <Field
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardName}
              onChangeText={setCardName}
            />
            <Field
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChangeText={handleCardNumber}
              keyboardType="number-pad"
              maxLength={19}
            />
            <View style={s.rowFields}>
              <View style={{ flex: 1 }}>
                <Field
                  label="Expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={handleExpiry}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Field
                  label="CVV"
                  placeholder="•••"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={s.cardBrands}>
              {["VISA", "MC", "Verve"].map((brand) => (
                <View key={brand} style={s.cardBrandPill}>
                  <Text style={s.cardBrandText}>{brand}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Bank transfer instructions */}
        {method === "transfer" && (
          <View style={s.formCard}>
            <Text style={s.transferTitle}>Transfer Details</Text>
            <Text style={s.transferSub}>
              Send ₦15,000 to the account below, then tap Confirm Payment.
            </Text>
            <View style={s.bankDetail}>
              <Text style={s.bankLabel}>Bank</Text>
              <Text style={s.bankValue}>GTBank</Text>
            </View>
            <View style={s.bankDetail}>
              <Text style={s.bankLabel}>Account Name</Text>
              <Text style={s.bankValue}>Alex Voice Academy Ltd</Text>
            </View>
            <View style={s.bankDetail}>
              <Text style={s.bankLabel}>Account Number</Text>
              <Text style={s.bankValue}>0123456789</Text>
            </View>
            <View style={s.bankDetail}>
              <Text style={s.bankLabel}>Amount</Text>
              <Text style={[s.bankValue, { color: C.accent }]}>₦15,000.00</Text>
            </View>
            <View style={s.transferNote}>
              <Text style={s.transferNoteText}>
                ⚠️ Use your registered name as the transfer narration. Access is
                activated within 30 minutes of confirmation.
              </Text>
            </View>
          </View>
        )}

        {/* Pay button */}
        <TouchableOpacity
          style={[s.payBtn, (!canPay || processing) && { opacity: 0.5 }]}
          onPress={handlePay}
          disabled={!canPay || processing}
          activeOpacity={0.85}
        >
          {processing ? (
            <Text style={s.payBtnText}>Processing…</Text>
          ) : (
            <Text style={s.payBtnText}>
              {method === "card" ? "🔒  Pay ₦15,000" : "✓  Confirm Payment"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={s.backLink}
          onPress={() => navigate("register")}
        >
          <Text style={s.backLinkText}>← Back to sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 48,
    paddingTop: 16,
  },

  header: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24,
    marginBottom: 8,
    overflow: "hidden",
  },
  headerGlow: {
    position: "absolute",
    top: -30,
    width: 240,
    height: 200,
    borderRadius: 120,
    backgroundColor: C.accentGlow,
  },
  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.teal + "22",
    borderWidth: 1,
    borderColor: C.teal + "44",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  lockIcon: { fontSize: 13 },
  lockText: { color: C.teal, fontSize: 12, fontWeight: "700" },
  headerTitle: {
    color: C.white,
    fontWeight: "800",
    fontSize: 26,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  headerSub: { color: C.muted, fontSize: 13 },

  // Plan card
  planCard: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.accent + "55",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  planTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: C.accentGlow,
  },
  planName: { color: C.white, fontWeight: "800", fontSize: 16 },
  planCycle: { color: C.muted, fontSize: 12, marginTop: 2 },
  planPriceWrap: { flexDirection: "row", alignItems: "flex-start", gap: 2 },
  planCurrency: {
    color: C.accentLight,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  planPrice: {
    color: C.white,
    fontWeight: "800",
    fontSize: 34,
    letterSpacing: -1,
  },
  planDivider: { height: 1, backgroundColor: C.cardBorder },
  planPerks: { padding: 16, gap: 10 },
  perkRow: { flexDirection: "row", alignItems: "center" },
  perkText: { color: C.sub, fontSize: 13 },

  // Method toggle
  methodToggle: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  methodBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  methodBtnActive: { backgroundColor: C.accent },
  methodBtnText: { color: C.muted, fontSize: 13, fontWeight: "600" },
  methodBtnTextActive: { color: C.white, fontWeight: "700" },

  // Form
  formCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 18,
    padding: 20,
    gap: 14,
    marginBottom: 20,
  },
  fieldWrap: { gap: 6 },
  fieldLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  fieldInput: {
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: C.white,
    fontSize: 15,
  },
  fieldInputFocused: { borderColor: C.accent },
  rowFields: { flexDirection: "row", gap: 12 },
  cardBrands: { flexDirection: "row", gap: 8 },
  cardBrandPill: {
    backgroundColor: C.cardBorder,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardBrandText: { color: C.muted, fontSize: 11, fontWeight: "700" },

  // Transfer
  transferTitle: { color: C.white, fontWeight: "700", fontSize: 15 },
  transferSub: { color: C.muted, fontSize: 13, lineHeight: 20 },
  bankDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  bankLabel: { color: C.muted, fontSize: 12 },
  bankValue: { color: C.white, fontWeight: "700", fontSize: 14 },
  transferNote: {
    backgroundColor: C.gold + "11",
    borderWidth: 1,
    borderColor: C.gold + "33",
    borderRadius: 10,
    padding: 12,
  },
  transferNoteText: { color: C.sub, fontSize: 12, lineHeight: 18 },

  // Pay button
  payBtn: {
    backgroundColor: C.accent,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: C.accent,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  payBtnText: { color: C.white, fontWeight: "800", fontSize: 16 },

  backLink: { alignItems: "center", paddingVertical: 8 },
  backLinkText: { color: C.muted, fontSize: 13 },
});
