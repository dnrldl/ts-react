// src/styles/GlobalTheme.tsx
import { Global, css } from "@emotion/react";

export default function GlobalTheme() {
  return (
    <Global
      styles={css`
        :root {
          --bg: #fff;
          --fg: #111;
          --primary: #0064ff;
          color-scheme: light;
        }
        :root[data-theme="dark"] {
          --bg: #111;
          --fg: #f5f5f5;
          --primary: #2a8cff;
          color-scheme: dark;
        }
        html,
        body {
          background: var(--bg);
          color: var(--fg);
        }
      `}
    />
  );
}
