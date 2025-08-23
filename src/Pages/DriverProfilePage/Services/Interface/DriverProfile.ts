export interface DriverProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  gender: number;
  raceNumber: number;
  nationalityID: string;
  nationality: Nationality;
  teamID: string;
  team: Team;
  imageUrl: string;
  description: string;
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
  driver: DriverProfile[];
  teams: Team[];
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Team {
  teamName: string;
  yearFounded: string;
  nationalityID: string;
  nationality: Nationality;
  drivers: DriverProfile[];
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
