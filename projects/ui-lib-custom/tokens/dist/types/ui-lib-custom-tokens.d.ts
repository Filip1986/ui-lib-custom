/**
 * Design tokens for the UI library
 * These tokens ensure consistent spacing, sizing, colors, and typography across the library
 */
declare const SPACING_TOKENS: {
    readonly 0: "0";
    readonly 1: "0.25rem";
    readonly 2: "0.5rem";
    readonly 3: "0.75rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 8: "2rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 16: "4rem";
    readonly 20: "5rem";
};
type SpacingToken = keyof typeof SPACING_TOKENS;
declare const SPACING_ALIASES: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
    readonly '2xl': "3rem";
};
type SpacingAlias = keyof typeof SPACING_ALIASES;
type SpacingKey = SpacingToken | SpacingAlias;
declare const INSET_TOKENS: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
};
type InsetToken = keyof typeof INSET_TOKENS;
declare const SQUISH_TOKENS: {
    readonly xs: "0.25rem 0.5rem";
    readonly sm: "0.5rem 1rem";
    readonly md: "1rem 2rem";
    readonly lg: "1.5rem 3rem";
    readonly xl: "2rem 4rem";
};
type SquishToken = keyof typeof SQUISH_TOKENS;
declare const STRETCH_TOKENS: {
    readonly xs: "0.5rem 0.25rem";
    readonly sm: "1rem 0.5rem";
    readonly md: "2rem 1rem";
    readonly lg: "3rem 1.5rem";
    readonly xl: "4rem 2rem";
};
type StretchToken = keyof typeof STRETCH_TOKENS;
declare const STACK_TOKENS: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
};
type StackToken = keyof typeof STACK_TOKENS;
declare const INLINE_TOKENS: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
};
type InlineToken = keyof typeof INLINE_TOKENS;
type SpacingPatternToken = InsetToken | SquishToken | StretchToken | StackToken | InlineToken;
declare const CONTAINER_MAX_WIDTHS: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
    readonly full: "100%";
};
type ContainerSize = keyof typeof CONTAINER_MAX_WIDTHS;
declare const GRID_COLUMNS: {
    readonly 1: 1;
    readonly 2: 2;
    readonly 3: 3;
    readonly 4: 4;
    readonly 5: 5;
    readonly 6: 6;
    readonly 8: 8;
    readonly 10: 10;
    readonly 12: 12;
};
type GridColumns = keyof typeof GRID_COLUMNS;
/**
 * Primary color palette
 * Used for main brand colors and primary actions
 */
declare const COLOR_PRIMARY: {
    readonly 50: "#e3f2fd";
    readonly 100: "#bbdefb";
    readonly 200: "#90caf9";
    readonly 300: "#64b5f6";
    readonly 400: "#42a5f5";
    readonly 500: "#2196f3";
    readonly 600: "#1e88e5";
    readonly 700: "#1976d2";
    readonly 800: "#1565c0";
    readonly 900: "#0d47a1";
};
/**
 * Secondary/neutral color palette
 * Used for text, borders, and backgrounds
 */
declare const COLOR_NEUTRAL: {
    readonly 50: "#fafafa";
    readonly 100: "#f5f5f5";
    readonly 200: "#eeeeee";
    readonly 300: "#e0e0e0";
    readonly 400: "#bdbdbd";
    readonly 500: "#9e9e9e";
    readonly 600: "#757575";
    readonly 700: "#616161";
    readonly 800: "#424242";
    readonly 900: "#212121";
    readonly black: "#000000";
    readonly white: "#ffffff";
};
/**
 * Success color palette
 * Used for positive actions and success states
 */
declare const COLOR_SUCCESS: {
    readonly 50: "#e8f5e9";
    readonly 100: "#c8e6c9";
    readonly 200: "#a5d6a7";
    readonly 300: "#81c784";
    readonly 400: "#66bb6a";
    readonly 500: "#4caf50";
    readonly 600: "#43a047";
    readonly 700: "#388e3c";
    readonly 800: "#2e7d32";
    readonly 900: "#1b5e20";
};
/**
 * Danger/error color palette
 * Used for destructive actions and error states
 */
