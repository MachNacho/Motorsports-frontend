const BaseURL = "https://localhost:7016";

export const GetDriverList = `${BaseURL}/api/Driver/list/drivers`;

export function getdriverbyid(id: string): string {
  return `${BaseURL}/api/Driver/${id}`;
}

//Account Endpoints
export const loginUserEndpoint = `${BaseURL}/api/Account/Login`;
export const registerUser = `${BaseURL}/api/Account/Register`;
//Get user details rndpoit
