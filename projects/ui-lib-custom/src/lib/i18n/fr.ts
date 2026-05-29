import type { UiLibTranslationBundle } from './i18n.types';

/** French (Français) translation bundle. */
export const UI_LIB_FR: UiLibTranslationBundle = {
  // ── Global ────────────────────────────────────────────────────────────────
  'global.close': 'Fermer',
  'global.clear': 'Effacer',
  'global.search': 'Rechercher',
  'global.loading': 'Chargement',
  'global.empty': 'Aucun résultat trouvé',
  'global.error': "Une erreur s'est produite",
  'global.required': 'Requis',
  'global.optional': 'Optionnel',

  // ── Select / Autocomplete / Listbox ───────────────────────────────────────
  'select.placeholder': 'Sélectionner une option',
  'select.clear': 'Effacer la sélection',
  'select.toggle': 'Basculer le menu déroulant',
  'select.empty': 'Aucune option disponible',
  'select.search.placeholder': 'Rechercher des options',
  'select.search.aria': 'Rechercher des options',
  'select.selected.count': '{count} éléments sélectionnés',

  // ── AutoComplete ──────────────────────────────────────────────────────────
  'autocomplete.chips-label': 'Éléments sélectionnés',
  'autocomplete.clear': 'Effacer',
  'autocomplete.suggestions': 'Suggestions',
  'autocomplete.empty': 'Aucun résultat trouvé',
  'autocomplete.results.one': '1 résultat disponible',
  'autocomplete.results.count': '{count} résultats disponibles',

  // ── CascadeSelect ─────────────────────────────────────────────────────────
  'cascade-select.placeholder': 'Sélectionner',
  'cascade-select.clear': 'Effacer la sélection',
  'cascade-select.sublevel-label': 'Options pour {label}',
  'cascade-select.loading': 'Chargement...',

  // ── Listbox ───────────────────────────────────────────────────────────────
  'listbox.select-all': 'Sélectionner toutes les options',

  // ── DatePicker ────────────────────────────────────────────────────────────
  'datepicker.toggle': 'Ouvrir le calendrier',
  'datepicker.prev.month': 'Mois précédent',
  'datepicker.prev.month.label': 'Mois précédent, {month}',
  'datepicker.next.month': 'Mois suivant',
  'datepicker.next.month.label': 'Mois suivant, {month}',
  'datepicker.prev.year': 'Année précédente',
  'datepicker.next.year': 'Année suivante',
  'datepicker.prev.decade': 'Décennie précédente',
  'datepicker.next.decade': 'Décennie suivante',
  'datepicker.today': "Aujourd'hui",
  'datepicker.clear': 'Effacer la date',
  'datepicker.month-picker': 'Sélecteur de mois',
  'datepicker.year-picker': "Sélecteur d'année",
  'datepicker.time-panel': "Sélecteur d'heure",
  'datepicker.time.hour': 'Heure',
  'datepicker.time.minute': 'Minute',
  'datepicker.time.second': 'Seconde',
  'datepicker.time.inc.hour': "Augmenter l'heure",
  'datepicker.time.dec.hour': "Diminuer l'heure",
  'datepicker.time.inc.minute': 'Augmenter la minute',
  'datepicker.time.dec.minute': 'Diminuer la minute',
  'datepicker.time.inc.second': 'Augmenter la seconde',
  'datepicker.time.dec.second': 'Diminuer la seconde',
  'datepicker.day.today': "aujourd'hui",
  'datepicker.day.selected': 'sélectionné',
  'datepicker.day.range': 'dans la plage sélectionnée',
  'datepicker.panel.label': 'Sélecteur de date',
  'datepicker.ampm.toggle': 'Basculer AM/PM, actuel {value}',

  // ── Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog
  'dialog.close': 'Fermer la boîte de dialogue',
  'dialog.minimize': 'Réduire',
  'dialog.maximize': 'Agrandir',
  'drawer.close': 'Fermer',
  'drawer.label': 'Panneau latéral',
  'bottom-sheet.close': 'Fermer',
  'popover.close': 'Fermer',
  'popover.label': 'Fenêtre contextuelle',
  'confirm-dialog.close': 'Fermer',
  'confirm-dialog.header': 'Confirmation',
  'confirm-dialog.message': 'Voulez-vous vraiment continuer ?',
  'confirm-dialog.accept': 'Oui',
  'confirm-dialog.reject': 'Non',
  'dynamic-dialog.label': 'Boîte de dialogue',
  'dynamic-dialog.close': 'Fermer',
  'message.close': 'Fermer le message',
  'panel.toggle': 'Basculer le panneau',

  // ── Paginator ─────────────────────────────────────────────────────────────
  'paginator.first': 'Première page',
  'paginator.prev': 'Page précédente',
  'paginator.next': 'Page suivante',
  'paginator.last': 'Dernière page',
  'paginator.rows.label': 'Lignes par page',
  'paginator.page.report': 'Page {currentPage} sur {totalPages}',
  'paginator.jump': 'Aller à la page, appuyer sur Entrée pour naviguer',
  'paginator.nav': 'Pagination',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.drop.hint': 'Glisser-déposer des fichiers ici ou cliquer pour parcourir',
  'upload.remove': 'Supprimer le fichier',
  'upload.browse': 'Parcourir les fichiers',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.label': 'Note : {value} sur {max}',
  'rating.star': 'Étoile {n}',

  // ── Table ─────────────────────────────────────────────────────────────────
  'table.sort.asc': 'Trier par ordre croissant',
  'table.sort.desc': 'Trier par ordre décroissant',
  'table.sort.none': 'Aucun tri appliqué',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.expand': 'Développer le nœud',
  'tree.collapse': 'Réduire le nœud',

  // ── ColorPicker ───────────────────────────────────────────────────────────
  'colorpicker.toggle': 'Ouvrir le sélecteur de couleur',
  'colorpicker.trigger': 'Couleur : {color}, cliquer pour ouvrir',
  'colorpicker.panel': 'Sélecteur de couleur',
  'colorpicker.hue': 'Curseur de teinte',
  'colorpicker.hex.input': 'Valeur hexadécimale de couleur',
  'colorpicker.red.input': 'Canal rouge',
  'colorpicker.green.input': 'Canal vert',
  'colorpicker.blue.input': 'Canal bleu',
  'colorpicker.alpha.input': 'Canal alpha',
  'colorpicker.label.hex': 'Hex',
  'colorpicker.label.h': 'T',
  'colorpicker.label.s': 'S',
  'colorpicker.label.b': 'L',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.label': '{value}% terminé',

  // ── Carousel / Galleria ───────────────────────────────────────────────────
  'carousel.prev': 'Diapositive précédente',
  'carousel.next': 'Diapositive suivante',
  'carousel.indicator': 'Aller à la diapositive {n}',
  'carousel.slide.status': 'Diapositive {current} sur {total}',
  'carousel.region': 'Carrousel',
  'carousel.indicators-label': 'Indicateurs de diapositive',

  // ── OrderList / PickList ──────────────────────────────────────────────────
  'orderlist.move.up': 'Déplacer vers le haut',
  'orderlist.move.down': 'Déplacer vers le bas',
  'orderlist.move.top': 'Déplacer vers le début',
  'orderlist.move.bottom': 'Déplacer vers la fin',
  'picklist.add': 'Ajouter à la liste',
  'picklist.remove': 'Supprimer de la liste',
  'picklist.add.all': 'Tout ajouter',
  'picklist.remove.all': 'Tout supprimer',

  // ── Toast ─────────────────────────────────────────────────────────────────
  'toast.region': 'Notifications',
  'toast.close': 'Fermer la notification',
  'toast.dismiss': 'Fermer : {title}',

  // ── Chip / AutoComplete ───────────────────────────────────────────────────
  'chip.remove': 'Supprimer {label}',
  'chip.remove-unlabelled': 'Supprimer',
  'chip.image-alt': 'Puce',
  'autocomplete.dropdown': 'Afficher les suggestions',
  'autocomplete.remove-chip': 'Supprimer {label}',

  // ── Paginator (dynamic) ───────────────────────────────────────────────────
  'paginator.empty': 'Aucune page disponible',
  'paginator.page.current': 'Page {page}, page actuelle',
  'paginator.page.go': 'Aller à la page {page}',

  // ── DataView (dynamic) ────────────────────────────────────────────────────
  'data-view.go.page': 'Aller à la page {page}',

  // ── Meter Group (dynamic) ─────────────────────────────────────────────────
  'meter-group.segment.default': 'Segment {index}',
  'meter-group.segment': '{label} : {value} sur {max}',

  // ── Rating (dynamic) ─────────────────────────────────────────────────────
  'rating.value': 'Note : {current} sur {total} étoiles',
  'rating.star.singular': '{star} étoile sur {total}',
  'rating.star.plural': '{star} étoiles sur {total}',

  // ── Tree Select (dynamic) ─────────────────────────────────────────────────
  'tree-select.options': 'Sélectionner des options',
  'tree-select.none-selected': 'Aucun élément sélectionné',
  'tree-select.selected.one': '{label} sélectionné',
  'tree-select.selected.count': '{count} éléments sélectionnés',

  // ── Table / TreeTable ─────────────────────────────────────────────────────
  'table.expand-row': 'Expansion de ligne',
  'table.select-all': 'Sélectionner toutes les lignes',
  'tree-table.filter': 'Filtrer le tableau',
  'tree-table.select-row': 'Sélectionner la ligne',
  'tree-table.select-all': 'Sélectionner toutes les lignes',

  // ── Tabs ──────────────────────────────────────────────────────────────────
  'tabs.close': "Fermer l'onglet",

  // ── Menubar ───────────────────────────────────────────────────────────────
  'menubar.toggle': 'Basculer le menu de navigation',

  // ── Menu / ContextMenu / TieredMenu / MegaMenu / PanelMenu / Breadcrumb ───
  'breadcrumb.aria-label': "Fil d'Ariane",
  'context-menu.aria-label': 'Menu contextuel',
  'menu.aria-label': 'Menu',
  'tiered-menu.aria-label': 'Menu',
  'mega-menu.aria-label': 'Navigation',
  'mega-menu.submenu': 'Sous-menu {label}',
  'panel-menu.aria-label': 'Menu de panneau',

  // ── Button ────────────────────────────────────────────────────────────────
  'button.loading': 'Chargement',
  'button.icon-only': 'Bouton',

  // ── OrderList ─────────────────────────────────────────────────────────────
  'order-list.filter-placeholder': 'Filtrer',

  // ── Input ─────────────────────────────────────────────────────────────────
  'input.clear': 'Effacer la saisie',
  'input.password-toggle': 'Basculer la visibilité du mot de passe',
  'input-mask.clear': 'Effacer',
  'password.clear': 'Effacer le mot de passe',

  // ── Meter Group ───────────────────────────────────────────────────────────
  'meter-group.legend': 'Légende',
  'meter-group.label': 'Groupe de mesures',
  'meter-group.total': 'Total : {value}',

  // ── Terminal ──────────────────────────────────────────────────────────────
  'terminal.input': 'Saisie de commande du terminal',
  'terminal.output': 'Sortie du terminal',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.filter-placeholder': "Filtrer les nœuds de l'arbre",
  'tree-select.clear': 'Effacer la sélection',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.area': 'Zone de téléchargement de fichiers',
  'upload.toolbar': 'Actions de téléchargement',
  'upload.files-list': 'Fichiers à télécharger',
  'upload.dismiss': 'Fermer les messages de validation',

  // ── Image ─────────────────────────────────────────────────────────────────
  'image.controls': "Commandes d'image",

  // ── DataView ─────────────────────────────────────────────────────────────
  'data-view.pagination': 'Pagination',
  'data-view.view-mode': "Mode d'affichage",
  'data-view.label': 'Liste de données',
  'data-view.controls': 'Contrôles de la vue de données',
  'data-view.filter': 'Filtrer les éléments',
  'data-view.sort': 'Trier les éléments',
  'data-view.list-view': 'Afficher la vue en liste',
  'data-view.grid-view': 'Afficher la vue en grille',
  'data-view.layout.list': 'Vue en liste sélectionnée',
  'data-view.layout.grid': 'Vue en grille sélectionnée',

  // ── Editor ────────────────────────────────────────────────────────────────
  'editor.toolbar': 'Options de formatage',

  // ── Stepper ───────────────────────────────────────────────────────────────
  'stepper.label': 'Progression',
  'stepper.step': 'Étape {current} sur {total} : {label}',
  'stepper.step.error': 'Étape {current} sur {total} : {label} — erreur, veuillez corriger',
  'stepper.step.completed': 'Étape {current} sur {total} : {label} — terminée',
  'stepper.step.current': 'Étape {current} sur {total} : {label} — actuelle',
  'stepper.step.unavailable-linear':
    'Étape {current} sur {total} : {label} — pas encore accessible',
  'stepper.step.unavailable': 'Étape {current} sur {total} : {label} — indisponible',
  'stepper.step.fallback-label': 'Étape {n}',

  // ── Alert ─────────────────────────────────────────────────────────────────
  'alert.dismiss': "Fermer l'alerte",

  // ── Galleria ──────────────────────────────────────────────────────────────
  'galleria.label': "Galerie d'images",
  'galleria.item': 'Image {current} sur {total}',
  'galleria.go-to': "Aller à l'image {n}",
  'galleria.nav': 'Navigation des images',
  'galleria.close': 'Fermer la galerie',
  'galleria.fullscreen': 'Afficher en plein écran',
  'galleria.thumbnail.prev': 'Miniatures précédentes',
  'galleria.thumbnail.next': 'Miniatures suivantes',
  'galleria.prev': 'Image précédente',
  'galleria.next': 'Image suivante',

  // ── OrganizationChart ─────────────────────────────────────────────────────
  'organization-chart.label': 'Organigramme',
  'organization-chart.expand': 'Développer',
  'organization-chart.collapse': 'Réduire',

  // ── PickList ──────────────────────────────────────────────────────────────
  'picklist.source': 'Liste source',
  'picklist.target': 'Liste cible',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.complete': 'Terminé',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.clear': 'Effacer la note',

  // ── Slider ────────────────────────────────────────────────────────────────
  'slider.min': 'Valeur minimale',
  'slider.max': 'Valeur maximale',

  // ── Knob ──────────────────────────────────────────────────────────────────
  'knob.dial': 'Cadran',

  // ── Avatar ────────────────────────────────────────────────────────────────
  'avatar.label': 'Avatar',

  // ── Timeline ─────────────────────────────────────────────────────────────
  'timeline.label': 'Chronologie',

  // ── SplitButton ───────────────────────────────────────────────────────────
  'split-button.more': "Plus d'options",
  'split-button.menu': 'Menu',

  // ── InputNumber ───────────────────────────────────────────────────────────
  'input-number.increment': 'Augmenter {label}',
  'input-number.decrement': 'Diminuer {label}',
  'input-number.value': 'valeur',

  // ── ScrollTop ─────────────────────────────────────────────────────────────
  'scroll-top.label': 'Remonter en haut',

  // ── Dock ──────────────────────────────────────────────────────────────────
  'dock.label': 'Dock',

  // ── Inplace ───────────────────────────────────────────────────────────────
  'inplace.display': 'Cliquer pour modifier',
  'inplace.close': "Fermer l'éditeur",

  // ── ToggleButton ──────────────────────────────────────────────────────────
  'toggle-button.on': 'Oui',
  'toggle-button.off': 'Non',

  // ── Chart ─────────────────────────────────────────────────────────────────
  'chart.label': 'Graphique',

  // ── InputOtp ──────────────────────────────────────────────────────────────
  'input-otp.label': 'Mot de passe à usage unique',
  'input-otp.digit': 'Chiffre',
  'input-otp.of': 'sur',
  'input-otp.paste': 'Code saisi.',

  // ── DataGrid ──────────────────────────────────────────────────────────────
  'data-grid.select-all': 'Sélectionner toutes les lignes',
  'data-grid.deselect-all': 'Désélectionner toutes les lignes',
  'data-grid.select-row': 'Sélectionner la ligne',
  'data-grid.deselect-row': 'Désélectionner la ligne',
  'data-grid.filter-placeholder': 'Filtrer',
  'data-grid.filter-column': 'Filtrer par {column}',
  'data-grid.edit-cell': 'Modifier la cellule',
  'data-grid.sort-asc': 'Trier par ordre croissant',
  'data-grid.sort-desc': 'Trier par ordre décroissant',
  'data-grid.sort-none': 'Supprimer le tri',
  'data-grid.empty': 'Aucun enregistrement trouvé.',

  // ── ConfirmPopup ──────────────────────────────────────────────────────────
  'confirm-popup.message': 'Voulez-vous vraiment continuer ?',
  'confirm-popup.accept': 'Oui',
  'confirm-popup.reject': 'Non',

  // ── SpeedDial ─────────────────────────────────────────────────────────────
  'speed-dial.trigger': 'Ouvrir la numérotation rapide',

  // ── ImageCompare ──────────────────────────────────────────────────────────
  'image-compare.aria-label': "Curseur de comparaison d'image",

  // ── CodeSnippet ───────────────────────────────────────────────────────────
  'code-snippet.copy': 'Copier le code',
  'code-snippet.copied': 'Copié !',
  'code-snippet.label.language': 'Extrait de code {language}',
  'code-snippet.label.file': 'Extrait de code : {filename}',
  'code-snippet.label.multi-file': 'Extrait de code avec {count} fichiers',
};
