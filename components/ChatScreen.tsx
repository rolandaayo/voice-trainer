import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { C } from "./theme";

type Message = {
  id: string;
  text: string;
  from: "user" | "coach";
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hey! Welcome to Alex Voice Academy 🎙 I'm your AI voice coach. How can I help you today?",
    from: "coach",
    time: "9:00 AM",
  },
  {
    id: "2",
    text: "I want to improve my singing range",
    from: "user",
    time: "9:01 AM",
  },
  {
    id: "3",
    text: "Great goal! 🎵 Range expansion takes consistency. I'd recommend starting with the Vocal Warm-Up exercise daily for a week, then moving to Range Expansion. Want me to build you a custom plan?",
    from: "coach",
    time: "9:01 AM",
  },
];

const COACH_REPLIES: Record<string, string> = {
  default:
    "That's a great question! Keep up the daily practice and you'll notice real improvement within 2 weeks. 💪",
  warm: "Warm-ups are essential before any session. Try 2 minutes of gentle humming first — it's the single best thing you can do for your cords. 🔥",
  pitch:
    "Pitch control comes with ear training. Try matching notes to a piano app and record yourself — the playback will surprise you! 🎵",
  breath:
    "Breath support is the foundation of a strong voice. Practice diaphragmatic breathing: breathe into your belly, not your chest. 💨",
  range:
    "Range expansion needs patience. Glide exercises — sliding from your lowest to highest comfortable note — are the most effective method. 🎤",
  plan: "I'll put together a 7-day plan for you! Day 1-3: Warm-Up + Breath Support. Day 4-5: Pitch Control. Day 6-7: Range Expansion. Ready? 🏆",
};

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const flatRef = useRef<FlatList>(null);

  const getReply = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("warm")) return COACH_REPLIES.warm;
    if (lower.includes("pitch")) return COACH_REPLIES.pitch;
    if (lower.includes("breath")) return COACH_REPLIES.breath;
    if (lower.includes("range") || lower.includes("sing"))
      return COACH_REPLIES.range;
    if (lower.includes("plan") || lower.includes("schedule"))
      return COACH_REPLIES.plan;
    return COACH_REPLIES.default;
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, from: "user", time: now },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: getReply(text),
          from: "coach",
          time: now,
        },
      ]);
      flatRef.current?.scrollToEnd({ animated: true });
    }, 800);
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.from === "user";
    return (
      <View style={[s.msgRow, isUser && s.msgRowUser]}>
        {!isUser && (
          <View style={s.coachAvatar}>
            <Text style={{ fontSize: 16 }}>🎙</Text>
          </View>
        )}
        <View style={{ maxWidth: "75%", gap: 4 }}>
          <View style={[s.bubble, isUser ? s.bubbleUser : s.bubbleCoach]}>
            <Text style={[s.bubbleText, isUser && s.bubbleTextUser]}>
              {item.text}
            </Text>
          </View>
          <Text style={[s.msgTime, isUser && { textAlign: "right" }]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={s.header}>
        <View style={s.coachAvatarLg}>
          <Text style={{ fontSize: 26 }}>🎙</Text>
        </View>
        <View>
          <Text style={s.coachName}>Alex AI Coach</Text>
          <View style={s.onlineRow}>
            <View style={s.onlineDot} />
            <Text style={s.onlineText}>Online · Always available</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={s.messageList}
        onLayout={() => flatRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Quick suggestions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 48 }}
        contentContainerStyle={s.suggestContent}
      >
        {[
          "Build me a plan 📋",
          "Warm-up tips 🔥",
          "Improve pitch 🎵",
          "Breath support 💨",
          "Expand range 🎤",
        ].map((chip) => (
          <TouchableOpacity
            key={chip}
            style={s.suggestChip}
            onPress={() => setInput(chip)}
          >
            <Text style={s.suggestText}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={s.inputBar}>
        <TextInput
          style={s.chatInput}
          placeholder="Ask your coach anything..."
          placeholderTextColor={C.muted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          style={[s.sendBtn, !input.trim() && { opacity: 0.4 }]}
          onPress={send}
          disabled={!input.trim()}
        >
          <Text style={{ fontSize: 18 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
    backgroundColor: C.card,
  },
  coachAvatarLg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.accentGlow,
    borderWidth: 2,
    borderColor: C.accent + "55",
    alignItems: "center",
    justifyContent: "center",
  },
  coachName: { color: C.white, fontWeight: "700", fontSize: 16 },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.teal },
  onlineText: { color: C.muted, fontSize: 11 },

  messageList: { padding: 16, gap: 12 },
  msgRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  msgRowUser: { flexDirection: "row-reverse" },
  coachAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.accentGlow,
    borderWidth: 1,
    borderColor: C.accent + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: { borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleCoach: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: { backgroundColor: C.accent, borderBottomRightRadius: 4 },
  bubbleText: { color: C.sub, fontSize: 14, lineHeight: 21 },
  bubbleTextUser: { color: C.white },
  msgTime: { color: C.muted, fontSize: 10, paddingHorizontal: 4 },

  suggestContent: { paddingHorizontal: 16, gap: 8, paddingVertical: 8 },
  suggestChip: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  suggestText: { color: C.sub, fontSize: 12, fontWeight: "500" },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
    backgroundColor: C.card,
  },
  chatInput: {
    flex: 1,
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.cardBorder,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: C.white,
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.accent,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
