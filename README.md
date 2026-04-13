# Mi primer backend de Adrián

Backend en Node.js + Express hecho por Adrián para practicar una API simple con estructura ordenada.

Incluye:

- `routes`: endpoints
- `controllers`: lógica HTTP
- `models`: acceso a base de datos
- `middlewares`: filtros y validación
- `database`: persistencia local y seed de usuario admin

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

## Endpoints

Base: `http://localhost:3000/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile` (Bearer Token)

### Ejemplo

- `GET /ejemplo`
- `GET /ejemplo/:id`
- `POST /ejemplo`
- `PUT /ejemplo/:id`
- `DELETE /ejemplo/:id`

### Datos Personales

- `GET /datos-personales`
- `GET /datos-personales/:id`
- `POST /datos-personales`
- `PUT /datos-personales/:id`
- `DELETE /datos-personales/:id`
