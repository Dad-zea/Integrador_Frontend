// Mismos campos de simular_usuario.py:
// id, nombre, correo, contrasena_hash, rol, activo, fecha_registro
// Los ids coinciden con IDS_USUARIO de simular_registros.py.
//
// Contraseñas de prueba:
//   admin@cesde.edu.co   -> Admin123*
//   empresa@cesde.edu.co -> Clave123*
//   profe@cesde.edu.co   -> Clave123*

export const ROLES = ['administrador', 'empresario', 'profesor']

export const USUARIOS_INICIALES = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    nombre: 'Administrador General',
    correo: 'admin@cesde.edu.co',
    contrasena_hash: '0a5bc3e342432f1bad92ffd51b785343ec72906cdba6a26131060b008e786656',
    rol: 'administrador',
    activo: true,
    fecha_registro: '2025-02-10T09:00:00',
  },
  {
    id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
    nombre: 'Laura Restrepo',
    correo: 'empresa@cesde.edu.co',
    contrasena_hash: '60a19b4cbeaa530bc1ed49ab40c58d90015ce59571403589bf71bca960c939cc',
    rol: 'empresario',
    activo: true,
    fecha_registro: '2025-05-21T14:30:00',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    nombre: 'Carlos Muñoz',
    correo: 'profe@cesde.edu.co',
    contrasena_hash: '60a19b4cbeaa530bc1ed49ab40c58d90015ce59571403589bf71bca960c939cc',
    rol: 'profesor',
    activo: true,
    fecha_registro: '2025-08-03T11:15:00',
  },
]
