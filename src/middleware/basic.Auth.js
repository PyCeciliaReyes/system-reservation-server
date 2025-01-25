import dotenv from 'dotenv';

dotenv.config();

export const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No autorizado: Falta la cabecera Authorization',
      });
    }
  
    // Decodificar credenciales
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    // Verificar credenciales (puedes personalizar estos valores)
    const expectedUsername = process.env.BASIC_AUTH_USERNAME;
    const expectedPassword = process.env.BASIC_AUTH_PASSWORD;
  
    if (username !== expectedUsername || password !== expectedPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'No autorizado: Credenciales incorrectas',
      });
    }
  
    // Si las credenciales son válidas, continuar con la solicitud
    next();
};  