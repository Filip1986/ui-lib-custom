export interface CascadeCity {
  cname: string;
  code: string;
  icon: string;
  disabled?: boolean;
}

export interface CascadeState {
  name: string;
  code: string;
  icon: string;
  cities: CascadeCity[];
  disabled?: boolean;
}

export interface CascadeCountry {
  name: string;
  code: string;
  icon: string;
  states: CascadeState[];
  disabled?: boolean;
}

export const CASCADE_SELECT_COUNTRIES: CascadeCountry[] = [
  {
    name: 'Australia',
    code: 'AU',
    icon: 'pi pi-globe',
    states: [
      {
        name: 'New South Wales',
        code: 'NSW',
        icon: 'pi pi-map',
        cities: [
          { cname: 'Sydney', code: 'SYD', icon: 'pi pi-building' },
          { cname: 'Newcastle', code: 'NEW', icon: 'pi pi-building' },
        ],
      },
      {
        name: 'Queensland',
        code: 'QLD',
        icon: 'pi pi-map',
        cities: [
          { cname: 'Brisbane', code: 'BRI', icon: 'pi pi-building' },
          { cname: 'Townsville', code: 'TSV', icon: 'pi pi-building' },
        ],
      },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    icon: 'pi pi-globe',
    states: [
      {
        name: 'Ontario',
        code: 'ON',
        icon: 'pi pi-map',
        cities: [
          { cname: 'Toronto', code: 'TOR', icon: 'pi pi-building' },
          { cname: 'Ottawa', code: 'OTT', icon: 'pi pi-building', disabled: true },
        ],
      },
      {
        name: 'British Columbia',
        code: 'BC',
        icon: 'pi pi-map',
        cities: [
          { cname: 'Vancouver', code: 'VAN', icon: 'pi pi-building' },
          { cname: 'Victoria', code: 'VIC', icon: 'pi pi-building' },
        ],
      },
    ],
  },
  {
    name: 'Japan',
    code: 'JP',
    icon: 'pi pi-globe',
    states: [
      {
        name: 'Kanto',
        code: 'KAN',
        icon: 'pi pi-map',
        cities: [
          { cname: 'Tokyo', code: 'TYO', icon: 'pi pi-building' },
          { cname: 'Yokohama', code: 'YOK', icon: 'pi pi-building' },
        ],
      },
    ],
  },
];
