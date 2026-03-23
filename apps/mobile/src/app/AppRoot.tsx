import React from "react";
import { Text, View } from "react-native";

import { APP_NAME } from "@/constants/branding";
import { i18n } from "@/i18n/i18n";

void i18n;

export function AppRoot(): React.JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F22A"
      }}
    >
      <Text style={{ fontWeight: "800", fontSize: 26, color: "#0A0A0A" }}>{APP_NAME}</Text>
      <Text style={{ fontSize: 14, marginTop: 12, color: "#0A0A0A" }}>
        Mobile scaffold ready (Meals, Groceries, Favorites, Settings).
      </Text>
    </View>
  );
}
