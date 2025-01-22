# Sistema de Reserva - lado servidor

Este proyecto es un sistema de reserva, que incluye un backend construido con **Node.js**, conectado a una base de datos **MySQL** alojada en AWS. 

El sistema permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre las siguientes entidades:
- **Persona**: Representa a los clientes que realizan reservas.
- **Habitación**: Contiene informacion de las habitaciones disponibles.
- **Reserva**: Administra las reservas realizadas, incluyendo validaciones de fechas y disponibilidad.

---

## 🚀 **Objetivo del Proyecto**

El objetivo principal de este proyecto es gestionar un sistema de reservas sencillo y funcional, implementando buenas practicas de desarrollo backend, validaciones robustas y una conexion eficiente a la base de datos. Este sistema puede ser la base para un software de gestion hotelera mas completo.

---

## 🛠️ **Herramientas Utilizadas**

### **Backend**
- **Node.js**: Plataforma principal para el desarrollo del backend.
- **Express**: Framework para la creacion de APIs RESTful.
- **Sequelize**: ORM para gestionar la interaccion con la base de datos MySQL.
- **Express-Validator**: Validaciones y sanitizacion de datos.
- **dotenv**: Manejo de variables de entorno.
- **mysql2**: Cliente MySQL para la conexion directa a la base de datos.

### **Base de Datos**
- **MySQL (AWS RDS)**: Base de datos relacional utilizada para almacenar la informacion.

---

## 🧰 **Estructura del Proyecto**
```
├── /src
│   ├── /config          # Configuracion (conexion con la base de datos)
│   │   └── database.js  # Configuracion de Sequelize y conexion MySQL
│   ├── /persona         # CRUD para personas
│   │   ├── persona.model.js       # Modelo de la tabla persona
│   │   ├── persona.controller.js  # Logica del CRUD
│   │   ├── persona.routes.js      # Definicion de las rutas para persona
│   │   └── persona.validation.js  # Validaciones especificas para persona
│   ├── /habitacion      # CRUD para habitaciones
│   │   ├── habitacion.model.js       # Modelo de la tabla habitacion
│   │   ├── habitacion.controller.js  # Logica del CRUD
│   │   ├── habitacion.routes.js      # Definicion de las rutas para habitacion
│   │   └── habitacion.validation.js  # Validaciones específicas para habitacion
│   ├── /reserva         # CRUD para reservas
│   │   ├── reserva.model.js       # Modelo de la tabla reserva
│   │   ├── reserva.controller.js  # Logica del CRUD
│   │   ├── reserva.routes.js      # Definicion de las rutas para reserva
│   │   └── reserva.validation.js  # Validaciones específicas para reserva
│   |
│   └── server.js        # Punto de entrada del servidor
├── .env                 # Variables de entorno (no se sube al repositorio)
├── package.json         # Dependencias del proyecto
├── README.md            # Documentación del proyecto
└── .gitignore           # Archivos y directorios a ignorar en Git
```
---

## 📋 **Requisitos Previos**

Antes de comenzar, asegurarse de tener instalados:
- **Node.js** (v14 o superior)
- **npm** (incluido con Node.js)

---

## 🌐 Enlace Activo

El proyecto está desplegado y accesible en el siguiente enlace:

🔗 **[Sistema de Reserva en Render](https://system-reservation-server.onrender.com)**

Puedes usar este enlace para interactuar con las APIs del sistema.

---

## **Pruebas:**

Para probar las APIs en vivo, utiliza el siguiente enlace como base URL:

- Base URL: `https://system-reservation-server.onrender.com`

### Endpoints disponibilizados:
1. **Persona:**

    - **POST /api/persona**: Crear una nueva persona.
        Body (ejemplo):
    ```
    {
      "nombrecompleto": "Juan Perez",
      "nrodocumento": "123456789",
      "correo": "juan.perez@example.com",
      "telefono": "0987654321"
    }
    ```
    - **GET /api/persona**: Listado de todas las personas registradas.
    - **GET /api/persona/:id**: Obtener los datos de una persona especifica por su ID.
    - **PUT /api/persona/:id**: Actualizar los datos de una persona específica.

    Body (ejemplo):
    ```
    {
      "nombrecompleto": "Juan P. Gomez",
      "telefono": "0999999999"
    }
    ```
    - **DELETE /api/persona/:id**: Eliminar una persona especifica por su ID.


2. **Habitacion:**

    - **POST /api/habitacion**: Crear una nueva habitacion.
        Body (ejemplo):
    ```
    {
      "habitacionpiso": 3,
      "habitacionnro": 15,
      "cantcamas": 2,
      "tienetelevision": true,
      "tienefrigobar": false
    }
    ```
    - **GET /api/habitacion**: Listado de todas las habitaciones registradas.
    - **GET /api/habitacion/:id**: Obtener los datos de una habitacion especifica por su ID.
    - **PUT /api/habitacion/:id**: Actualizar los datos de una habitacion especifica.

    Body (ejemplo):

    {
      "cantcamas": 3,
      "tienetelevision": false
    }

    - **DELETE /api/habitacion/:id**: Eliminar una habitación específica por su ID.

3. **Reserva:**

    - **POST /api/reserva**: Crear una nueva reserva.
        Body (ejemplo):
    ```
    {
      "fechaentrada": "2025-01-23",
      "fechasalida": "2025-01-25",
      "habitacionid": 1,
      "personaid": 1
    }
    ```
    - **GET /api/reserva**: Listado de todas las reservas registradas.
    - **GET /api/reserva/:id**: Obtener los datos de una reserva especifica por su ID.
    - **PUT /api/reserva/:id**: Actualizar los datos de una reserva especifica.
    ```
    Body (ejemplo):

    {
      "fechaentrada": "2025-01-24",
      "fechasalida": "2025-01-26",
      "habitacionid": 2,
      "personaid": 1
    }
    ```

    - **DELETE /api/reserva/:id**: Eliminar una reserva especifica por su ID.