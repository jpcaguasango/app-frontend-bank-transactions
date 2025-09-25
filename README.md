# 🏡 Bank Transactions - Frontend

Aplicación web desarrollada con **Next.js** para visualizar y gestionar transacciones. Este frontend no consume ninguna api para gestionar sus datos, todos los datos se almacenan en el localStorage manejado por Redux y utiliza **Chakra UI** para los componentes de la interfaz de usuario.

---

## 📝 Requisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

Antes de ejecutar el proyecto, asegúrate de que el NEXT_PUBLIC_TRADE_API_TOKEN esté configurada correctamente en el archivo de variables de entorno.

---

## ⚡ Instalación y ejecución

```bash
# Instalar dependencias
npm install
# o
yarn install

# Copiar el archivo de variables de entorno de ejemplo
cp .env.local.example .env.local

# Abrir el archivo .env.local y configurar la URL del backend
# Ejemplo: NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Ejecutar la aplicación en modo de desarrollo
npm run dev
# o
yarn dev
```
