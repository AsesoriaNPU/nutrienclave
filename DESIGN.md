# Sistema de Diseño: NutriEnclave

**ID del Proyecto:** 13503588763198533226

## 1. Atmósfera Visual y Tema
NutriEnclave tiene una estética **Premium, Limpia y Aspiracional**. El diseño debe transmitir salud, claridad y tecnología moderna. Se utiliza una disposición aireada con abundante espacio en blanco, bordes muy redondeados y efectos de desenfoque de fondo (glassmorphism) para crear profundidad.

## 2. Paleta de Colores y Roles
- **Verde Enclave (#76D14B):** Color institucional para botones principales, iconos de éxito y la parte "Nutri" del logo.
- **Azul Enclave (#2563EB):** Color secundario de marca para el círculo del logo, los circuitos tecnológicos y la parte "Enclave" del texto.
- **Verde Bosque (#5BB33A):** Color para estados hover de elementos verdes.
- **Blanco Puro (#FFFFFF):** Superficies de tarjetas y fondo principal.
- **Fondo Neutro (#F8F9FA):** Fondo de secciones alternas para crear ritmo visual.
- **Texto Profundo (#1B2733):** Títulos, subtítulos y navegación para un contraste profesional y legible.

## 3. Reglas de Tipografía
- **Familia:** Sans-serif limpia (Montserrat o Inter) siguiendo el estilo de la consultoría.
- **Títulos:** Pesados y asertivos en Texto Profundo (#1B2733).
- **Cuerpo:** Legible, color suave pero con buen contraste.

## 4. Estilos de Componentes
- **Botones:** Bordes muy redondeados (Pill-shaped o 12px), efectos de elevación al pasar el cursor.
- **Tarjetas/Contenedores:** Esquinas generosamente redondeadas (16px+), fondo blanco con borde gris muy sutil o sombra difusa.
- **Inputs:** Fondo gris niebla, bordes limpios, enfoque con borde Verde Nutri.

## 5. Principios de Layout
- **Espaciado:** Estrategia de "Generosidad". Márgenes amplios y alineación central o en cuadrícula limpia.
- **Iconografía:** Líneas finas (Thin/Light), minimalista y coherente con el color institucional.

## 6. Notas para la Generación en Stitch
Al pedir una nueva pantalla, incluye siempre este bloque en el prompt para asegurar consistencia:
> **DESIGN SYSTEM (REQUIRED):**
> - Platform: Mobile-first (responsive)
> - Theme: Light, Professional, Medical-Tech
> - Primary Accent: #76D14B (Verde Enclave)
> - Background: #FFFFFF / #F8F9FA
> - Text: #1B2733 (Dark Charcoal)
> - Border Radius: 12px (cards), Full (pill-shaped buttons)
