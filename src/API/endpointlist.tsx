const BaseURL = "https://localhost:7016";

export const GetDriverList = `${BaseURL}/api/Driver/list/drivers`;

export function getdriverbyid(id: string): string {
  return `${BaseURL}/api/Driver/${id}`;
}
