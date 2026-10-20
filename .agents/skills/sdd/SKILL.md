---
name: sdd
description: Úsala cuando el usuario quiera crear o modificar una funcionalidad siguiendo SDD. No usar para consultas teóricas.
---

# Desarrollo con SDD

## Objetivo
Desarrollar funcionalidades siguiendo SDD:
Especificación → Plan → Tareas → Implementación → Verificación.

## Entradas
- Descripción de la funcionalidad.
- Código y documentación del proyecto.

Si falta información importante, pregunta al usuario.

## Salidas
Crear una carpeta `specs/nombre-funcionalidad/` con:

- `spec.md`: requisitos de la funcionalidad.
- `plan.md`: pasos para desarrollarla.
- `tasks.md`: tareas con checkboxes.

Al finalizar, entregar la funcionalidad implementada.

## Instrucciones
1. Analiza el proyecto y la solicitud.
2. Crea `spec.md` con los requisitos.
3. Pide aprobación.
4. Crea `plan.md` con el plan de desarrollo.
5. Pide aprobación.
6. Crea `tasks.md` con las tareas.
7. Pide aprobación antes de implementar.
8. Implementa las tareas una por una.
9. Verifica los resultados.

## Reglas
- No avanzar sin aprobación.
- No implementar funcionalidades fuera de la especificación.
- Mantener la documentación sencilla.
- Marcar las tareas completadas en `tasks.md`.

## Criterios de aceptación
La tarea está terminada cuando:

- [ ] Existen los tres documentos.
- [ ] Los requisitos están claros.
- [ ] El usuario aprobó cada fase.
- [ ] Todas las tareas están completadas.
- [ ] La funcionalidad cumple los requisitos.
- [ ] El agente informa del resultado final.

## Ejemplo

Usuario:
"Quiero añadir un buscador de libros usando SDD".

El agente:
1. Revisa el proyecto.
2. Crea `spec.md` con los requisitos.
3. Solicita aprobación.
4. Continúa siguiendo las instrucciones de SDD.
