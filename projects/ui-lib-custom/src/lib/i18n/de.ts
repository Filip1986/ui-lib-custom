import type { UiLibTranslationBundle } from './i18n.types';

/** German (Deutsch) translation bundle. */
export const UI_LIB_DE: UiLibTranslationBundle = {
  // ── Global ────────────────────────────────────────────────────────────────
  'global.close': 'Schließen',
  'global.clear': 'Löschen',
  'global.search': 'Suchen',
  'global.loading': 'Wird geladen',
  'global.empty': 'Keine Ergebnisse gefunden',
  'global.error': 'Ein Fehler ist aufgetreten',
  'global.required': 'Erforderlich',
  'global.optional': 'Optional',

  // ── Select / Autocomplete / Listbox ───────────────────────────────────────
  'select.placeholder': 'Option wählen',
  'select.clear': 'Auswahl löschen',
  'select.toggle': 'Dropdown umschalten',
  'select.empty': 'Keine Optionen verfügbar',
  'select.search.placeholder': 'Optionen suchen',
  'select.search.aria': 'Optionen suchen',
  'select.selected.count': '{count} Elemente ausgewählt',

  // ── AutoComplete ──────────────────────────────────────────────────────────
  'autocomplete.chips-label': 'Ausgewählte Elemente',
  'autocomplete.clear': 'Löschen',
  'autocomplete.suggestions': 'Vorschläge',
  'autocomplete.empty': 'Keine Ergebnisse gefunden',
  'autocomplete.results.one': '1 Ergebnis verfügbar',
  'autocomplete.results.count': '{count} Ergebnisse verfügbar',

  // ── CascadeSelect ─────────────────────────────────────────────────────────
  'cascade-select.placeholder': 'Auswählen',
  'cascade-select.clear': 'Auswahl löschen',
  'cascade-select.sublevel-label': 'Optionen für {label}',
  'cascade-select.loading': 'Wird geladen...',

  // ── Listbox ───────────────────────────────────────────────────────────────
  'listbox.select-all': 'Alle Optionen auswählen',
  'listbox.label': 'Liste',
  'listbox.empty': 'Keine Elemente gefunden.',
  'listbox.empty.filter': 'Keine Ergebnisse entsprechen Ihrem Filter.',
  'listbox.filter.placeholder': 'Suchen...',
  'listbox.filter.label': 'Optionen filtern',

  // ── DatePicker ────────────────────────────────────────────────────────────
  'datepicker.toggle': 'Kalender öffnen',
  'datepicker.prev.month': 'Vorheriger Monat',
  'datepicker.prev.month.label': 'Vorheriger Monat, {month}',
  'datepicker.next.month': 'Nächster Monat',
  'datepicker.next.month.label': 'Nächster Monat, {month}',
  'datepicker.prev.year': 'Vorheriges Jahr',
  'datepicker.next.year': 'Nächstes Jahr',
  'datepicker.prev.decade': 'Vorheriges Jahrzehnt',
  'datepicker.next.decade': 'Nächstes Jahrzehnt',
  'datepicker.today': 'Heute',
  'datepicker.clear': 'Datum löschen',
  'datepicker.month-picker': 'Monat auswählen',
  'datepicker.year-picker': 'Jahr auswählen',
  'datepicker.time-panel': 'Zeitauswahl',
  'datepicker.time.hour': 'Stunde',
  'datepicker.time.minute': 'Minute',
  'datepicker.time.second': 'Sekunde',
  'datepicker.time.inc.hour': 'Stunde erhöhen',
  'datepicker.time.dec.hour': 'Stunde verringern',
  'datepicker.time.inc.minute': 'Minute erhöhen',
  'datepicker.time.dec.minute': 'Minute verringern',
  'datepicker.time.inc.second': 'Sekunde erhöhen',
  'datepicker.time.dec.second': 'Sekunde verringern',
  'datepicker.day.today': 'heute',
  'datepicker.day.selected': 'ausgewählt',
  'datepicker.day.range': 'im ausgewählten Bereich',
  'datepicker.panel.label': 'Datumsauswahl',
  'datepicker.ampm.toggle': 'AM/PM wechseln, aktuell {value}',

  // ── Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog
  'dialog.close': 'Dialog schließen',
  'dialog.minimize': 'Minimieren',
  'dialog.maximize': 'Maximieren',
  'drawer.close': 'Schließen',
  'drawer.label': 'Seitenleiste',
  'bottom-sheet.close': 'Schließen',
  'popover.close': 'Schließen',
  'popover.label': 'Einblendung',
  'confirm-dialog.close': 'Schließen',
  'confirm-dialog.accept': 'Ja',
  'confirm-dialog.reject': 'Nein',
  'confirm-dialog.header': 'Bestätigung',
  'confirm-dialog.message': 'Sind Sie sicher, dass Sie fortfahren möchten?',
  'dynamic-dialog.label': 'Dialogfeld',
  'dynamic-dialog.close': 'Schließen',
  'message.close': 'Nachricht schließen',
  'panel.toggle': 'Panel umschalten',

  // ── Paginator ─────────────────────────────────────────────────────────────
  'paginator.first': 'Erste Seite',
  'paginator.prev': 'Vorherige Seite',
  'paginator.next': 'Nächste Seite',
  'paginator.last': 'Letzte Seite',
  'paginator.rows.label': 'Zeilen pro Seite',
  'paginator.page.report': 'Seite {currentPage} von {totalPages}',
  'paginator.jump': 'Zur Seite springen, Enter zum Navigieren drücken',
  'paginator.nav': 'Seitennavigation',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.drop.hint': 'Dateien hierher ziehen oder klicken zum Durchsuchen',
  'upload.remove': 'Datei entfernen',
  'upload.browse': 'Dateien durchsuchen',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.label': 'Bewertung: {value} von {max}',
  'rating.star': 'Stern {n}',

  // ── Table ─────────────────────────────────────────────────────────────────
  'table.sort.asc': 'Aufsteigend sortieren',
  'table.sort.desc': 'Absteigend sortieren',
  'table.sort.none': 'Keine Sortierung',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.expand': 'Knoten erweitern',
  'tree.collapse': 'Knoten reduzieren',

  // ── ColorPicker ───────────────────────────────────────────────────────────
  'colorpicker.toggle': 'Farbauswahl öffnen',
  'colorpicker.trigger': 'Farbe: {color}, klicken zum Öffnen',
  'colorpicker.panel': 'Farbauswahl',
  'colorpicker.hue': 'Farbton-Schieberegler',
  'colorpicker.hex.input': 'Hex-Farbwert',
  'colorpicker.red.input': 'Roter Kanal',
  'colorpicker.green.input': 'Grüner Kanal',
  'colorpicker.blue.input': 'Blauer Kanal',
  'colorpicker.alpha.input': 'Alphakanal',
  'colorpicker.label.hex': 'Hex',
  'colorpicker.label.h': 'F',
  'colorpicker.label.s': 'S',
  'colorpicker.label.b': 'H',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.label': '{value}% abgeschlossen',

  // ── Carousel / Galleria ───────────────────────────────────────────────────
  'carousel.prev': 'Vorherige Folie',
  'carousel.next': 'Nächste Folie',
  'carousel.pause': 'Automatische Wiedergabe anhalten',
  'carousel.play': 'Automatische Wiedergabe fortsetzen',
  'carousel.indicator': 'Zur Folie {n} gehen',
  'carousel.slide.status': 'Folie {current} von {total}',
  'carousel.region': 'Karussell',
  'carousel.indicators-label': 'Folienindikatoren',

  // ── OrderList / PickList ──────────────────────────────────────────────────
  'orderlist.move.up': 'Nach oben',
  'orderlist.move.down': 'Nach unten',
  'orderlist.move.top': 'An den Anfang',
  'orderlist.move.bottom': 'Ans Ende',
  'picklist.add': 'Zur Liste hinzufügen',
  'picklist.remove': 'Aus Liste entfernen',
  'picklist.add.all': 'Alle hinzufügen',
  'picklist.remove.all': 'Alle entfernen',

  // ── Toast ─────────────────────────────────────────────────────────────────
  'toast.region': 'Benachrichtigungen',
  'toast.close': 'Benachrichtigung schließen',
  'toast.dismiss': 'Schließen: {title}',

  // ── Badge ─────────────────────────────────────────────────────────────────
  'badge.status-indicator': 'Statusanzeige',

  // ── Chip / AutoComplete ───────────────────────────────────────────────────
  'chip.remove': '{label} entfernen',
  'chip.remove-unlabelled': 'Entfernen',
  'chip.image-alt': 'Chip',
  'autocomplete.dropdown': 'Vorschläge anzeigen',
  'autocomplete.remove-chip': '{label} entfernen',

  // ── Paginator (dynamic) ───────────────────────────────────────────────────
  'paginator.empty': 'Keine Seiten verfügbar',
  'paginator.page.current': 'Seite {page}, aktuelle Seite',
  'paginator.page.go': 'Zur Seite {page} gehen',

  // ── DataView (dynamic) ────────────────────────────────────────────────────
  'data-view.go.page': 'Zur Seite {page} gehen',

  // ── Meter Group (dynamic) ─────────────────────────────────────────────────
  'meter-group.segment.default': 'Segment {index}',
  'meter-group.segment': '{label}: {value} von {max}',

  // ── Rating (dynamic) ─────────────────────────────────────────────────────
  'rating.value': 'Bewertung: {current} von {total} Sternen',
  'rating.star.singular': '{star} Stern von {total}',
  'rating.star.plural': '{star} Sterne von {total}',

  // ── Tree Select (dynamic) ─────────────────────────────────────────────────
  'tree-select.options': 'Optionen auswählen',
  'tree-select.none-selected': 'Kein Element ausgewählt',
  'tree-select.selected.one': '{label} ausgewählt',
  'tree-select.selected.count': '{count} Elemente ausgewählt',

  // ── Table / TreeTable ─────────────────────────────────────────────────────
  'table.expand-row': 'Zeilenerweiterung',
  'table.empty': 'Keine Datensätze gefunden.',
  'table.filter.placeholder': 'Suchen...',
  'tree-table.label': 'Baumtabelle',
  'table.select-all': 'Alle Zeilen auswählen',
  'tree-table.filter': 'Tabelle filtern',
  'tree-table.filter.placeholder': 'Suchen...',
  'tree-table.select-row': 'Zeile auswählen',
  'tree-table.select-all': 'Alle Zeilen auswählen',

  // ── Tabs ──────────────────────────────────────────────────────────────────
  'tabs.close': 'Tab schließen',

  // ── Menubar ───────────────────────────────────────────────────────────────
  'menubar.toggle': 'Navigationsmenü umschalten',

  // ── Menu / ContextMenu / TieredMenu / MegaMenu / PanelMenu / Breadcrumb ───
  'breadcrumb.aria-label': 'Brotkrümelnavigation',
  'context-menu.aria-label': 'Kontextmenü',
  'menu.aria-label': 'Menü',
  'tiered-menu.aria-label': 'Menü',
  'mega-menu.aria-label': 'Navigation',
  'mega-menu.submenu': '{label} Untermenü',
  'panel-menu.aria-label': 'Navigationsbereich',

  // ── Button ────────────────────────────────────────────────────────────────
  'button.loading': 'Lädt',
  'button.icon-only': 'Schaltfläche',

  // ── OrderList ─────────────────────────────────────────────────────────────
  'order-list.filter-placeholder': 'Filtern',

  // ── Input ─────────────────────────────────────────────────────────────────
  'input.clear': 'Eingabe löschen',
  'input.password-toggle': 'Passwortsichtbarkeit umschalten',
  'input-mask.clear': 'Löschen',
  'password.clear': 'Passwort löschen',

  // ── Meter Group ───────────────────────────────────────────────────────────
  'meter-group.legend': 'Legende',
  'meter-group.label': 'Messgruppe',
  'meter-group.total': 'Gesamt: {value}',

  // ── Terminal ──────────────────────────────────────────────────────────────
  'terminal.input': 'Terminal-Befehlseingabe',
  'terminal.output': 'Terminal-Ausgabe',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.label': 'Baum',
  'tree.filter-placeholder': 'Baumknoten filtern',
  'tree-select.clear': 'Auswahl löschen',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.area': 'Datei-Upload-Bereich',
  'upload.toolbar': 'Upload-Aktionen',
  'upload.files-list': 'Hochzuladende Dateien',
  'upload.dismiss': 'Validierungsmeldungen schließen',

  // ── Image ─────────────────────────────────────────────────────────────────
  'image.controls': 'Bildsteuerung',

  // ── DataView ─────────────────────────────────────────────────────────────
  'data-view.pagination': 'Seitennavigation',
  'data-view.view-mode': 'Anzeigemodus',
  'data-view.label': 'Datenliste',
  'data-view.controls': 'Steuerelemente der Datenansicht',
  'data-view.filter': 'Elemente filtern',
  'data-view.sort': 'Elemente sortieren',
  'data-view.list-view': 'Listenansicht anzeigen',
  'data-view.grid-view': 'Rasteransicht anzeigen',
  'data-view.layout.list': 'Listenansicht ausgewählt',
  'data-view.layout.grid': 'Rasteransicht ausgewählt',
  'data-view.empty': 'Keine Datensätze gefunden.',
  'data-view.filter.placeholder': 'Elemente filtern',

  // ── Editor ────────────────────────────────────────────────────────────────
  'editor.toolbar': 'Formatierungsoptionen',

  // ── Stepper ───────────────────────────────────────────────────────────────
  'stepper.label': 'Fortschritt',
  'stepper.step': 'Schritt {current} von {total}: {label}',
  'stepper.step.error': 'Schritt {current} von {total}: {label} — Fehler, bitte beheben',
  'stepper.step.completed': 'Schritt {current} von {total}: {label} — abgeschlossen',
  'stepper.step.current': 'Schritt {current} von {total}: {label} — aktuell',
  'stepper.step.unavailable-linear':
    'Schritt {current} von {total}: {label} — noch nicht zugänglich',
  'stepper.step.unavailable': 'Schritt {current} von {total}: {label} — nicht verfügbar',
  'stepper.step.fallback-label': 'Schritt {n}',

  // ── Alert ─────────────────────────────────────────────────────────────────
  'alert.dismiss': 'Warnung schließen',

  // ── Galleria ──────────────────────────────────────────────────────────────
  'galleria.label': 'Bildergalerie',
  'galleria.item': 'Bild {current} von {total}',
  'galleria.go-to': 'Zu Bild {n} wechseln',
  'galleria.nav': 'Bildnavigation',
  'galleria.close': 'Galerie schließen',
  'galleria.fullscreen': 'Vollbildmodus anzeigen',
  'galleria.thumbnail.prev': 'Vorherige Miniaturansichten',
  'galleria.thumbnail.next': 'Nächste Miniaturansichten',
  'galleria.prev': 'Vorheriges Bild',
  'galleria.next': 'Nächstes Bild',

  // ── OrganizationChart ─────────────────────────────────────────────────────
  'organization-chart.label': 'Organigramm',
  'organization-chart.expand': 'Erweitern',
  'organization-chart.collapse': 'Reduzieren',

  // ── PickList ──────────────────────────────────────────────────────────────
  'picklist.source': 'Quellliste',
  'picklist.target': 'Zielliste',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.complete': 'Abgeschlossen',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.clear': 'Bewertung löschen',

  // ── Slider ────────────────────────────────────────────────────────────────
  'slider.min': 'Mindestwert',
  'slider.max': 'Höchstwert',

  // ── Knob ──────────────────────────────────────────────────────────────────
  'knob.dial': 'Regler',

  // ── Avatar ────────────────────────────────────────────────────────────────
  'avatar.label': 'Avatar',

  // ── Timeline ─────────────────────────────────────────────────────────────
  'timeline.label': 'Zeitleiste',

  // ── SplitButton ───────────────────────────────────────────────────────────
  'split-button.more': 'Weitere Optionen',
  'split-button.menu': 'Menü',

  // ── InputNumber ───────────────────────────────────────────────────────────
  'input-number.increment': '{label} erhöhen',
  'input-number.decrement': '{label} verringern',
  'input-number.value': 'Wert',

  // ── ScrollTop ─────────────────────────────────────────────────────────────
  'scroll-top.label': 'Nach oben scrollen',

  // ── Dock ──────────────────────────────────────────────────────────────────
  'dock.label': 'Dock',

  // ── Inplace ───────────────────────────────────────────────────────────────
  'inplace.display': 'Zum Bearbeiten klicken',
  'inplace.close': 'Editor schließen',

  // ── ToggleButton ──────────────────────────────────────────────────────────
  'toggle-button.on': 'Ja',
  'toggle-button.off': 'Nein',

  // ── Chart ─────────────────────────────────────────────────────────────────
  'chart.label': 'Diagramm',

  // ── InputOtp ──────────────────────────────────────────────────────────────
  'input-otp.label': 'Einmalpasswort',
  'input-otp.digit': 'Ziffer',
  'input-otp.of': 'von',
  'input-otp.paste': 'Code eingegeben.',

  // ── DataGrid ──────────────────────────────────────────────────────────────
  'data-grid.select-all': 'Alle Zeilen auswählen',
  'data-grid.deselect-all': 'Alle Zeilen abwählen',
  'data-grid.select-row': 'Zeile auswählen',
  'data-grid.deselect-row': 'Zeile abwählen',
  'data-grid.filter-placeholder': 'Filtern',
  'data-grid.filter-column': 'Nach {column} filtern',
  'data-grid.edit-cell': 'Zelle bearbeiten',
  'data-grid.sort-asc': 'Aufsteigend sortieren',
  'data-grid.sort-desc': 'Absteigend sortieren',
  'data-grid.sort-none': 'Sortierung entfernen',
  'data-grid.empty': 'Keine Einträge gefunden.',

  // ── ConfirmPopup ──────────────────────────────────────────────────────────
  'confirm-popup.message': 'Möchten Sie wirklich fortfahren?',
  'confirm-popup.accept': 'Ja',
  'confirm-popup.reject': 'Nein',

  // ── SpeedDial ─────────────────────────────────────────────────────────────
  'speed-dial.trigger': 'Schnellauswahl öffnen',

  // ── ImageCompare ──────────────────────────────────────────────────────────
  'image-compare.aria-label': 'Bildvergleichsschieberegler',

  // ── CodeSnippet ───────────────────────────────────────────────────────────
  // ── VirtualScroller ───────────────────────────────────────────────────────
  'virtual-scroller.list-label': 'Scrollbare Liste',
  'virtual-scroller.grid-label': 'Scrollbares Raster',
  'virtual-scroller.loading': 'Elemente werden geladen…',
  'virtual-scroller.loading-more': 'Weitere Elemente werden geladen.',
  'virtual-scroller.empty': 'Keine Elemente anzuzeigen.',
  'virtual-scroller.available': 'Element(e) verfügbar.',

  'code-snippet.tabs': 'Datei-Reiter',
  'code-snippet.copy': 'Code in Zwischenablage kopieren',
  'code-snippet.copied': 'Kopiert!',
  'code-snippet.label.language': '{language}-Codeausschnitt',
  'code-snippet.label.file': 'Codeausschnitt: {filename}',
  'code-snippet.label.multi-file': 'Codeausschnitt mit {count} Dateien',
};
