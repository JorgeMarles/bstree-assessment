# AGENTS.md — BST Visualizer Challenge

Proyecto académico: visualizador interactivo de Binary Search Tree (BST) en React.
El código tiene bugs intencionales, TODOs y oportunidades de optimización que deben resolverse.

---

## Stack

| Herramienta | Uso |
|---|---|
| React 18 + Vite | Framework UI + build |
| react-d3-tree | Visualización del árbol |
| Vitest | Tests unitarios |
| CSS Modules | Estilos (`*.module.css`) |

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (localhost:5173)
npm run test         # Tests en terminal
npm run test:ui      # Tests con UI en el navegador
```

## Estructura de archivos

```
src/
├── utils/
│   ├── bst.js            # Lógica del BST (bugs + TODOs)
│   └── bst.test.js       # Tests unitarios (editable)
├── components/
│   ├── BSTVisualizer.jsx      # Componente principal (bugs + features)
│   ├── BSTVisualizer.module.css
│   ├── TraversalPanel.jsx     # READ-ONLY — no modificar
│   └── SearchBar.jsx          # READ-ONLY — no modificar
├── App.jsx               # Entry point
└── main.jsx              # Vite entry
```

---

## Tareas (en orden de prioridad)

### 🔴 Nivel 1 — Bug Fixing (Obligatorio)
6 bugs marcados con `// BUG` en `bst.js` y `BSTVisualizer.jsx`.

| # | Archivo | Descripción | Marcador |
|---|---|---|---|
| BUG #1 | `bst.js` | `insert` siempre va a la derecha | `// BUG #1` |
| BUG #2 | `bst.js` | Condición duplicada/incorrecta en `insert` | `// BUG #2` |
| BUG #3 | `bst.js` | `search` usa `==` (coerción de tipos) | `// BUG #3` |
| BUG #4 | `bst.js` | `toD3Format` ignora hijo derecho sin hijo izquierdo | `// BUG #4` |
| BUG #5 | `BSTVisualizer.jsx` | `getTraversalResult` se recrea en cada render | `// BUG #5` |
| BUG #6 | `BSTVisualizer.jsx` | NaN aceptado silenciosamente sin feedback | `// BUG #6` |

**Verificación:** insertar `10, 5, 15, 3, 7` y validar que el árbol se vea correcto.

### 🟡 Nivel 2 — Implementar funciones (Obligatorio)
Funciones marcadas con `// TODO` en `bst.js`:

- `inOrder(node)` → recorrido In-Order (izquierda → raíz → derecha), retorna `number[]`
- `preOrder(node)` → recorrido Pre-Order (raíz → izquierda → derecha), retorna `number[]`
- `postOrder(node)` → recorrido Post-Order (izquierda → derecha → raíz), retorna `number[]`
- `getHeight(node)` → altura del árbol, retorna `number`

### 🟢 Nivel 3 — Features (Obligatorio)
En `BSTVisualizer.jsx`:

- Nodos que coincidan con `foundNode` deben **resaltarse** (fill del círculo diferente)
- Input de inserción debe mostrar **mensaje de error** si el valor no es numérico

### 🔵 Nivel 4 — Performance (Diferenciador)
Identificar y corregir 2 problemas de rendimiento con los hooks correctos. Justificar cada decisión.

---

## Reglas del BST

- Subárbol izquierdo: valores **menores** que el nodo (`value < node.value`)
- Subárbol derecho: valores **mayores** que el nodo (`value > node.value`)
- Duplicados: ignorados silenciosamente (retornar nodo sin cambios)
- `toD3Format`: debe manejar nodos con **solo hijo derecho** (no solo izquierdo)

---

## Convenciones de código

- **`===` siempre** — nunca `==`
- **Funciones puras** para lógica BST — retornar nuevos objetos, nunca mutar
- **Inmutabilidad** en estado React — usar spread operator, nunca mutación directa
- **JSDoc** en todas las funciones exportadas de `bst.js`
- **Nombres claros** en inglés para variables y funciones
- **CSS solo en `BSTVisualizer.module.css`** — no crear nuevos archivos de estilos
- **No renombrar en destructuring** a menos que sea necesario

---

## React Best Practices

| Hook | Qué memoizar |
|---|---|
| `useMemo` | `traversalResult`, `d3Data` (datos derivados del estado) |
| `useCallback` | `renderCustomNode`, `handleInsert`, `handleSearch`, `handleRandomInsert` |

- State updates con callbacks: `setRoot(prev => insert(prev, val))`

---

## Git Workflow

### Ramas esperadas

```
feature/fix-insert-bug
feature/implement-traversals
feature/node-highlight
feature/performance-optimization
```

### Commits atómicos — Conventional Commits

```
fix: correct insert to place smaller values on left subtree
feat: implement in-order, pre-order and post-order traversals
fix: resolve toD3Format bug for right-only child nodes
perf: memoize traversal computation with useMemo
```

Cada rama con al menos **1 commit atómico** antes del PR.

---

## Tests esperados (mínimo 5 casos con edge cases)

Archivo: `src/utils/bst.test.js`

Casos recomendados:
1. Insertar en árbol vacío
2. Insertar duplicados (validar comportamiento esperado)
3. Recorridos en árbol con un solo nodo
4. `getHeight` en árbol vacío (retorna 0 o -1)
5. `getHeight` en árbol desbalanceado
6. Búsqueda de valor inexistente
7. `toD3Format` con nodo que solo tiene hijo derecho

---

## Criterios de evaluación

| Criterio | Peso |
|---|---|
| Corrección algorítmica (BST real + edge cases) | 30% |
| Calidad del código (funciones puras, nombres claros) | 20% |
| React bien usado (inmutabilidad, memoización) | 20% |
| Git workflow (commits atómicos, PR description) | 15% |
| Documentación (JSDoc, README actualizado) | 10% |
| Tests (≥5 casos cubriendo edge cases) | 5% |

---

## Uso de IA — Documentar en PR

En el PR, incluir sección `## AI Usage`:

- Qué generó el agente
- Qué modificaste y por qué
- Qué rechazaste y por qué era incorrecto

**Regla de oro:** no aprobar si no puedes explicar tu propio código.

---

## Entrega

1. Fork del repositorio
2. Trabajar en ramas `feature/*`
3. PRs con descripción completa por cada rama
4. Incluir capturas del árbol con `10, 5, 15, 3, 7, 12, 20`
5. Deadline: ver Campus Virtual
