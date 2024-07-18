

export interface Country {
  name: string;
  region: string;
  latlng: [number, number];
  callingCodes: string[];
}

export interface DropdownListProps {
  suggestions: Country[];
  onItemClick: (value: Country) => void;
  emptyAndHideList: () => void;
}