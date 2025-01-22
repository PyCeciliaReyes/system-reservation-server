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
