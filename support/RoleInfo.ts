import { AxiosError } from 'axios';
import { Role } from '@/models/Role.ts';

export default class RoleInfo {
  public activeRoleKey: RoleKey | null = null;

  public roles: Role[] = [];

  public roleKeys: RoleKey[] = [
    'admin',
    'airline controller',
    'load controller',
    'airline manager',
    'airport manager',
    'repairer',
    'readonly',
    'demo',
    'station',
    'lease',
  ];

  public subjectKeys: SubjectKey[] = [
    'general',
    'platforms',
    'users',
    'ownerCodes',
    'airports',
    'damagesOverview',
    'agents',
    'repairs',
    'reports',
    'stock',
    'uldControl',
    'messages',
    'errorQueue',
    'dashboard',
    'findMyUldAccess',
  ];

  public async getRoles(): Promise<void> {
    const roles: Role[] | null = await new Role()
      .all()
      .catch((error: AxiosError): null => {
      // eslint-disable-next-line no-console
        console.log('getRoles error', error);
        return null;
      });

    if (! roles) { return; }

    this.roles = roles;
  }

  public get roleDescriptions(): RoleDescriptions {
    return {
      admin: 'No limitation on either platforms or airports.',
      'airline controller': 'Permissions are limited to assigned platforms.',
      'load controller': '...',
      'airline manager': 'Permissions are limited to assigned platforms.',
      'airport manager': 'Permissions are limited to (platforms of) assigned airports.',
      repairer: 'Permissions are limited to assigned platforms.',
      readonly: 'Permissions are limited to assigned platforms.',
      demo: 'No permissions to ULDControl.',
      station: 'No access to ULDControl.',
      lease: 'No access to ULDControl.',
    };
  }

  public get activeDescription(): string {
    return this.activeRoleKey ? this.roleDescriptions[this.activeRoleKey] : '';
  }

  public get subjects(): Subjects {
    return {
      general: 'General',
      platforms: 'Platforms',
      users: 'Users',
      ownerCodes: 'Owner Codes',
      airports: 'Airports',
      damagesOverview: 'Damages Overview',
      agents: 'Agents',
      repairs: 'Repairs',
      reports: 'Reports',
      stock: 'Stock',
      uldControl: 'ULD Control',
      messages: 'Messages',
      errorQueue: 'Error Queue',
      dashboard: 'Dashboard',
      findMyUldAccess: 'Find My ULD (Access)',
    };
  }

  public get permissions(): PermissionsPerSubject {
    return {
      general: [
        { text: 'Only access to Repair Forms, nothing else.', roles: ['repairer'] },
        { text: 'Always limited by platform & airport permissions.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'load controller', 'repairer', 'readonly'] },
        { text: 'May not change anything.', roles: ['readonly'] },
        { text: 'Can not login at ULDControl.', roles: ['demo', 'station', 'lease'] },
        { text: 'Read-only access to Find My ULD.', roles: ['demo'] },
      ],
      platforms: [
        { text: 'Access all platforms.', roles: ['admin'] },
        { text: 'Access their assigned platforms.', roles: ['airline manager', 'airline controller', 'repairer'] },
        { text: 'Access platforms of assigned airports.', roles: ['readonly'] },
        { text: 'Access platform details.', roles: ['admin', 'airline manager', 'airline controller'] },
        { text: 'Change code, name, url of a platform.', roles: ['admin'] },
        { text: 'Change certain Operational settings.', roles: ['admin', 'airline manager'] },
        { text: 'Manage platform accessories.', roles: ['admin'] },
      ],
      users: [
        { text: 'Manage users of all platforms.', roles: ['admin'] },
        { text: 'Manage users of assigned platforms.', roles: ['airline manager'] },
        { text: 'Assign the Admin role to another user.', roles: ['admin'] },
      ],
      ownerCodes: [
        { text: 'Manage Owner Codes.', roles: ['admin'] },
      ],
      airports: [
        { text: 'Manage airport locations.', roles: ['admin'] },
        { text: 'See Flight schedules.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
        { text: 'Create & update Flight schedules.', roles: ['admin', 'airline manager', 'airline controller'] },
      ],
      damagesOverview: [
        { text: 'Manage this.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      agents: [
        { text: 'Full access to the Agents menu.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      repairs: [
        { text: 'Access Repairs.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
        { text: 'Access Repair Forms.', roles: ['repairer'] },
        { text: 'Delete forms, delete documents or view documents.', roles: ['admin', 'airline manager'] },
      ],
      reports: [
        { text: 'Access to Reports.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      stock: [
        { text: 'Access to Stock.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      uldControl: [
        { text: 'Access ULD Control.', roles: ['admin', 'airline manager', 'airline controller'] },
      ],
      messages: [
        { text: 'Access Messages.', roles: ['admin', 'airline manager', 'airline controller'] },
        { text: 'Delete non-future messages.', roles: ['admin'] },
      ],
      errorQueue: [
        { text: 'Access to Error Queue.', roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      dashboard: [
        { text: 'Access to Dashboard.',
          roles: ['admin', 'airline manager', 'airline controller', 'airport manager', 'readonly'] },
      ],
      findMyUldAccess: [
        { text: 'Find My ULD (Lease) access.', roles: ['station', 'lease'] },
        { text: 'Not attached to a customer.', roles: ['station'] },
        { text: 'Can search ULDs to find owner.', roles: ['station'] },
        { text: 'Can find all ULDs belonging to customers this user has access to.', roles: ['lease'] },
        { text: 'Can request new ULDs.', roles: ['lease'] },
      ],
    };
  }

  public get activePermissions(): RolePermissionsPerSubject {
    if (! this.activeRoleKey) { return {}; }
    const rolePermissionsPerSubject: RolePermissionsPerSubject = {};
    this.subjectKeys.forEach((subject: SubjectKey): void => {
      if (! this.activeRoleKey) { return; }
      const permissions: Permission[] = this.permissions[subject]
        .filter((permission: Permission): boolean => !! this.activeRoleKey && permission.roles.includes(this.activeRoleKey));
      if (permissions.length) { rolePermissionsPerSubject[subject] = permissions; }
    });
    return rolePermissionsPerSubject;
  }
}

export type RoleKey =
  'admin'
  | 'airline controller'
  | 'load controller'
  | 'airline manager'
  | 'airport manager'
  | 'repairer'
  | 'readonly'
  | 'demo'
  | 'station'
  | 'lease';

type RoleDescriptions = {
  [key in RoleKey]: string;
};

type SubjectKey =
  'general'
  | 'platforms'
  | 'users'
  | 'ownerCodes'
  | 'airports'
  | 'damagesOverview'
  | 'agents'
  | 'repairs'
  | 'reports'
  | 'stock'
  | 'uldControl'
  | 'messages'
  | 'errorQueue'
  | 'dashboard'
  | 'findMyUldAccess';

type Subjects = {
  [key in SubjectKey]: string;
}

type Permission = {
  text: string;
  roles: RoleKey[];
}

type PermissionsPerSubject = {
  [key in SubjectKey]: Permission[];
}

export type RolePermissionsPerSubject = {
  [key in SubjectKey]?: Permission[];
}
