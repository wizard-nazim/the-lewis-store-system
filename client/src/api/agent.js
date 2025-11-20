const API_URL = 'http://localhost:5000/api/'; // Update to your actual backend URL

// *** FIX: Helper to transform backend data structure to frontend needs ***
const transformProduct = (product) => {
  if (!product) return null;
  return {
    // Backend uses 'id' for API, or '_id' for Mongo/Mongoose. Use 'id' if available.
    id: product.id || product._id, 
    name: product.name,
    description: product.description,
    price: product.price,
    // Frontend expects 'pictureUrl', backend likely returns an 'image' array or 'pictureUrl'
    pictureUrl: Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : product.pictureUrl,
    category: product.category,
    subCategory: product.subCategory,
    sizes: product.sizes,
    date: product.date,
    bestseller: product.bestseller || false,
  };
};
// *************************************************************************

const requests = {
  get: async (url) => {
    const res = await fetch(`${API_URL}${url}`, { credentials: 'include' });
    // Check for specific 404/204 to return null instead of throwing an error for things like empty baskets
    if (res.status === 204 || res.status === 404) return null; 
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  },
  post: async (url, body) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    // Check if there is content to parse (e.g., POST on payments might return 200/201 without content)
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return {}; // Return empty object if no content
  },
  del: async (url) => {
    const res = await fetch(`${API_URL}${url}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    // DELETE requests often return 204 No Content
    return {}; 
  },
  // Add put if needed later
};

const Catalog = {
  // *** FIX: Use API and transform data ***
  list: async () => {
    const products = await requests.get('products');
    // Map and transform the product list
    return products.map(transformProduct);
  },
  details: async (id) => {
    const product = await requests.get(`products/${id}`);
    // Transform the single product
    return transformProduct(product);
  },
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values) => requests.post('account/login', values),
  register: (values) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
};

const Orders = {
  list: () => requests.get('orders'),
  create: (values) => requests.post('orders', values),
};

const Payments = {
  createPaymentIntent: () => requests.post('payments', {}),
  simulateWebhook: (id) => requests.post('payments/webhook', { Id: id, Success: true }),
};

export default { Catalog, Basket, Account, Orders, Payments };