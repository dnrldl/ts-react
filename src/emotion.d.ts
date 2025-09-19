import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      gray100: string;
      gray900: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
    spacing: (factor: number) => string;
  }
}
