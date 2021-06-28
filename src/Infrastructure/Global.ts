export type IUserRoles = 'specialist_admin' | 'multi_role_admin' | 'supervisor' | 'analytics' | 'service_principal';
export const UserRoles = ['specialist_admin', 'multi_role_admin', 'supervisor', 'analytics', 'service_principal'];
export const UserRolesPicker = {
    specialist_admin: 'specialist_admin', 
    multi_role_admin: 'multi_role_admin', 
    supervisor: 'supervisor', 
    analytics: 'analytics', 
    service_principl: 'service_principal'
}

export type IRoleLevel = 'List' | 'Read' | 'Write';
export const RoleLevel = [ 'List', 'Read', 'Write' ];
export const RoleLevelPicker = {
    List: 'List',
    Read: 'Read',
    Write: 'Write',
}
export type IDurationUnit = 'hours' | 'days' |  'months';
export const DurationUnit =  ['days', 'hours', 'months'];
export const DurationUnitPicker =  {
    days: 'days',
    hours: 'days', 
    months: 'days',
};
export type IServices = 'minds' | 'startups' | 'consultants' | 'events' | 'association' | 'e-learning' | 'analytics';
