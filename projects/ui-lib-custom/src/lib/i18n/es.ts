import type { UiLibTranslationBundle } from './i18n.types';

/** Spanish (Español) translation bundle. */
export const UI_LIB_ES: UiLibTranslationBundle = {
  // ── Global ────────────────────────────────────────────────────────────────
  'global.close': 'Cerrar',
  'global.clear': 'Limpiar',
  'global.search': 'Buscar',
  'global.loading': 'Cargando',
  'global.empty': 'No se encontraron resultados',
  'global.error': 'Se produjo un error',
  'global.required': 'Requerido',
  'global.optional': 'Opcional',

  // ── Select / Autocomplete / Listbox ───────────────────────────────────────
  'select.placeholder': 'Seleccionar una opción',
  'select.clear': 'Limpiar selección',
  'select.toggle': 'Alternar desplegable',
  'select.empty': 'No hay opciones disponibles',
  'select.search.placeholder': 'Buscar opciones',
  'select.search.aria': 'Buscar opciones',
  'select.selected.count': '{count} elementos seleccionados',

  // ── AutoComplete ──────────────────────────────────────────────────────────
  'autocomplete.chips-label': 'Elementos seleccionados',
  'autocomplete.clear': 'Limpiar',
  'autocomplete.suggestions': 'Sugerencias',
  'autocomplete.empty': 'No se encontraron resultados',
  'autocomplete.results.one': '1 resultado disponible',
  'autocomplete.results.count': '{count} resultados disponibles',

  // ── CascadeSelect ─────────────────────────────────────────────────────────
  'cascade-select.placeholder': 'Seleccionar',
  'cascade-select.clear': 'Limpiar selección',
  'cascade-select.sublevel-label': 'Opciones para {label}',
  'cascade-select.loading': 'Cargando...',

  // ── Listbox ───────────────────────────────────────────────────────────────
  'listbox.select-all': 'Seleccionar todas las opciones',

  // ── DatePicker ────────────────────────────────────────────────────────────
  'datepicker.toggle': 'Abrir calendario',
  'datepicker.prev.month': 'Mes anterior',
  'datepicker.prev.month.label': 'Mes anterior, {month}',
  'datepicker.next.month': 'Mes siguiente',
  'datepicker.next.month.label': 'Mes siguiente, {month}',
  'datepicker.prev.year': 'Año anterior',
  'datepicker.next.year': 'Año siguiente',
  'datepicker.prev.decade': 'Década anterior',
  'datepicker.next.decade': 'Década siguiente',
  'datepicker.today': 'Hoy',
  'datepicker.clear': 'Limpiar fecha',
  'datepicker.month-picker': 'Selector de mes',
  'datepicker.year-picker': 'Selector de año',
  'datepicker.time-panel': 'Selector de hora',
  'datepicker.time.hour': 'Hora',
  'datepicker.time.minute': 'Minuto',
  'datepicker.time.second': 'Segundo',
  'datepicker.time.inc.hour': 'Aumentar hora',
  'datepicker.time.dec.hour': 'Disminuir hora',
  'datepicker.time.inc.minute': 'Aumentar minuto',
  'datepicker.time.dec.minute': 'Disminuir minuto',
  'datepicker.time.inc.second': 'Aumentar segundo',
  'datepicker.time.dec.second': 'Disminuir segundo',
  'datepicker.day.today': 'hoy',
  'datepicker.day.selected': 'seleccionado',
  'datepicker.day.range': 'en el rango seleccionado',
  'datepicker.panel.label': 'Selector de fecha',
  'datepicker.ampm.toggle': 'Alternar AM/PM, actual {value}',

  // ── Dialog / Drawer / BottomSheet / Popover / ConfirmDialog / DynamicDialog
  'dialog.close': 'Cerrar diálogo',
  'dialog.minimize': 'Minimizar',
  'dialog.maximize': 'Maximizar',
  'drawer.close': 'Cerrar',
  'drawer.label': 'Panel lateral',
  'bottom-sheet.close': 'Cerrar',
  'popover.close': 'Cerrar',
  'popover.label': 'Ventana emergente',
  'confirm-dialog.close': 'Cerrar',
  'confirm-dialog.header': 'Confirmación',
  'confirm-dialog.message': '¿Está seguro de que desea continuar?',
  'confirm-dialog.accept': 'Sí',
  'confirm-dialog.reject': 'No',
  'dynamic-dialog.label': 'Cuadro de diálogo',
  'dynamic-dialog.close': 'Cerrar',
  'message.close': 'Cerrar mensaje',
  'panel.toggle': 'Alternar panel',

  // ── Paginator ─────────────────────────────────────────────────────────────
  'paginator.first': 'Primera página',
  'paginator.prev': 'Página anterior',
  'paginator.next': 'Página siguiente',
  'paginator.last': 'Última página',
  'paginator.rows.label': 'Filas por página',
  'paginator.page.report': 'Página {currentPage} de {totalPages}',
  'paginator.jump': 'Ir a la página, presionar Enter para navegar',
  'paginator.nav': 'Paginación',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.drop.hint': 'Arrastre y suelte archivos aquí, o haga clic para explorar',
  'upload.remove': 'Eliminar archivo',
  'upload.browse': 'Explorar archivos',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.label': 'Calificación: {value} de {max}',
  'rating.star': 'Estrella {n}',

  // ── Table ─────────────────────────────────────────────────────────────────
  'table.sort.asc': 'Ordenar ascendente',
  'table.sort.desc': 'Ordenar descendente',
  'table.sort.none': 'Sin orden aplicado',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.expand': 'Expandir nodo',
  'tree.collapse': 'Contraer nodo',

  // ── ColorPicker ───────────────────────────────────────────────────────────
  'colorpicker.toggle': 'Abrir selector de color',
  'colorpicker.trigger': 'Color: {color}, clic para abrir',
  'colorpicker.panel': 'Selector de color',
  'colorpicker.hue': 'Control deslizante de tono',
  'colorpicker.hex.input': 'Valor de color hexadecimal',
  'colorpicker.red.input': 'Canal rojo',
  'colorpicker.green.input': 'Canal verde',
  'colorpicker.blue.input': 'Canal azul',
  'colorpicker.alpha.input': 'Canal alfa',
  'colorpicker.label.hex': 'Hex',
  'colorpicker.label.h': 'M',
  'colorpicker.label.s': 'S',
  'colorpicker.label.b': 'B',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.label': '{value}% completado',

  // ── Carousel / Galleria ───────────────────────────────────────────────────
  'carousel.prev': 'Diapositiva anterior',
  'carousel.next': 'Diapositiva siguiente',
  'carousel.indicator': 'Ir a la diapositiva {n}',
  'carousel.slide.status': 'Diapositiva {current} de {total}',
  'carousel.region': 'Carrusel',
  'carousel.indicators-label': 'Indicadores de diapositiva',

  // ── OrderList / PickList ──────────────────────────────────────────────────
  'orderlist.move.up': 'Mover arriba',
  'orderlist.move.down': 'Mover abajo',
  'orderlist.move.top': 'Mover al inicio',
  'orderlist.move.bottom': 'Mover al final',
  'picklist.add': 'Agregar a la lista',
  'picklist.remove': 'Eliminar de la lista',
  'picklist.add.all': 'Agregar todo',
  'picklist.remove.all': 'Eliminar todo',

  // ── Toast ─────────────────────────────────────────────────────────────────
  'toast.region': 'Notificaciones',
  'toast.close': 'Cerrar notificación',
  'toast.dismiss': 'Cerrar: {title}',

  // ── Chip / AutoComplete ───────────────────────────────────────────────────
  'chip.remove': 'Eliminar {label}',
  'autocomplete.dropdown': 'Mostrar sugerencias',
  'autocomplete.remove-chip': 'Eliminar {label}',

  // ── Paginator (dynamic) ───────────────────────────────────────────────────
  'paginator.empty': 'No hay páginas disponibles',
  'paginator.page.current': 'Página {page}, página actual',
  'paginator.page.go': 'Ir a la página {page}',

  // ── DataView (dynamic) ────────────────────────────────────────────────────
  'data-view.go.page': 'Ir a la página {page}',

  // ── Meter Group (dynamic) ─────────────────────────────────────────────────
  'meter-group.segment.default': 'Segmento {index}',
  'meter-group.segment': '{label}: {value} de {max}',

  // ── Rating (dynamic) ─────────────────────────────────────────────────────
  'rating.value': 'Calificación: {current} de {total} estrellas',
  'rating.star.singular': '{star} estrella de {total}',
  'rating.star.plural': '{star} estrellas de {total}',

  // ── Tree Select (dynamic) ─────────────────────────────────────────────────
  'tree-select.options': 'Seleccionar opciones',
  'tree-select.none-selected': 'Ningún elemento seleccionado',
  'tree-select.selected.one': '{label} seleccionado',
  'tree-select.selected.count': '{count} elementos seleccionados',

  // ── Table / TreeTable ─────────────────────────────────────────────────────
  'table.expand-row': 'Expansión de fila',
  'table.select-all': 'Seleccionar todas las filas',
  'tree-table.filter': 'Filtrar tabla',
  'tree-table.select-row': 'Seleccionar fila',
  'tree-table.select-all': 'Seleccionar todas las filas',

  // ── Tabs ──────────────────────────────────────────────────────────────────
  'tabs.close': 'Cerrar pestaña',

  // ── Menubar ───────────────────────────────────────────────────────────────
  'menubar.toggle': 'Alternar menú de navegación',

  // ── Input ─────────────────────────────────────────────────────────────────
  'input.clear': 'Limpiar entrada',
  'input.password-toggle': 'Alternar visibilidad de contraseña',
  'input-mask.clear': 'Limpiar',
  'password.clear': 'Limpiar contraseña',

  // ── Meter Group ───────────────────────────────────────────────────────────
  'meter-group.legend': 'Leyenda',
  'meter-group.label': 'Grupo de medidores',
  'meter-group.total': 'Total: {value}',

  // ── Terminal ──────────────────────────────────────────────────────────────
  'terminal.input': 'Entrada de comando de terminal',
  'terminal.output': 'Salida de terminal',

  // ── Tree ──────────────────────────────────────────────────────────────────
  'tree.filter-placeholder': 'Filtrar nodos del árbol',
  'tree-select.clear': 'Limpiar selección',

  // ── Upload ────────────────────────────────────────────────────────────────
  'upload.area': 'Área de carga de archivos',
  'upload.toolbar': 'Acciones de carga',
  'upload.files-list': 'Archivos a cargar',
  'upload.dismiss': 'Descartar mensajes de validación',

  // ── Image ─────────────────────────────────────────────────────────────────
  'image.controls': 'Controles de imagen',

  // ── DataView ─────────────────────────────────────────────────────────────
  'data-view.pagination': 'Paginación',
  'data-view.view-mode': 'Modo de vista',
  'data-view.label': 'Lista de datos',
  'data-view.controls': 'Controles de vista de datos',
  'data-view.filter': 'Filtrar elementos',
  'data-view.sort': 'Ordenar elementos',
  'data-view.list-view': 'Mostrar vista de lista',
  'data-view.grid-view': 'Mostrar vista de cuadrícula',
  'data-view.layout.list': 'Vista de lista seleccionada',
  'data-view.layout.grid': 'Vista de cuadrícula seleccionada',

  // ── Editor ────────────────────────────────────────────────────────────────
  'editor.toolbar': 'Opciones de formato',

  // ── Stepper ───────────────────────────────────────────────────────────────
  'stepper.label': 'Progreso',
  'stepper.step': 'Paso {current} de {total}: {label}',
  'stepper.step.error': 'Paso {current} de {total}: {label} — error, por favor corrija',
  'stepper.step.completed': 'Paso {current} de {total}: {label} — completado',
  'stepper.step.current': 'Paso {current} de {total}: {label} — actual',
  'stepper.step.unavailable-linear': 'Paso {current} de {total}: {label} — aún no accesible',
  'stepper.step.unavailable': 'Paso {current} de {total}: {label} — no disponible',
  'stepper.step.fallback-label': 'Paso {n}',

  // ── Alert ─────────────────────────────────────────────────────────────────
  'alert.dismiss': 'Cerrar alerta',

  // ── Galleria ──────────────────────────────────────────────────────────────
  'galleria.label': 'Galería de imágenes',
  'galleria.item': 'Imagen {current} de {total}',
  'galleria.go-to': 'Ir a la imagen {n}',
  'galleria.nav': 'Navegación de imágenes',
  'galleria.close': 'Cerrar galería',
  'galleria.fullscreen': 'Ver en pantalla completa',
  'galleria.thumbnail.prev': 'Miniaturas anteriores',
  'galleria.thumbnail.next': 'Miniaturas siguientes',
  'galleria.prev': 'Imagen anterior',
  'galleria.next': 'Imagen siguiente',

  // ── OrganizationChart ─────────────────────────────────────────────────────
  'organization-chart.label': 'Organigrama',
  'organization-chart.expand': 'Expandir',
  'organization-chart.collapse': 'Contraer',

  // ── PickList ──────────────────────────────────────────────────────────────
  'picklist.source': 'Lista de origen',
  'picklist.target': 'Lista de destino',

  // ── ProgressBar ───────────────────────────────────────────────────────────
  'progressbar.complete': 'Completado',

  // ── Rating ────────────────────────────────────────────────────────────────
  'rating.clear': 'Limpiar valoración',

  // ── Slider ────────────────────────────────────────────────────────────────
  'slider.min': 'Valor mínimo',
  'slider.max': 'Valor máximo',

  // ── Knob ──────────────────────────────────────────────────────────────────
  'knob.dial': 'Dial',

  // ── Avatar ────────────────────────────────────────────────────────────────
  'avatar.label': 'Avatar',

  // ── Timeline ─────────────────────────────────────────────────────────────
  'timeline.label': 'Cronología',

  // ── SplitButton ───────────────────────────────────────────────────────────
  'split-button.more': 'Más opciones',
  'split-button.menu': 'Menú',

  // ── InputNumber ───────────────────────────────────────────────────────────
  'input-number.increment': 'Incrementar {label}',
  'input-number.decrement': 'Decrementar {label}',
  'input-number.value': 'valor',

  // ── ScrollTop ─────────────────────────────────────────────────────────────
  'scroll-top.label': 'Volver arriba',

  // ── Dock ──────────────────────────────────────────────────────────────────
  'dock.label': 'Dock',

  // ── Inplace ───────────────────────────────────────────────────────────────
  'inplace.display': 'Clic para editar',
  'inplace.close': 'Cerrar editor',

  // ── ToggleButton ──────────────────────────────────────────────────────────
  'toggle-button.on': 'Sí',
  'toggle-button.off': 'No',

  // ── Chart ─────────────────────────────────────────────────────────────────
  'chart.label': 'Gráfico',

  // ── InputOtp ──────────────────────────────────────────────────────────────
  'input-otp.label': 'Contraseña de un solo uso',
  'input-otp.digit': 'Dígito',
  'input-otp.of': 'de',
  'input-otp.paste': 'Código introducido.',

  // ── DataGrid ──────────────────────────────────────────────────────────────
  'data-grid.select-all': 'Seleccionar todas las filas',
  'data-grid.deselect-all': 'Deseleccionar todas las filas',
  'data-grid.select-row': 'Seleccionar fila',
  'data-grid.deselect-row': 'Deseleccionar fila',
  'data-grid.filter-placeholder': 'Filtrar',
  'data-grid.filter-column': 'Filtrar por {column}',
  'data-grid.edit-cell': 'Editar celda',
  'data-grid.sort-asc': 'Ordenar ascendente',
  'data-grid.sort-desc': 'Ordenar descendente',
  'data-grid.sort-none': 'Quitar orden',
  'data-grid.empty': 'No se encontraron registros.',
};
