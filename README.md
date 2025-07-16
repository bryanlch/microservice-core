# 🚀 Backend Modular Template

![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

Template backend modular, multi-entorno y multi-tenant, desarrollado con NestJS, TypeORM y microservicios (RabbitMQ listo para usar). Ideal para cualquier tipo de sistema backend escalable.

## 📚 Tabla de Contenidos

- [🚀 Instalación](#installation)
- [🏃 Ejecución](#running-the-app)
- [📁 Estructura del Proyecto](#estructura-del-proyecto)
- [🛡️ Seguridad](#seguridad)
- [🗄️ Microservicios y RabbitMQ](#microservicios-y-rabbitmq)
- [📄 Licencia](#license)

## 🗄️ Microservicios y RabbitMQ

- Configuración lista para usar con RabbitMQ (ver `.env`):
  - `RABBITMQ_URI=amqp://localhost:5672`
  - `RABBITMQ_QUEUE=default_queue`
- Puedes registrar más microservicios fácilmente usando el `ClientsModule` de NestJS.

## 📁 Estructura del Proyecto

```
project-root/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── features/
│   │   └── _/ # folder
│   │       ├── _.module.ts
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── _.entity.ts
│   │       └── _.dto.ts
│   ├── middlewares/
│   │   └── _.middleware.ts
│   ├── communication/
│   │   ├── tcp/
│   │   │   └── tcp.client.ts
│   ├── utils/
│   ├── guard/
│   ├── decorator/
│   └── contracts/
├── test/
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
└── tsconfig.json
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🛡️ Seguridad

- Contraseñas encriptadas con `bcrypt`
- Autenticación JWT segura con expiración configurable
- Roles de usuario personalizables
- Control de sesiones activas y ubicaciones por token
- Uso de UUIDs como claves primarias para evitar predicciones

## 📄 Licencia

Nest está licenciado bajo [MIT](LICENSE).