declare const COLOR_DANGER: {
    readonly 50: "#ffebee";
    readonly 100: "#ffcdd2";
    readonly 200: "#ef9a9a";
    readonly 300: "#e57373";
    readonly 400: "#ef5350";
    readonly 500: "#f44336";
    readonly 600: "#e53935";
    readonly 700: "#d32f2f";
    readonly 800: "#c62828";
    readonly 900: "#b71c1c";
};
/**
 * Warning color palette
 * Used for warning states and caution messages
 */
declare const COLOR_WARNING: {
    readonly 50: "#fff3e0";
    readonly 100: "#ffe0b2";
    readonly 200: "#ffcc80";
    readonly 300: "#ffb74d";
    readonly 400: "#ffa726";
    readonly 500: "#ff9800";
    readonly 600: "#fb8c00";
    readonly 700: "#f57c00";
    readonly 800: "#ef6c00";
    readonly 900: "#e65100";
};
/**
 * Info color palette
 * Used for informational messages
 */
declare const COLOR_INFO: {
    readonly 50: "#e1f5fe";
    readonly 100: "#b3e5fc";
    readonly 200: "#81d4fa";
    readonly 300: "#4fc3f7";
    readonly 400: "#29b6f6";
    readonly 500: "#03a9f4";
    readonly 600: "#039be5";
    readonly 700: "#0288d1";
    readonly 800: "#0277bd";
    readonly 900: "#01579b";
};
/**
 * Help color palette
 * Used for helper/info-adjacent states
 */
declare const COLOR_HELP: {
    readonly 50: "#f3e8ff";
    readonly 100: "#e9d5ff";
    readonly 200: "#d8b4fe";
    readonly 300: "#c084fc";
    readonly 400: "#a855f7";
    readonly 500: "#9333ea";
    readonly 600: "#7e22ce";
    readonly 700: "#6b21a8";
    readonly 800: "#581c87";
    readonly 900: "#3b0764";
};
type HelpColor = keyof typeof COLOR_HELP;
/**
 * Semantic color mapping
 * Maps semantic color names to specific palette values
 */
declare const SEMANTIC_COLORS: {
    readonly primary: "#1976d2";
    readonly 'primary-hover': "#1565c0";
    readonly 'primary-light': "#2196f3";
    readonly 'primary-dark': "#0d47a1";
    readonly secondary: "#757575";
    readonly 'secondary-hover': "#616161";
    readonly 'secondary-light': "#9e9e9e";
    readonly 'secondary-dark': "#424242";
    readonly success: "#388e3c";
    readonly 'success-hover': "#2e7d32";
    readonly 'success-light': "#4caf50";
    readonly 'success-dark': "#1b5e20";
    readonly danger: "#d32f2f";
    readonly 'danger-hover': "#c62828";
    readonly 'danger-light': "#f44336";
    readonly 'danger-dark': "#b71c1c";
    readonly warning: "#f57c00";
    readonly 'warning-hover': "#ef6c00";
    readonly 'warning-light': "#ff9800";
    readonly 'warning-dark': "#e65100";
    readonly info: "#0288d1";
    readonly 'info-hover': "#0277bd";
    readonly 'info-light': "#03a9f4";
    readonly 'info-dark': "#01579b";
    readonly help: "#6b21a8";
    readonly 'help-hover': "#581c87";
    readonly 'help-light': "#9333ea";
    readonly 'help-dark': "#3b0764";
    readonly contrast: "#000000";
    readonly 'contrast-hover': "#424242";
    readonly 'contrast-light': "#ffffff";
    readonly 'contrast-dark': "#000000";
    readonly warn: "#f57c00";
    readonly text: "#212121";
    readonly 'text-secondary': "#757575";
    readonly 'text-disabled': "#bdbdbd";
    readonly border: "#e0e0e0";
    readonly 'border-light': "#eeeeee";
    readonly 'border-dark': "#bdbdbd";
    readonly background: "#ffffff";
    readonly 'background-alt': "#fafafa";
    readonly 'background-dark': "#212121";
};
type SemanticColor = keyof typeof SEMANTIC_COLORS;
/**
 * Font size tokens
 */
