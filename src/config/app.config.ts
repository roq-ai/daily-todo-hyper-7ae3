interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest User'],
  tenantRoles: ['Owner'],
  tenantName: 'Organization',
  applicationName: 'Daily todo hyperlink',
  addOns: [],
};
