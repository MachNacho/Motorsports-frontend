export interface FullTeamDTO {
  teamName: string;
  foundedDate: string;
  headquarters: string;
  nationCode: string;
  nationName: string;
  colour: string;
  imageURL: string;
  description: string;
  drivers: Driver[];
}
export interface Driver {
  id: string;
  firstname: string;
  lasstname: string;
  nationCode: string;
}