declare const FONT_SIZES: {
    readonly xs: "0.75rem";
    readonly sm: "0.875rem";
    readonly base: "1rem";
    readonly lg: "1.125rem";
    readonly xl: "1.25rem";
    readonly '2xl': "1.5rem";
    readonly '3xl': "1.875rem";
    readonly '4xl': "2.25rem";
    readonly '5xl': "3rem";
};
type FontSize = keyof typeof FONT_SIZES;
/**
 * Font weight tokens
 */
declare const FONT_WEIGHTS: {
    readonly light: 300;
    readonly normal: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
type FontWeight = keyof typeof FONT_WEIGHTS;
/**
 * Line height tokens
 */
declare const LINE_HEIGHTS: {
    readonly tight: 1.25;
    readonly normal: 1.5;
    readonly relaxed: 1.75;
    readonly loose: 2;
};
type LineHeight = keyof typeof LINE_HEIGHTS;
declare const FONT_FAMILY_VARS: {
    readonly heading: "--uilib-font-heading";
    readonly body: "--uilib-font-body";
    readonly ui: "--uilib-font-ui";
    readonly monospace: "--uilib-font-mono";
};
/**
 * Border radius tokens
 */
declare const BORDER_RADIUS: {
    readonly none: "0";
    readonly sm: "0.125rem";
    readonly base: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly '2xl': "1rem";
    readonly full: "9999px";
};
type BorderRadius = keyof typeof BORDER_RADIUS;
/**
 * Border width tokens
 */
declare const BORDER_WIDTH: {
    readonly 0: "0";
    readonly 1: "1px";
    readonly 2: "2px";
    readonly 4: "4px";
};
type BorderWidth = keyof typeof BORDER_WIDTH;
type ShadowKeyName = `shadow-${number}`;
declare const SHADOWS: Record<'none' | ShadowKeyName, string>;
type Shadow = keyof typeof SHADOWS;
/**
 * Transition duration tokens
 */
declare const TRANSITION_DURATION: {
    readonly fast: "150ms";
    readonly base: "200ms";
    readonly slow: "300ms";
    readonly slower: "500ms";
};
type TransitionDuration = keyof typeof TRANSITION_DURATION;
/**
 * Transition timing function tokens
 */
declare const TRANSITION_TIMING: {
    readonly linear: "linear";
    readonly ease: "ease";
    readonly 'ease-in': "ease-in";
    readonly 'ease-out': "ease-out";
    readonly 'ease-in-out': "ease-in-out";
};
type TransitionTiming = keyof typeof TRANSITION_TIMING;
/**
 * Z-index tokens for stacking context
 */
declare const Z_INDEX: {
    readonly base: 0;
    readonly dropdown: 1000;
    readonly sticky: 1020;
    readonly fixed: 1030;
    readonly backdrop: 1040;
    readonly modal: 1050;
    readonly popover: 1060;
    readonly tooltip: 1070;
};
type ZIndex = keyof typeof Z_INDEX;
/**
 * Button token defaults
 */
declare const BUTTON_TOKENS: {
    readonly info: {
        readonly bg: "#0288d1";
        readonly bgHover: "#0277bd";
        readonly bgActive: "#01579b";
        readonly border: "#0288d1";
        readonly fg: "#ffffff";
    };
    readonly help: {
        readonly bg: "#7e22ce";
        readonly bgHover: "#6b21a8";
        readonly bgActive: "#581c87";
        readonly border: "#7e22ce";
        readonly fg: "#ffffff";
    };
    readonly contrast: {
        readonly bg: "#000000";
        readonly bgHover: "#424242";
        readonly bgActive: "#212121";
        readonly border: "#000000";
        readonly fg: "#ffffff";
    };
    readonly warn: {
        readonly bg: "#f57c00";
        readonly bgHover: "#ef6c00";
        readonly bgActive: "#e65100";
        readonly border: "#f57c00";
        readonly fg: "#000000";
    };
    readonly raised: {
        readonly shadow: string;
        readonly shadowHover: string;
    };
    readonly text: {
        readonly fg: "#1976d2";
        readonly fgHover: "#1565c0";
    };
    readonly outline: {
        readonly border: "#1976d2";
        readonly borderHover: "#1565c0";
        readonly fg: "#1976d2";
        readonly fgHover: "#1565c0";
    };
    readonly radiusRounded: "0.5rem";
    readonly radiusPill: "9999px";
    readonly badge: {
        readonly offsetX: "0.5rem";
        readonly offsetY: "0.5rem";
        readonly radius: "9999px";
        readonly shadow: string;
        readonly fontSize: "0.875rem";
        readonly padding: "0.25rem 0.5rem";
        readonly bg: "#f44336";
        readonly fg: "#ffffff";
    };
};
type ButtonTokenKey = keyof typeof BUTTON_TOKENS;
declare const SELECTBUTTON_TOKENS: {
    readonly gap: "0";
    readonly borderRadius: {
        readonly material: "4px";
        readonly bootstrap: "6px";
        readonly minimal: "0";
    };
    readonly sizes: {
        readonly small: {
            readonly padding: "0.5rem 0.75rem";
            readonly fontSize: "0.875rem";
            readonly minHeight: "2rem";
        };
        readonly medium: {
            readonly padding: "0.625rem 1rem";
            readonly fontSize: "1rem";
            readonly minHeight: "2.5rem";
        };
        readonly large: {
            readonly padding: "0.75rem 1.25rem";
            readonly fontSize: "1.125rem";
            readonly minHeight: "3rem";
        };
    };
    readonly material: {
        readonly bg: "var(--uilib-surface-100)";
        readonly selectedBg: "var(--uilib-primary-500)";
        readonly selectedFg: "var(--uilib-primary-contrast)";
        readonly hoverBg: "var(--uilib-surface-200)";
        readonly border: "var(--uilib-border-color)";
        readonly shadow: "0 2px 4px rgba(0,0,0,0.1)";
    };
    readonly bootstrap: {
        readonly bg: "var(--uilib-surface-100)";
        readonly selectedBg: "var(--uilib-primary-500)";
        readonly selectedFg: "var(--uilib-primary-contrast)";
        readonly hoverBg: "var(--uilib-surface-200)";
        readonly border: "var(--uilib-border-color)";
    };
    readonly minimal: {
        readonly bg: "transparent";
        readonly selectedBg: "var(--uilib-surface-200)";
        readonly selectedFg: "var(--uilib-text-primary)";
        readonly hoverBg: "var(--uilib-surface-100)";
        readonly border: "transparent";
    };
};
type SelectButtonTokenKey = keyof typeof SELECTBUTTON_TOKENS;

export { BORDER_RADIUS, BORDER_WIDTH, BUTTON_TOKENS, COLOR_DANGER, COLOR_HELP, COLOR_INFO, COLOR_NEUTRAL, COLOR_PRIMARY, COLOR_SUCCESS, COLOR_WARNING, CONTAINER_MAX_WIDTHS, FONT_FAMILY_VARS, FONT_SIZES, FONT_WEIGHTS, GRID_COLUMNS, INLINE_TOKENS, INSET_TOKENS, LINE_HEIGHTS, SELECTBUTTON_TOKENS, SEMANTIC_COLORS, SHADOWS, SPACING_ALIASES, SPACING_TOKENS, SQUISH_TOKENS, STACK_TOKENS, STRETCH_TOKENS, TRANSITION_DURATION, TRANSITION_TIMING, Z_INDEX };
export type { BorderRadius, BorderWidth, ButtonTokenKey, ContainerSize, FontSize, FontWeight, GridColumns, HelpColor, InlineToken, InsetToken, LineHeight, SelectButtonTokenKey, SemanticColor, Shadow, SpacingAlias, SpacingKey, SpacingPatternToken, SpacingToken, SquishToken, StackToken, StretchToken, TransitionDuration, TransitionTiming, ZIndex };
