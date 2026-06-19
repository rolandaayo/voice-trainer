import { View } from "react-native";
import { C } from "./theme";

export function Waveform({
  color = C.accent,
  count = 20,
  maxH = 36,
  animate = false,
}: {
  color?: string;
  count?: number;
  maxH?: number;
  animate?: boolean;
}) {
  const heights = Array.from(
    { length: count },
    (_, i) => Math.abs(Math.sin((i / count) * Math.PI * 2.5)) * maxH + 6,
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={{
            width: 3,
            height: h,
            borderRadius: 2,
            backgroundColor: color,
            opacity: animate ? 0.4 + (i % 4) * 0.15 : 0.65,
          }}
        />
      ))}
    </View>
  );
}
