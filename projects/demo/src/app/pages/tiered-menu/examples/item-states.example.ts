items: TieredMenuItem[] = [
  { label: 'Enabled',  icon: 'pi pi-check' },
  { label: 'Disabled', icon: 'pi pi-ban',  disabled: true },
  { label: 'Hidden',   visible: false },
  { separator: true },
  {
    label: 'With Command',
    command: (event) => console.log('clicked', event.item.label),
  },
];
