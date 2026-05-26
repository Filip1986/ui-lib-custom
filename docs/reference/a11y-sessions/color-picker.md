# ColorPicker — Manual A11y Session Script

**Component:** `ui-lib-color-picker`
**Scope:** Popup mode + Inline mode
**Browsers:** Chrome 124+ / Safari 17+
**Screen readers:** NVDA 2024.1 (Windows, Chrome) · VoiceOver (macOS, Safari)

---

## NVDA + Chrome Session (22 steps)

### Setup

1. Open the demo page at `/color-picker`.
2. Enable NVDA. Browse mode OFF (ensure Forms Mode is active in the trigger area).
3. Set NVDA verbosity to "Say all" for form fields.

### Closed state

4. **Tab** to the color swatch trigger.
   - Expected: NVDA announces `"Color: #6466f1, click to open picker, button"` (or similar current color + role).
5. Confirm `aria-expanded="false"` is announced or implied by the button description.
6. Confirm the trigger has a visible focus ring.

### Opening the panel

7. Press **Enter** on the trigger.
   - Expected: Panel appears. NVDA announces `"Color picker, dialog"`.
8. Confirm `aria-haspopup="dialog"` was in the trigger description before opening.
9. Focus should now be inside the panel. Confirm panel reads `"Color picker dialog"`.

### Hue slider navigation

10. **Tab** to the hue slider (role=slider).
    - Expected: NVDA announces `"Hue, slider, N degrees"` where N is the current hue.
11. Press **↑** once. Confirm hue increases by 1 and NVDA announces updated value.
12. Press **Shift+↑**. Confirm hue increases by 10 and value is announced.
13. Press **↓** once. Confirm hue decreases by 1.

### Text input navigation

14. **Tab** to the Hex input.
    - Expected: NVDA announces `"Hex, edit"` (label associated via `<label for>`).
15. Type a valid 6-char hex (e.g. `ff0000`) and press **Tab**.
    - Expected: Color swatch changes to red; no error announced.
16. **Tab** to the H (hue) number input. Expected: `"H, spin button, 0"` or similar.
17. **Tab** to S, then B inputs. Confirm each has a proper label announcement.

### Panel close

18. Press **Escape** while panel is open.
    - Expected: Panel closes. Focus returns to the trigger button. NVDA announces trigger label with updated color.

### Disabled state

19. Navigate to the disabled ColorPicker section.
    - Expected: Trigger is announced as `"disabled"` or `"dimmed"`. No interaction possible.

### Inline mode

20. Navigate to the Inline demo section.
    - Expected: Panel is rendered inline (no trigger button). NVDA announces `"Color picker, dialog"` on the panel.
21. Tab through hue slider and text inputs. All labels present and correct.

### Invalid state (reactive form)

22. Navigate to the Reactive Form section. Submit with no color set (if applicable).
    - Expected: Validation error is conveyed (component border changes; any `aria-describedby` error message reads out on focus).

---

## VoiceOver + Safari Session (6 steps)

1. Open `/color-picker`. Enable VoiceOver (`Cmd+F5`). Use **VO+Right** to navigate.
2. Navigate to the trigger swatch button.
   - Expected: VoiceOver announces `"Color: #XXXXXX, click to open picker, button"`.
3. Press **VO+Space** to open the panel.
   - Expected: `"Color picker, web dialog"` announced.
4. Navigate to the hue slider with **VO+Right**.
   - Expected: `"Hue, slider, N degrees"`.
5. Adjust with **VO+Right** in the slider. Confirm value updates.
6. Press **Escape** — panel closes, focus returns to trigger with updated color announced.
