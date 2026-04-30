---
title: "Eliminación de Gauss-Jordan"
description: "Método sistemático para resolver sistemas de ecuaciones lineales reduciendo la matriz aumentada a su forma escalonada reducida (RREF)."
date: "2026-04-23"
---

# Eliminación de Gauss-Jordan

La **eliminación de Gauss-Jordan** es un algoritmo del álgebra lineal que permite resolver sistemas de ecuaciones lineales, calcular la inversa de una matriz y determinar el rango de una matriz. Es una extensión del método de eliminación gaussiana que reduce la matriz aumentada directamente a su **forma escalonada reducida por filas** (RREF, del inglés *Reduced Row Echelon Form*).

## Idea General

Dado un sistema de ecuaciones lineales $Ax = b$, se construye la **matriz aumentada** $[A \mid b]$ y se aplican operaciones elementales de fila hasta obtener una matriz de la forma $[I \mid x]$, donde $I$ es la identidad y $x$ es la solución.

## Operaciones Elementales de Fila

Las tres operaciones permitidas son:

1. **Intercambio de filas**: $R_i \leftrightarrow R_j$
2. **Escalado de una fila**: $R_i \leftarrow k \cdot R_i$ (con $k \neq 0$)
3. **Combinación lineal**: $R_i \leftarrow R_i + k \cdot R_j$

Estas operaciones **no alteran el conjunto de soluciones** del sistema.

## Algoritmo Paso a Paso

Dada una matriz aumentada $[A \mid b]$ de $m \times (n+1)$:

```text
Para cada columna col = 0, 1, …, n-1:
  1. Encontrar la fila con el mayor valor absoluto en esa columna
     (pivoteo parcial para estabilidad numérica)
  2. Intercambiar esa fila con la fila actual (si es necesario)
  3. Dividir la fila actual por el elemento pivote → leading 1
  4. Eliminar todos los demás elementos de esa columna
     sumando múltiplos de la fila actual al resto de las filas
```

Al finalizar, la matriz está en forma RREF.

## Interpretación del Resultado

### ✅ Solución Única

Si el rango de $A$ es igual al número de incógnitas $n$ y no hay contradicciones, el sistema tiene **exactamente una solución**. Cada variable queda expresada como un número.

$$x_1 = c_1, \quad x_2 = c_2, \quad \ldots, \quad x_n = c_n$$

### ∞ Infinitas Soluciones

Si el rango de $A$ es menor que $n$, existen **variables libres** (columnas sin pivote). La solución general se expresa en función de parámetros $t_1, t_2, \ldots$:

```text
x₁ = 5 − 2t₁
x₂ = t₁        (libre)
```

### ✗ Sin Solución

Si aparece una fila de la forma $[0 \; 0 \; \cdots \; 0 \mid k]$ con $k \neq 0$, el sistema es **inconsistente** (no tiene solución). Esto representa la ecuación $0 = k$, una contradicción.

## Ventajas sobre la Eliminación Gaussiana Simple

| Característica | Gauss | Gauss-Jordan |
|---|---|---|
| Resultado | Forma escalonada | RREF (escalonada reducida) |
| Requiere sustitución regresiva | Sí | No |
| Calcula la inversa | Difícil | Directo: $[A \mid I] \to [I \mid A^{-1}]$ |
| Complejidad | $O(n^3)$ | $O(n^3)$ |

## Ejemplo Numérico

Sistema $3 \times 3$:

$$\begin{cases} 2x_1 + x_2 - x_3 = 8 \\ -3x_1 - x_2 + 2x_3 = -11 \\ -2x_1 + x_2 + 2x_3 = -3 \end{cases}$$

Matriz aumentada:

```text
[ 2   1  -1 |  8 ]
[-3  -1   2 | -11]
[-2   1   2 | -3 ]
```

Aplicando Gauss-Jordan → RREF:

```text
[1  0  0 |  2]
[0  1  0 |  3]
[0  0  1 | -1]
```

**Solución:** $x_1 = 2,\; x_2 = 3,\; x_3 = -1$

> **Probá este ejemplo** directamente en la sección [Ecuaciones Lineales](/ecuaciones) de esta herramienta.
