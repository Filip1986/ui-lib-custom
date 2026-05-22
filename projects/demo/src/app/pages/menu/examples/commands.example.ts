items: MenuItem[] = [
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: (event) => console.log('clicked', event.item.label),
  },
];

// Or via the itemClick output:
onItemClick(event: MenuItemCommandEvent): void {
  console.log(event.item.label);
}
