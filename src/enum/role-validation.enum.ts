export enum RoleValidationMessage {
     SUCCESS = 'El usuario tiene permisos para crear este rol',
     FORBIDDEN_CREATOR_ROLE = 'Este rol no tiene permisos para crear usuarios',
     ADMIN_CANNOT_BE_CREATED = 'Solo el administrador puede crear otros administradores',
     MANAGER_CANNOT_BE_CREATED = 'Solo el administrador puede crear managers',
     TENANT_MISMATCH = 'El tenant del manager no coincide con el del nuevo usuario',
}
