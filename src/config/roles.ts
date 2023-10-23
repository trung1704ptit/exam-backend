export const permissions = {
  getUsers: 'getUsers',
  manageUsers: 'manageUsers',
  getExams: 'getExams',
  manageExams: 'manageExams',
};

const allRoles = {
  user: [],
  admin: [...Object.keys(permissions)],
  editor: [permissions.getExams, permissions.manageExams],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
