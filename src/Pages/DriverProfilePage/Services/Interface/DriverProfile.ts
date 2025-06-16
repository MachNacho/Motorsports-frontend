export interface DriverProfile {
  firstName: string;
  middleName: any;
  lastName: string;
  birthDate: string;
  gender: number;
  raceNumber: number;
  nationalityID: string;
  nationality: Nationality;
  teamID: string;
  team: Team;
  imageUrl: string;
  description: any;
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Nationality {
  name: string;
  code: string;
  continent: number;
  flagUrl: string;
  driver: any[];
  teams: any[];
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Team {
  teamName: string;
  yearFounded: string;
  nationalityID: string;
  nationality: any;
  drivers: any[];
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
