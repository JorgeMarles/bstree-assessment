/**
 * Binary Search Tree - Core Data Structure
 *
 * ⚠️  NOTA PARA EL ESTUDIANTE:
 * Este archivo contiene la lógica central del BST.
 * Hay errores intencionales que debes encontrar y corregir.
 * Lee cada función con cuidado antes de modificar.
 */

// ─── Node Factory ────────────────────────────────────────────────────────────

/**
 * Crea un nodo para el BST.
 * @param {number} value
 * @returns {{ value: number, left: null, right: null }}
 */
export const createNode = (value) => ({
  value,
  left: null,
  right: null,
});

// ─── Core Operations ─────────────────────────────────────────────────────────

/**
 * Inserta un valor en el árbol.
 *
 * @param {object|null} node - Nodo raíz del subárbol actual
 * @param {number} value - Valor a insertar
 * @returns {object} - Nuevo subárbol con el valor insertado
 */
export const insert = (node, value) => {
  if (node === null) {
    return createNode(value);
  }

  if (value > node.value) {
    return {
      ...node,
      right: insert(node.right, value),
    };
  }

  if (value < node.value) {
    return {
      ...node,
      left: insert(node.left, value),
    };
  }

  return node;
};

/**
 * Busca un valor en el árbol.
 *
 * @param {object|null} node
 * @param {number|string} value
 * @returns {object|null} - El nodo encontrado, o null
 */
export const search = (node, value) => {
  if (node === null) return null;

  if (node.value === value) return node;

  if (value < node.value) {
    return search(node.left, value);
  }

  return search(node.right, value);
};

// ─── Traversals ──────────────────────────────────────────────────────────────

/**
 * Recorrido In-Order (izquierda → raíz → derecha).
 * En un BST válido, produce los valores en orden ascendente.
 *
 * Debe retornar un array de valores en orden in-order.
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const inOrder = (node) => {
  const arr = [];
  inOrderRecursive(node, arr);
  return arr;
};

const inOrderRecursive = (node, arr) => {
  if (node === null) return;
  inOrderRecursive(node.left, arr);
  arr.push(node.value);
  inOrderRecursive(node.right, arr);
};

/**
 * Recorrido Pre-Order (raíz → izquierda → derecha).
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const preOrder = (node) => {
  const arr = [];
  preOrderRecursive(node, arr);
  return arr;
};

const preOrderRecursive = (node, arr) => {
  if (node === null) return;
  arr.push(node.value);
  preOrderRecursive(node.left, arr);
  preOrderRecursive(node.right, arr);
};

/**
 * Recorrido Post-Order (izquierda → derecha → raíz).
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const postOrder = (node) => {
  const arr = [];
  postOrderRecursive(node, arr);
  return arr;
};

const postOrderRecursive = (node, arr) => {
  if (node === null) return;
  postOrderRecursive(node.left, arr);
  postOrderRecursive(node.right, arr);
  arr.push(node.value);
};

// ─── Tree Transformation ─────────────────────────────────────────────────────

/**
 * Transforma la estructura interna del BST al formato que espera react-d3-tree.
 *
 * react-d3-tree espera: { name: string, children: Array }
 * Nuestra estructura interna es: { value: number, left: Node|null, right: Node|null }
 *
 * @param {object|null} node
 * @returns {object|null} - Nodo en formato react-d3-tree, o null
 */
export const toD3Format = (node) => {
  if (node === null) return null;

  const children = [];

  if (node.left !== null) {
    children.push(toD3Format(node.left));
  }
  if (node.right !== null) {
    children.push(toD3Format(node.right));
  }

  return {
    name: String(node.value),
    children,
  };
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Calcula la altura del árbol.
 * Se implementa Altura basada en nodos, por lo que un arbol vacío tendrá altura 0
 *
 * @param {object|null} node
 * @returns {number}
 */
export const getHeight = (node) => {
  if (node === null) return 0;
  return 1 + Math.max(getHeight(node.right), getHeight(node.left));
};

/**
 * Genera un número entero aleatorio entre min y max (inclusivo).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
