require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const admin = require('firebase-admin');

// Configura el servicio con las credenciales cargadas desde el .env
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

// Datos de los productos
const productos = [
  { id: "clavo", nombre: "Clavo", cantidad: 1000, descripcion: "Clavos de acero galvanizado" },
  { id: "martillo", nombre: "Martillo", cantidad: 50, descripcion: "Martillo de carpintero" },
  { id: "desarmador", nombre: "Desarmador", cantidad: 150, descripcion: "Desarmador plano y de cruz" },
  { id: "cinta_metrica", nombre: "Cinta Métrica", cantidad: 30, descripcion: "Cinta métrica de 5 metros" },
  { id: "taladro", nombre: "Taladro", cantidad: 20, descripcion: "Taladro inalámbrico con baterías incluidas" },
  { id: "sierra", nombre: "Sierra", cantidad: 25, descripcion: "Sierra manual de mano" },
  { id: "alicates", nombre: "Alicates", cantidad: 60, descripcion: "Alicates universales de acero" },
  { id: "tornillo", nombre: "Tornillo", cantidad: 2000, descripcion: "Tornillos galvanizados" },
  { id: "tuerca", nombre: "Tuerca", cantidad: 1500, descripcion: "Tuercas de diferentes tamaños" },
  { id: "llave_inglesa", nombre: "Llave Inglesa", cantidad: 40, descripcion: "Llave inglesa ajustable" },
  { id: "nivel", nombre: "Nivel", cantidad: 15, descripcion: "Nivel de burbuja de 30 cm" },
  { id: "escuadra", nombre: "Escuadra", cantidad: 20, descripcion: "Escuadra metálica para carpintería" },
  { id: "brocha", nombre: "Brocha", cantidad: 80, descripcion: "Brocha para pintar paredes" },
  { id: "rodillo", nombre: "Rodillo", cantidad: 50, descripcion: "Rodillo para pintar techos" },
  { id: "mascarilla", nombre: "Mascarilla", cantidad: 100, descripcion: "Mascarilla de protección contra polvo" },
  { id: "guantes", nombre: "Guantes", cantidad: 70, descripcion: "Guantes de seguridad" },
  { id: "cinta_adhesiva", nombre: "Cinta Adhesiva", cantidad: 60, descripcion: "Cinta adhesiva multiusos" },
  { id: "pinza_corte", nombre: "Pinza de Corte", cantidad: 35, descripcion: "Pinza de corte de precisión" },
  { id: "cinta_aislante", nombre: "Cinta Aislante", cantidad: 150, descripcion: "Cinta aislante de alta calidad" },
  { id: "pintura", nombre: "Pintura", cantidad: 40, descripcion: "Pintura blanca para interiores" },
];

async function cargarProductos() {
  try {
    for (const producto of productos) {
      await db.collection('productos').doc(producto.id).set({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        descripcion: producto.descripcion,
      });
      console.log(`Producto ${producto.nombre} agregado con éxito.`);
    }
    console.log('Todos los productos se han agregado correctamente.');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

cargarProductos();
