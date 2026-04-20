---
title: "Introducción a Matrices"
description: "Conceptos básicos sobre matrices, operaciones y propiedades fundamentales."
date: "2026-04-20"
---

# Introducción a Matrices

Una matriz es un arreglo bidimensional de números. Las matrices se utilizan para múltiples aplicaciones en álgebra lineal, geometría, estadística y ciencias de la computación.

## Conceptos Básicos

- **Filas ($m$)**: Las líneas horizontales de números.
- **Columnas ($n$)**: Las líneas verticales de números.
- **Dimensión**: Se denota como $m \times n$.

### Tipos de Matrices

1. **Matriz Cuadrada**: Tiene el mismo número de filas y columnas ($m = n$).
2. **Matriz Identidad ($I$)**: Matriz cuadrada con unos en la diagonal principal y ceros en el resto.
3. **Matriz Nula**: Todos sus elementos son ceros.

## Operaciones Fundamentales

### Suma y Resta
Para sumar o restar dos matrices, **deben tener la misma dimensión**. La operación se realiza elemento a elemento.

```text
A = [1 2]   B = [3 4]
    [3 4]       [5 6]

A + B = [4  6]
        [8 10]
```

### Multiplicación por un Escalar
Se multiplica cada elemento de la matriz por el número (escalar).

### Multiplicación de Matrices
Para multiplicar $A \times B$, el número de **columnas de $A$** debe ser igual al número de **filas de $B$**. El elemento $c_{ij}$ de la matriz resultante es el producto punto de la fila $i$ de $A$ y la columna $j$ de $B$.

## Propiedades Importantes

- La suma es **conmutativa**: $A + B = B + A$
- La multiplicación **NO** es necesariamente conmutativa: $A \times B \neq B \times A$
- La transpuesta de una suma es la suma de las transpuestas: $(A + B)^T = A^T + B^T$

> **Nota:** En esta calculadora puedes experimentar con todas estas operaciones en la sección "Calculadora" de la barra lateral.
