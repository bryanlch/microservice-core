# 🚀 Backend Modular Template (Screaming Architecture)

![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![NestJS](https://img.shields.io/badge/nestjs-latest-red)
![License](https://img.shields.io/badge/license-MIT-blue)

Template base para backend modular, multi-entorno y escalable. Construido sobre **NestJS**, utiliza los principios de **Screaming Architecture** a nivel macro, aislando la infraestructura de la configuración, y brindando la flexibilidad de implementar cada feature (caso de uso) con **Arquitectura Hexagonal** o **Arquitectura por Capas** según la complejidad del dominio.

## 📚 Tabla de Contenidos

- [🚀 Instalación](#-instalación)
- [🏃 Ejecución](#-ejecución)
- [✨ Generador de Features (Scaffolding)](#-generador-de-features-scaffolding)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠 Estandarización de Respuestas](#-estandarización-de-respuestas)
- [🗄️ Microservicios y RabbitMQ](#️-microservicios-y-rabbitmq)
- [🛡️ Seguridad y Reglas](#️-seguridad-y-reglas)

---

## 🚀 Instalación

```bash
# Instalar dependencias
$ npm install
```

## 🏃 Ejecución

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## ✨ Generador de Features (Scaffolding)

Para mantener la consistencia entre todos los desarrolladores y evitar errores estructurales, este template utiliza **Plop.js** para generar nuevos módulos de negocio automáticamente.

**Nunca crees carpetas a mano.** Ejecuta el siguiente comando para crear un nuevo feature:

```bash
$ npm run generate
```

El CLI te preguntará el nombre del feature y qué arquitectura deseas utilizar en su interior:
1. **Feature por Capas (Layered)**: Genera la estructura clásica de NestJS (`Controller`, `Service`, `Module`). Ideal para CRUDs simples.
2. **Feature Hexagonal**: Genera una estructura estricta (`domain`, `application`, `infrastructure`). Ideal para lógicas de negocio complejas que necesitan estar aisladas de los frameworks.

---

## 📁 Estructura del Proyecto

```text
src/
├── common/                  # 🛠️ "Toolbox" Global (Agnóstico al negocio)
│   ├── constants/           # Mensajes, enums globales
│   ├── contracts/           # Contratos e Interfaces (API Response, Pagination)
│   ├── decorators/          # Decoradores personalizados (ej. @ResponseMessage)
│   ├── dtos/                # DTOs globales (ej. PaginationDto)
│   └── utils/               # Funciones utilitarias puras (ej. pagination.util)
│
├── config/                  # ⚙️ Configuraciones de entorno y arranque
│   ├── env.validation.ts
│   ├── swagger.config.ts
│   └── logger.config.ts
│
├── core/                    # 🧠 Elementos centrales de NestJS (Filtros, Interceptores globales)
│   ├── filters/             # exception.filter.ts
│   └── interceptors/        # transform.interceptor.ts
│
├── infrastructure/          # 🔌 Adaptadores Globales a tecnologías externas
│   ├── typeorm/
│   ├── rabbitmq/
│   └── cache/
│
├── shared/                  # 🤝 Cosas compartidas ENTRE features (Auth Module)
│
└── features/                # 📢 AQUÍ "GRITA" TU ARQUITECTURA
    ├── health/              # Feature de estado de salud
    └── [tus_features]/      # Generados mediante `npm run generate`
```

---

## 🛠 Estandarización de Respuestas

El template incluye un Interceptor y un Filtro de Excepciones globales para asegurar que **todas** las respuestas de la API compartan la misma estructura base, facilitando el trabajo del Frontend.

**Respuesta Exitosa Pura:**
```json
{
  "message": "Success",
  "data": { "id": 1, "name": "Ejemplo" },
  "traceId": "202605090005012",
  "statusCode": 200,
  "timestamp": "2026-05-09T06:05:00.000Z"
}
```

### Personalizar el mensaje de éxito
Puedes usar el decorador `@ResponseMessage()` en cualquier controlador para cambiar el mensaje genérico `"Success"`:

```typescript
import { Controller, Post } from '@nestjs/common';
import { ResponseMessage } from '@decorators/response-message.decorator';

@Controller('users')
export class UsersController {
  @Post()
  @ResponseMessage('Usuario creado exitosamente')
  create() {
    return { id: 1, name: 'bryan' };
  }
}
```

### Paginación Global
El template incluye soporte nativo para paginación estandarizada.

1. **Uso en el Controlador:**
```typescript
@Get()
findAll(@Query() paginationDto: PaginationDto) {
  return this.service.findAll(paginationDto);
}
```

2. **Formato de Respuesta Paginada:**
Cuando devuelves un objeto de tipo `PaginatedResponse`, el interceptor lo envolverá manteniendo los metadatos:
```json
{
  "message": "Success",
  "data": {
    "data": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "lastPage": 10,
      "limit": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  },
  "traceId": "...",
  "statusCode": 200,
  "timestamp": "..."
}
```

---

## 🗄️ Microservicios y RabbitMQ

- Configuración lista para usar con RabbitMQ en `src/infrastructure/rabbitmq/`.
- El servicio expone métodos listos para comunicación asíncrona.
- Variables de entorno (`RABBITMQ_URI`).

---

## 🛡️ Seguridad y Reglas

- **Versionado de API:** Versionado nativo por URI (`/api/v1`).
- **Control de Calidad:** Husky configurado para ejecutar `lint` en cada commit.
- **Estándares de Commits:** Commitlint forzando *Conventional Commits*.

---

## 🛠️ Estándares de Commits
Este proyecto utiliza **Husky** y **Commitlint** para asegurar mensajes de commit claros y estandarizados.

Los mensajes deben seguir el formato:
`<tipo>(opcional-scope): <descripción>`

**Tipos permitidos:**
- `feat`: Nueva funcionalidad.
- `fix`: Corrección de errores.
- `docs`: Cambios en la documentación.
- `style`: Cambios de formato (espacios, comas, etc).
- `refactor`: Refactorización de código.
- `test`: Añadir o corregir pruebas.
- `chore`: Tareas de mantenimiento.

Ejemplo: `feat(auth): add login endpoint`


---

## 📌 Versionado de API
El template utiliza el sistema de versionado nativo de NestJS (`URI Versioning`).

- **Versión por defecto:** `v1`
- **URL base:** `/api/v1/...`

### Crear una nueva versión (v2)
Para crear una ruta con una versión diferente, usa el decorador `@Version()`:

```typescript
@Controller('users')
export class UsersController {
  @Version('2')
  @Get()
  findAllV2() {
    return 'Esta es la versión 2';
  }
}
```
Acceso: `/api/v2/users`

