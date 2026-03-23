import React from "react";

import { APP_NAME } from "@/constants/branding";
import { MvpShell } from "@/app/MvpShell";
import { i18n } from "@/i18n/i18n";

void i18n;

export function AppRoot(): React.JSX.Element {
  return (
    <MvpShell key={APP_NAME} />
  );
}
