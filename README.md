# Proyecto Integrador · React

Interfaz en React del proyecto integrador de Nuevas Tecnologías (CESDE).
Los módulos usan los mismos campos de los scripts de simulación en Python
(`integrador_nt_miercoles20262_1`).

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

**Usuario de prueba:** `admin@cesde.edu.co` / `Admin123*`
(también `empresa@cesde.edu.co` y `profe@cesde.edu.co` con `Clave123*`).

## Páginas

| Ruta           | Página       | Acceso  |
| -------------- | ------------ | ------- |
| `/login`       | Login        | Pública |
| `/registro`    | Registro     | Pública |
| `/dashboard`   | Dashboard    | Privada |
| `/empresas`    | Empresa      | Privada |
| `/retos`       | Reto         | Privada |
| `/categorias`  | Categoría    | Privada |
| `/prioridades` | Prioridad    | Privada |
| `/registros`   | Registros    | Privada |

**Rutas privadas:** `PrivateRoute` revisa si hay un usuario en sesión; si no lo hay,
redirige a `/login` y recuerda la página que se quería abrir. `PublicRoute` hace lo
contrario: si ya hay sesión, Login y Registro mandan al dashboard.

## Estructura (screaming architecture)

```
src/
├── App.jsx                 # definición de rutas
├── main.jsx
└── modules/
    ├── core/               # lo compartido por todos los módulos
    │   ├── components/     # DashboardLayout, Sidebar, SearchBar, PageHeader, FiltroSelect...
    │   ├── design-system/  # Button, Input, Modal, Tarjeta, Pildora, Badge...
    │   ├── hooks/          # useCrud, useFormulario, useTema, useBusqueda
    │   ├── lib/            # storage (localStorage), crudService, menu
    │   ├── routes/         # PrivateRoute, PublicRoute
    │   ├── states/         # BusquedaContext (buscador del menú lateral)
    │   └── utils/          # formato, validaciones, id
    ├── auth/               # login, registro y sesión (AuthContext)
    ├── dashboard/          # resumen general
    ├── empresa/            # ← módulo Empresa
    ├── reto/
    ├── categoria/
    ├── prioridad/
    └── registro/
```

Cada módulo tiene la misma forma:

```
empresa/
├── components/   EmpresaForm.jsx, EmpresaList.jsx
├── hooks/        useEmpresas.js
├── lib/          constantes.js, datosIniciales.js
├── pages/        EmpresasPage.jsx
├── services/     empresaService.js
└── utils/        validarEmpresa.js
```

## Datos

Se guardan en **localStorage** (claves `usuarios`, `sesion`, `empresas`, `retos`,
`categorias`, `prioridades`, `registros`). La primera vez se cargan datos de ejemplo
con los mismos ids que usan los scripts de Python. Para reiniciar los datos:
DevTools → Application → Local Storage → borrar.

Las contraseñas se guardan como hash SHA-256 (`contrasena_hash`), nunca en texto plano.

Las validaciones evitan los mismos "datos sucios" que se generaban en Python:
espacios sobrantes, NIT con formatos mezclados, correos sin @, categorías repetidas
con distinta escritura, días de respuesta absurdos (999) y fecha fin anterior a fecha inicio.
