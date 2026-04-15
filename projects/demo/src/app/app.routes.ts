import type { Routes } from '@angular/router';
import type { Type } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { LoginComponent } from './pages/login/login.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { SelectComponent } from './pages/select/select.component';
import { SidebarMenuDemoComponent } from './pages/sidebar-menu/sidebar-menu.component';
import { ProjectStarterComponent } from './pages/project-starter/project-starter.component';
import { ShadowsComponent } from './pages/shadows/shadows.component';
import { CheckboxesComponent } from './pages/checkboxes/checkboxes.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SemanticSpacingSectionComponent } from './pages/layouts/semantic-spacing-section.component';
import { StackSectionComponent } from './pages/layouts/stack-section.component';
import { InlineSectionComponent } from './pages/layouts/inline-section.component';
import { GridSectionComponent } from './pages/layouts/grid-section.component';
import { ContainerSectionComponent } from './pages/layouts/container-section.component';
import { LayoutCompositionSectionComponent } from './pages/layouts/composition-section.component';
import { DesignTokensSectionComponent } from './pages/layouts/design-tokens-section.component';
import { ThemedLayoutsSectionComponent } from './pages/layouts/themed-layouts-section.component';
import { LayoutExamplesSectionComponent } from './pages/layouts/examples-section.component';
import { SelectButtonsComponent } from './pages/select-buttons/select-buttons.component';
import { DarkModeComponent } from './pages/dark-mode/dark-mode.component';
import { ScopedThemingComponent } from './pages/scoped-theming/scoped-theming.component';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
  {
    path: 'chart',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/chart/chart-demo.component').then(
        (m: { ChartDemoComponent: Type<unknown> }): Type<unknown> => m.ChartDemoComponent
      ),
    title: 'Chart - UI Components Library',
  },
  { path: 'badges', component: BadgesComponent, title: 'Badges - UI Components Library' },
  { path: 'layouts', redirectTo: 'layouts/semantic-spacing', pathMatch: 'full' },
  {
    path: 'layouts/semantic-spacing',
    component: SemanticSpacingSectionComponent,
    title: 'Semantic Spacing - UI Components Library',
  },
  {
    path: 'layouts/stack',
    component: StackSectionComponent,
    title: 'Stack - UI Components Library',
  },
  {
    path: 'layouts/inline',
    component: InlineSectionComponent,
    title: 'Inline - UI Components Library',
  },
  {
    path: 'layouts/grid',
    component: GridSectionComponent,
    title: 'Grid - UI Components Library',
  },
  {
    path: 'layouts/container',
    component: ContainerSectionComponent,
    title: 'Container - UI Components Library',
  },
  {
    path: 'layouts/composition',
    component: LayoutCompositionSectionComponent,
    title: 'Composition - UI Components Library',
  },
  {
    path: 'layouts/design-tokens',
    component: DesignTokensSectionComponent,
    title: 'Design Tokens - UI Components Library',
  },
  {
    path: 'layouts/themed-layouts',
    component: ThemedLayoutsSectionComponent,
    title: 'Themed Layouts - UI Components Library',
  },
  {
    path: 'layouts/examples',
    component: LayoutExamplesSectionComponent,
    title: 'Examples - UI Components Library',
  },
  { path: 'login', component: LoginComponent, title: 'Login Forms - UI Components Library' },
  { path: 'themes', component: ThemesComponent, title: 'Themes - UI Components Library' },
  { path: 'input-text', component: InputsComponent, title: 'Input Text - UI Components Library' },
  { path: 'inputs', redirectTo: 'input-text', pathMatch: 'full' },
  { path: 'select', component: SelectComponent, title: 'Select - UI Components Library' },
  { path: 'checkbox', component: CheckboxesComponent, title: 'Checkbox - UI Components Library' },
  {
    path: 'sidebar-menu',
    component: SidebarMenuDemoComponent,
    title: 'Sidebar Menu - UI Components Library',
  },
  {
    path: 'project-starter',
    component: ProjectStarterComponent,
    title: 'Project Starter - UI Components Library',
  },
  { path: 'shadows', component: ShadowsComponent, title: 'Shadows - UI Components Library' },
  { path: 'tabs', component: TabsComponent, title: 'Tabs - UI Components Library' },
  {
    path: 'icons',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/icons/icons-demo.component').then(
        (m: { IconsDemoComponent: Type<unknown> }): Type<unknown> => m.IconsDemoComponent
      ),
    title: 'Icons - UI Components Library',
  },
  {
    path: 'accordion',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/accordion/accordion.component').then(
        (m: { AccordionComponent: Type<unknown> }): Type<unknown> => m.AccordionComponent
      ),
    title: 'Accordion - UI Components Library',
  },
  {
    path: 'select-buttons',
    component: SelectButtonsComponent,
    title: 'Select Buttons - UI Components Library',
  },
  { path: 'dark-mode', component: DarkModeComponent, title: 'Dark Mode - UI Library' },
  {
    path: 'scoped-theming',
    component: ScopedThemingComponent,
    title: 'Scoped Theming - UI Library',
  },
  { path: 'accessibility', component: AccessibilityComponent, title: 'Accessibility - UI Library' },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery - UI Library' },
  {
    path: 'dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dialog/dialog.component').then(
        (m: { DialogDemoComponent: Type<unknown> }): Type<unknown> => m.DialogDemoComponent
      ),
    title: 'Dialog - UI Components Library',
  },
  {
    path: 'autocomplete',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/autocomplete/autocomplete-demo.component').then(
        (m: { AutoCompleteDemoComponent: Type<unknown> }): Type<unknown> =>
          m.AutoCompleteDemoComponent
      ),
    title: 'AutoComplete - UI Components Library',
  },
  {
    path: 'cascade-select',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/cascade-select/cascade-select-demo.component').then(
        (m: { CascadeSelectDemoComponent: Type<unknown> }): Type<unknown> =>
          m.CascadeSelectDemoComponent
      ),
    title: 'CascadeSelect - UI Components Library',
  },
  {
    path: 'color-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/color-picker/color-picker-demo.component').then(
        (m: { ColorPickerDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ColorPickerDemoComponent
      ),
    title: 'ColorPicker - UI Components Library',
  },
  {
    path: 'confirm-dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/confirm-dialog/confirm-dialog-demo.component').then(
        (m: { ConfirmDialogDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ConfirmDialogDemoComponent
      ),
    title: 'ConfirmDialog - UI Components Library',
  },
  {
    path: 'confirm-popup',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/confirm-popup/confirm-popup-demo.component').then(
        (m: { ConfirmPopupDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ConfirmPopupDemoComponent
      ),
    title: 'ConfirmPopup - UI Components Library',
  },
  {
    path: 'breadcrumb',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/breadcrumb/breadcrumb-demo.component').then(
        (m: { BreadcrumbDemoComponent: Type<unknown> }): Type<unknown> => m.BreadcrumbDemoComponent
      ),
    title: 'Breadcrumb - UI Components Library',
  },
  {
    path: 'context-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/context-menu/context-menu-demo.component').then(
        (m: { ContextMenuDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ContextMenuDemoComponent
      ),
    title: 'ContextMenu - UI Components Library',
  },
  {
    path: 'date-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/date-picker/date-picker-demo.component').then(
        (m: { DatePickerDemoComponent: Type<unknown> }): Type<unknown> => m.DatePickerDemoComponent
      ),
    title: 'DatePicker - UI Components Library',
  },
  {
    path: 'divider',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/divider/divider-demo.component').then(
        (m: { DividerDemoComponent: Type<unknown> }): Type<unknown> => m.DividerDemoComponent
      ),
    title: 'Divider - UI Components Library',
  },
  {
    path: 'dock',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dock/dock-demo.component').then(
        (m: { DockDemoComponent: Type<unknown> }): Type<unknown> => m.DockDemoComponent
      ),
    title: 'Dock - UI Components Library',
  },
  {
    path: 'drawer',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/drawer/drawer-demo.component').then(
        (m: { DrawerDemoComponent: Type<unknown> }): Type<unknown> => m.DrawerDemoComponent
      ),
    title: 'Drawer - UI Components Library',
  },
  {
    path: 'dynamic-dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dynamic-dialog/dynamic-dialog-demo.component').then(
        (m: { DynamicDialogDemoComponent: Type<unknown> }): Type<unknown> =>
          m.DynamicDialogDemoComponent
      ),
    title: 'DynamicDialog - UI Components Library',
  },
  {
    path: 'editor',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/editor/editor-demo.component').then(
        (m: { EditorDemoComponent: Type<unknown> }): Type<unknown> => m.EditorDemoComponent
      ),
    title: 'Editor - UI Components Library',
  },
  {
    path: 'fieldset',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/fieldset/fieldset-demo.component').then(
        (m: { FieldsetDemoComponent: Type<unknown> }): Type<unknown> => m.FieldsetDemoComponent
      ),
    title: 'Fieldset - UI Components Library',
  },
  {
    path: 'float-label',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/float-label/float-label-demo').then(
        (m: { FloatLabelDemoComponent: Type<unknown> }): Type<unknown> => m.FloatLabelDemoComponent
      ),
    title: 'FloatLabel - UI Components Library',
  },
  {
    path: 'icon-field',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/icon-field/icon-field-demo.component').then(
        (m: { IconFieldDemoComponent: Type<unknown> }): Type<unknown> => m.IconFieldDemoComponent
      ),
    title: 'IconField - UI Components Library',
  },
  {
    path: 'input-group',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-group/input-group-demo.component').then(
        (m: { InputGroupDemoComponent: Type<unknown> }): Type<unknown> => m.InputGroupDemoComponent
      ),
    title: 'InputGroup - UI Components Library',
  },
  {
    path: 'input-mask',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-mask/input-mask-demo.component').then(
        (m: { InputMaskDemoComponent: Type<unknown> }): Type<unknown> => m.InputMaskDemoComponent
      ),
    title: 'InputMask - UI Components Library',
  },
  {
    path: 'input-number',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-number/input-number-demo.component').then(
        (m: { InputNumberDemoComponent: Type<unknown> }): Type<unknown> =>
          m.InputNumberDemoComponent
      ),
    title: 'InputNumber - UI Components Library',
  },
  {
    path: 'input-otp',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-otp/input-otp-demo.component').then(
        (m: { InputOtpDemoComponent: Type<unknown> }): Type<unknown> => m.InputOtpDemoComponent
      ),
    title: 'InputOtp - UI Components Library',
  },
  {
    path: 'key-filter',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/key-filter/key-filter-demo.component').then(
        (m: { KeyFilterDemoComponent: Type<unknown> }): Type<unknown> => m.KeyFilterDemoComponent
      ),
    title: 'KeyFilter - UI Components Library',
  },
  {
    path: 'knob',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/knob/knob-demo.component').then(
        (m: { KnobDemoComponent: Type<unknown> }): Type<unknown> => m.KnobDemoComponent
      ),
    title: 'Knob - UI Components Library',
  },
  {
    path: 'listbox',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/listbox/listbox-demo.component').then(
        (m: { ListboxDemoComponent: Type<unknown> }): Type<unknown> => m.ListboxDemoComponent
      ),
    title: 'Listbox - UI Components Library',
  },
  {
    path: 'panel',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/panel/panel-demo.component').then(
        (m: { PanelDemoComponent: Type<unknown> }): Type<unknown> => m.PanelDemoComponent
      ),
    title: 'Panel - UI Components Library',
  },
  {
    path: 'password',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/password/password-demo.component').then(
        (m: { PasswordDemoComponent: Type<unknown> }): Type<unknown> => m.PasswordDemoComponent
      ),
    title: 'Password - UI Components Library',
  },
  {
    path: 'popover',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/popover/popover-demo.component').then(
        (m: { PopoverDemoComponent: Type<unknown> }): Type<unknown> => m.PopoverDemoComponent
      ),
    title: 'Popover - UI Components Library',
  },
  {
    path: 'radio-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/radio-button/radio-button-demo.component').then(
        (m: { RadioButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.RadioButtonDemoComponent
      ),
    title: 'RadioButton - UI Components Library',
  },
  {
    path: 'rating',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/rating/rating-demo.component').then(
        (m: { RatingDemoComponent: Type<unknown> }): Type<unknown> => m.RatingDemoComponent
      ),
    title: 'Rating - UI Components Library',
  },
  {
    path: 'data-view',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/data-view/data-view-demo.component').then(
        (m: { DataViewDemoComponent: Type<unknown> }): Type<unknown> => m.DataViewDemoComponent
      ),
    title: 'DataView - UI Components Library',
  },
  {
    path: 'order-list',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/order-list/order-list-demo.component').then(
        (m: { OrderListDemoComponent: Type<unknown> }): Type<unknown> => m.OrderListDemoComponent
      ),
    title: 'OrderList - UI Components Library',
  },
  {
    path: 'mega-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/mega-menu/mega-menu-demo.component').then(
        (m: { MegaMenuDemoComponent: Type<unknown> }): Type<unknown> => m.MegaMenuDemoComponent
      ),
    title: 'MegaMenu - UI Components Library',
  },
  {
    path: 'menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/menu/menu-demo.component').then(
        (m: { MenuDemoComponent: Type<unknown> }): Type<unknown> => m.MenuDemoComponent
      ),
    title: 'Menu - UI Components Library',
  },
  {
    path: 'message',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/message/message-demo.component').then(
        (m: { MessageDemoComponent: Type<unknown> }): Type<unknown> => m.MessageDemoComponent
      ),
    title: 'Message - UI Components Library',
  },
  {
    path: 'menubar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/menubar/menubar-demo.component').then(
        (m: { MenubarDemoComponent: Type<unknown> }): Type<unknown> => m.MenubarDemoComponent
      ),
    title: 'Menubar - UI Components Library',
  },
  {
    path: 'organization-chart',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/organization-chart/organization-chart-demo.component').then(
        (m: { OrganizationChartDemoComponent: Type<unknown> }): Type<unknown> =>
          m.OrganizationChartDemoComponent
      ),
    title: 'OrganizationChart - UI Components Library',
  },
  {
    path: 'panel-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/panel-menu/panel-menu-demo.component').then(
        (m: { PanelMenuDemoComponent: Type<unknown> }): Type<unknown> => m.PanelMenuDemoComponent
      ),
    title: 'PanelMenu - UI Components Library',
  },
  {
    path: 'paginator',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/paginator/paginator-demo.component').then(
        (m: { PaginatorDemoComponent: Type<unknown> }): Type<unknown> => m.PaginatorDemoComponent
      ),
    title: 'Paginator - UI Components Library',
  },
  {
    path: 'pick-list',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pick-list/pick-list-demo.component').then(
        (m: { PickListDemoComponent: Type<unknown> }): Type<unknown> => m.PickListDemoComponent
      ),
    title: 'PickList - UI Components Library',
  },
  {
    path: 'scroll-panel',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/scroll-panel/scroll-panel-demo.component').then(
        (m: { ScrollPanelDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ScrollPanelDemoComponent
      ),
    title: 'ScrollPanel - UI Components Library',
  },
  {
    path: 'scroller',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/scroller/scroller-demo.component').then(
        (m: { ScrollerDemoComponent: Type<unknown> }): Type<unknown> => m.ScrollerDemoComponent
      ),
    title: 'Scroller - UI Components Library',
  },
  {
    path: 'slider',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/slider/slider-demo.component').then(
        (m: { SliderDemoComponent: Type<unknown> }): Type<unknown> => m.SliderDemoComponent
      ),
    title: 'Slider - UI Components Library',
  },
  {
    path: 'speed-dial',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/speed-dial/speed-dial-demo.component').then(
        (m: { SpeedDialDemoComponent: Type<unknown> }): Type<unknown> => m.SpeedDialDemoComponent
      ),
    title: 'SpeedDial - UI Components Library',
  },
  {
    path: 'split-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/split-button/split-button-demo.component').then(
        (m: { SplitButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.SplitButtonDemoComponent
      ),
    title: 'SplitButton - UI Components Library',
  },
  {
    path: 'splitter',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/splitter/splitter-demo.component').then(
        (m: { SplitterDemoComponent: Type<unknown> }): Type<unknown> => m.SplitterDemoComponent
      ),
    title: 'Splitter - UI Components Library',
  },
  {
    path: 'stepper',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/stepper/stepper-demo.component').then(
        (m: { StepperDemoComponent: Type<unknown> }): Type<unknown> => m.StepperDemoComponent
      ),
    title: 'Stepper - UI Components Library',
  },
  {
    path: 'table',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/table/table-demo.component').then(
        (m: { TableDemoComponent: Type<unknown> }): Type<unknown> => m.TableDemoComponent
      ),
    title: 'Table - UI Components Library',
  },
  {
    path: 'tiered-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tiered-menu/tiered-menu-demo.component').then(
        (m: { TieredMenuDemoComponent: Type<unknown> }): Type<unknown> => m.TieredMenuDemoComponent
      ),
    title: 'TieredMenu - UI Components Library',
  },
  {
    path: 'timeline',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/timeline/timeline-demo.component').then(
        (m: { TimelineDemoComponent: Type<unknown> }): Type<unknown> => m.TimelineDemoComponent
      ),
    title: 'Timeline - UI Components Library',
  },
  {
    path: 'toolbar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toolbar/toolbar-demo.component').then(
        (m: { ToolbarDemoComponent: Type<unknown> }): Type<unknown> => m.ToolbarDemoComponent
      ),
    title: 'Toolbar - UI Components Library',
  },
  {
    path: 'toast',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toast/toast-demo.component').then(
        (m: { ToastDemoComponent: Type<unknown> }): Type<unknown> => m.ToastDemoComponent
      ),
    title: 'Toast - UI Components Library',
  },
  {
    path: 'tooltip',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tooltip/tooltip-demo.component').then(
        (m: { TooltipDemoComponent: Type<unknown> }): Type<unknown> => m.TooltipDemoComponent
      ),
    title: 'Tooltip - UI Components Library',
  },
  {
    path: 'tree',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree/tree-demo.component').then(
        (m: { TreeDemoComponent: Type<unknown> }): Type<unknown> => m.TreeDemoComponent
      ),
    title: 'Tree - UI Components Library',
  },
  {
    path: 'tree-table',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree-table/tree-table-demo.component').then(
        (m: { TreeTableDemoComponent: Type<unknown> }): Type<unknown> => m.TreeTableDemoComponent
      ),
    title: 'TreeTable - UI Components Library',
  },
  {
    path: 'textarea',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/textarea/textarea-demo.component').then(
        (m: { TextareaDemoComponent: Type<unknown> }): Type<unknown> => m.TextareaDemoComponent
      ),
    title: 'Textarea - UI Components Library',
  },
  {
    path: 'toggle-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toggle-button/toggle-button-demo.component').then(
        (m: { ToggleButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ToggleButtonDemoComponent
      ),
    title: 'ToggleButton - UI Components Library',
  },
  {
    path: 'toggle-switch',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toggle-switch/toggle-switch-demo.component').then(
        (m: { ToggleSwitchDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ToggleSwitchDemoComponent
      ),
    title: 'ToggleSwitch - UI Components Library',
  },
  {
    path: 'tree-select',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree-select/tree-select-demo.component').then(
        (m: { TreeSelectDemoComponent: Type<unknown> }): Type<unknown> => m.TreeSelectDemoComponent
      ),
    title: 'TreeSelect - UI Components Library',
  },
  {
    path: 'upload',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/upload/upload-demo.component').then(
        (m: { UploadDemoComponent: Type<unknown> }): Type<unknown> => m.UploadDemoComponent
      ),
    title: 'Upload - UI Components Library',
  },
  { path: '', redirectTo: 'shadows', pathMatch: 'full' },
  { path: '**', redirectTo: 'shadows' },
];
