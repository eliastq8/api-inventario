require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const admin = require('firebase-admin');

// Configuración del servicio con credenciales desde .env
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// IDs de los usuarios
const usuarios = [
  { id: 'H6DYsw9XdnbQGF9dizeUmmqawa32', nombre: 'gerente' },
  { id: 'Y2KTRi7XA3Ug7HSy86gkYnhOLip2', nombre: 'dueño' },
  { id: 'wFgJ5LwsS5fC1KZq773tnDwRxbz2', nombre: 'trabajador' },
];

// IDs de los productos
const productos = [
  'clavo', 'martillo', 'desarmador', 'cinta_metrica', 'taladro',
  'sierra', 'alicates', 'tornillo', 'tuerca', 'llave_inglesa',
  'nivel', 'escuadra', 'brocha', 'rodillo', 'mascarilla',
  'guantes', 'cinta_adhesiva', 'pinza_corte', 'cinta_aislante', 'pintura',
];

// Función para generar una fecha aleatoria entre dos fechas
function generarFechaAleatoria(inicio, fin) {
  const inicioMs = inicio.getTime();
  const finMs = fin.getTime();
  return new Date(inicioMs + Math.random() * (finMs - inicioMs));
}

// Generar datos de ventas
async function generarVentas() {
  const inicio = new Date('2024-10-15'); // Inicio del rango de fechas
  const fin = new Date(); // Fecha actual

  try {
    for (const producto of productos) {
      for (const usuario of usuarios) {
        // Generar una venta para cada producto y usuario
        const venta = {
          idUsuario: usuario.id,
          idProducto: producto,
          cantidad: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria entre 1 y 10
          fecha: admin.firestore.Timestamp.fromDate(
            generarFechaAleatoria(inicio, fin)
          ),
        };

        // Registrar la venta en Firestore
        await db.collection('ventas').add(venta);
        console.log(
          `Venta registrada: Producto ${producto}, Usuario ${usuario.nombre}, Cantidad ${venta.cantidad}`
        );
      }
    }
    console.log('Todas las ventas han sido registradas correctamente.');
  } catch (error) {
    console.error('Error al registrar las ventas:', error);
  }
}

generarVentas();
