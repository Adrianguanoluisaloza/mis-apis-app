# mis-apis-app

API backend en Node.js + Express con arquitectura por capas:

- `routes`: endpoints
- `controllers`: lógica HTTP
- `models`: acceso a base de datos
- `middlewares`: filtros y seguridad JWT
- `database`: persistencia y seed de usuario admin

## Requisitos

- Node.js 18+

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta valores:

```env
PORT=3000
JWT_SECRET=super-secreto-cambiar
JWT_EXPIRES_IN=2h
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Probar funcionamiento rápido

```bash
npm run smoke
```

## Pruebas Postman (como pidió el profe)

Se incluye colección + environment en la carpeta `postman/`:

- `postman/mis-apis-app.collection.json`
- `postman/local.environment.json`

Ejecutar todas las pruebas con Newman:

```bash
npm run postman:test
```

También puedes importar ambos archivos en Postman y correr la colección manualmente.

## Endpoints

Base: `http://localhost:3000/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile` (Bearer Token)

### Ejemplo (CRUD)

- `GET /ejemplo`
- `GET /ejemplo/:id`
- `POST /ejemplo` (Bearer Token)
- `PUT /ejemplo/:id` (Bearer Token)
- `DELETE /ejemplo/:id` (Bearer Token)

### Datos Personales (CRUD)

- `GET /datos-personales`
- `GET /datos-personales/:id`
- `POST /datos-personales` (Bearer Token)
- `PUT /datos-personales/:id` (Bearer Token)
- `DELETE /datos-personales/:id` (Bearer Token)

## Pruebas manuales (Thunder Client)

1. `POST /api/auth/login`
Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

2. Copiar `token` de la respuesta.
3. En requests protegidas, agregar header:

```text
Authorization: Bearer TU_TOKEN
```

4. Crear un registro:

`POST /api/ejemplo`

```json
{
  "nombre": "Juan",
  "descripcion": "Registro inicial"
}
```

5. Crear un dato personal:

`POST /api/datos-personales`

```json
{
  "nombres": "Adrian",
  "apellidos": "Guano",
  "email": "adrian@example.com",
  "telefono": "099000111"
}
```
