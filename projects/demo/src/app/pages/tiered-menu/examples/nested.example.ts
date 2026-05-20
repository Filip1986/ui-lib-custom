items: TieredMenuItem[] = [
  {
    label: 'File', icon: 'pi pi-file',
    items: [
      { label: 'New',  icon: 'pi pi-plus' },
      {
        label: 'Export', icon: 'pi pi-download',
        items: [
          { label: 'PDF',   icon: 'pi pi-file-pdf' },
          { label: 'CSV',   icon: 'pi pi-table' },
        ],
      },
    ],
  },
];
