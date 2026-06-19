import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatScreen } from "./components/ChatScreen";
import { CreateAccountScreen } from "./components/CreateAccountScreen";
import { ExerciseScreen } from "./components/ExerciseScreen";
import { HomeScreen } from "./components/HomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { C, Screen } from "./components/theme";

const NAV_ITEMS: { id: Screen; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "exercise", icon: "🎙", label: "Train" },
  { id: "chat", icon: "💬", label: "Coach" },
  { id: "progress", icon: "📊", label: "Progress" },
  { id: "profile", icon: "👤", label: "Profile" },
];

const AUTH_SCREENS: Screen[] = ["login", "register", "payment"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const isAuth = AUTH_SCREENS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return <LoginScreen navigate={setScreen} />;
      case "register":
        return <CreateAccountScreen navigate={setScreen} />;
      case "payment":
        return <PaymentScreen navigate={setScreen} />;
      case "exercise":
        return <ExerciseScreen onBack={() => setScreen("home")} />;
      case "progress":
        return <ProgressScreen onBack={() => setScreen("home")} />;
      case "profile":
        return <ProfileScreen onBack={() => setScreen("home")} />;
      case "chat":
        return <ChatScreen />;
      default:
        return <HomeScreen navigate={setScreen} />;
    }
  };

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      <View
        style={[s.content, { paddingTop: Platform.OS === "ios" ? 50 : 30 }]}
      >
        {renderScreen()}
      </View>

      {!isAuth && (
        <View style={s.bottomNav}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={s.navItem}
              onPress={() => setScreen(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[s.navIcon, screen === item.id && s.navIconActive]}>
                {item.icon}
              </Text>
              <Text
                style={[s.navLabel, screen === item.id && s.navLabelActive]}
              >
                {item.label}
              </Text>
              {screen === item.id && <View style={s.navDot} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
    paddingBottom: Platform.OS === "ios" ? 28 : 12,
    paddingTop: 10,
  },
  navItem: { flex: 1, alignItems: "center", gap: 3 },
  navIcon: { fontSize: 22, opacity: 0.4 },
  navIconActive: { opacity: 1 },
  navLabel: { color: C.muted, fontSize: 10, fontWeight: "500" },
  navLabelActive: { color: C.accentLight, fontWeight: "700" },
  navDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.accent,
    marginTop: 2,
  },
});
