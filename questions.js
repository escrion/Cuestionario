
// Banco de preguntas
const BANK = [
  // SELENIUM
  {
    cat: "Selenium", q: "¿Por qué suele ser mala práctica mezclar Implicit Wait con Explicit Wait en Selenium?", opts: [
      "Porque Implicit Wait desactiva los ExpectedConditions",
      "Porque ambos tiempos pueden sumarse y provocar esperas impredecibles y timeouts difíciles de diagnosticar",
      "Porque Explicit Wait solo funciona con XPath",
      "Porque Implicit Wait fuerza reintentos infinitos"
    ], a: 1, exp: "Implicit Wait afecta el polling de findElement y puede interactuar con esperas explícitas, generando demoras acumuladas e impredecibles (flakiness y diagnósticos complejos)."
  },

  {
    cat: "Selenium", q: "La excepción StaleElementReferenceException normalmente indica que…", opts: [
      "El locator es inválido",
      "El elemento fue encontrado, pero el DOM cambió y la referencia ya no es válida",
      "El driver perdió la sesión",
      "Hay un problema de DNS"
    ], a: 1, exp: "Ocurre cuando el elemento referenciado ya no existe en el DOM actual (re-render, navegación, cambios dinámicos). Se mitiga re-localizando y usando waits por condiciones."
  },

  {
    cat: "Selenium", q: "¿Cuál práctica reduce flakiness al interactuar con elementos dinámicos?", opts: [
      "Usar Thread.sleep() después de cada click",
      "Usar WebDriverWait con condiciones específicas (visible/clickable) y locators estables",
      "Aumentar Implicit Wait a 60s",
      "Ignorar todas las excepciones"
    ], a: 1, exp: "Esperas explícitas basadas en condiciones reales + selectores estables (data-*), y evitar sleeps arbitrarios es clave para estabilidad."
  },

  {
    cat: "Selenium", q: "En ejecución paralela con TestNG/JUnit, ¿qué es crítico para thread-safety?", opts: [
      "Compartir un único WebDriver global",
      "Crear un WebDriver por hilo (por ejemplo con ThreadLocal) y evitar estado compartido",
      "Usar siempre PageFactory",
      "Deshabilitar screenshots"
    ], a: 1, exp: "El WebDriver no es thread-safe. Se recomienda driver por thread (ThreadLocal), datos aislados y evitar variables estáticas compartidas."
  },

  {
    cat: "Selenium", q: "¿Cuál es el enfoque más robusto para ejecutar UI tests en infraestructura distribuida/CI?", opts: [
      "Abrir navegadores manualmente en cada build",
      "Usar Selenium Grid/RemoteWebDriver (idealmente containerizado) para escalar y paralelizar",
      "Ejecutar solo en modo headed para ver el navegador",
      "Evitar capturar logs para acelerar"
    ], a: 1, exp: "Grid/RemoteWebDriver permite distribución y paralelización; con Docker es reproducible y escalable en CI."
  },

  {
    cat: "Selenium", q: "¿Cuál selector suele ser más mantenible para UI automation?", opts: [
      "XPath absoluto (/html/body/…)",
      "CSS/XPath basado en atributos estables (por ejemplo data-testid/data-cy)",
      "Selector por texto visible siempre",
      "Selector por index de elementos (nth-child)"
    ], a: 1, exp: "Los atributos estables dedicados a pruebas reducen fragilidad ante cambios de layout/estilos."
  },

  {
    cat: "Selenium", q: "Si debes manejar múltiples ventanas/pestañas, ¿qué estrategia es correcta?", opts: [
      "Usar driver.navigate().refresh() para cambiar de ventana",
      "Guardar window handles, disparar acción, y cambiar con switchTo().window(handle)",
      "Usar implicit wait para que el foco cambie",
      "Selenium cambia automáticamente a la última ventana siempre"
    ], a: 1, exp: "Se gestiona con getWindowHandles(), se identifica el nuevo handle y se cambia con switchTo().window()."
  },

  {
    cat: "Selenium", q: "En Selenium 4, ¿para qué sirven los Relative Locators (above/below/near)?", opts: [
      "Para ejecutar pruebas en paralelo",
      "Para localizar elementos en relación espacial con otros elementos cuando no hay identificadores estables",
      "Para interceptar requests de red",
      "Para mockear APIs"
    ], a: 1, exp: "Permiten ubicar elementos por relaciones geométricas, útil en casos puntuales (no reemplaza selectores estables)."
  },

  // CYPRESS
  {
    cat: "Cypress", q: "¿Por qué en Cypress no puedes asignar directamente el resultado de cy.get(...) a una variable y usarlo fuera?", opts: [
      "Porque cy.get() devuelve un Promise estándar",
      "Porque Cypress usa una cola de comandos async y las acciones se resuelven luego; se debe usar .then() o aliases",
      "Porque JavaScript no soporta variables",
      "Porque Cypress solo permite callbacks en TypeScript"
    ], a: 1, exp: "Los comandos se encolan y ejecutan después; para trabajar con valores debes encadenar con .then() o usar aliases (cy.wrap().as())."
  },

  {
    cat: "Cypress", q: "La característica de retry-ability de Cypress significa que…", opts: [
      "Reintenta todo el test completo automáticamente",
      "Reintenta comandos y aserciones hasta que pasen o se cumpla el timeout, reduciendo waits manuales",
      "Solo reintenta requests fallidas",
      "Solo reintenta en modo headed"
    ], a: 1, exp: "Cypress reintenta automáticamente comandos/aserciones dentro de su timeout, lo que disminuye flakiness si se usa correctamente."
  },

  {
    cat: "Cypress", q: "¿Cuál es la forma recomendada de esperar una llamada de red específica y validar su payload?", opts: [
      "cy.wait(5000)",
      "cy.intercept('GET','/api/...').as('req'); cy.wait('@req') y luego asserts",
      "setTimeout en el test",
      "Recargar la página hasta que cargue"
    ], a: 1, exp: "cy.intercept permite observar/stub y esperar por alias, con validaciones determinísticas (evitar sleeps)."
  },

  {
    cat: "Cypress", q: "Buenas prácticas de selectores en Cypress suelen recomendar…", opts: [
      "Usar clases CSS del framework (ej. .btn-primary)",
      "Usar atributos dedicados (data-cy / data-testid) para estabilidad",
      "Usar XPath absoluto",
      "Usar siempre texto exacto visible"
    ], a: 1, exp: "Atributos dedicados a pruebas reducen roturas por cambios de estilos y estructura."
  },

  {
    cat: "Cypress", q: "¿Qué problema evita cy.origin() (Cypress v10+)?", opts: [
      "Evita que el navegador consuma memoria",
      "Permite automatizar flujos que cruzan diferentes orígenes (cross-origin) respetando la seguridad del navegador",
      "Permite ejecutar pruebas móviles reales",
      "Habilita Selenium Grid"
    ], a: 1, exp: "Para escenarios con múltiples dominios (SSO, pagos), cy.origin encapsula comandos por origen."
  },

  {
    cat: "Cypress", q: "¿Cuál enfoque es más confiable para controlar estado de la app en tests e2e?", opts: [
      "Hacer login UI en cada test obligatoriamente",
      "Preparar estado vía API/fixtures o comandos custom (setup) y luego validar por UI",
      "Depender de datos del ambiente compartido",
      "Reusar cookies entre spec sin control"
    ], a: 1, exp: "Setups por API o tasks reducen tiempos y flakiness; UI se usa para validar, no para preparar todo el estado."
  },

  {
    cat: "Cypress",q: "¿En qué ruta se recomienda crear el archivo de prueba 'todo_spec.cy.js' para Cypress v10+?",
    opts: [
      "cypress/integration/",
      "cypress/e2e/",
      "tests/e2e/",
      "src/cypress/"
    ],
    a: 1,
    exp: "Desde Cypress v10 la carpeta por defecto es cypress/e2e/."
  },
  {
    cat: "Cypress",
    q: "¿Cuál comando se usa típicamente para correr Cypress en modo interactivo (UI) localmente?",
    opts: [
      "npx cypress open",
      "npx cypress run --headed",
      "cypress start",
      "npm test --cypress-ui"
    ],
    a: 0,
    exp: "'cypress open' abre la interfaz interactiva para ejecutar specs."
  },
  {
    cat: "Cypress",
    q: "Para agregar una tarea en un TodoMVC (input 'new todo'), ¿qué patrón de acción es el más común?",
    opts: [
      "cy.get('.new-todo').type('Comprar leche{enter}')",
      "cy.click('Comprar leche')",
      "cy.post('/todos','Comprar leche')",
      "cy.wait(5000)"
    ],
    a: 0,
    exp: "Se escribe en el input y se presiona Enter para crear el ítem."
  },
  {
    cat: "Cypress",
    q: "¿Cómo validar que existen exactamente 3 tareas en la lista?",
    opts: [
      "cy.get('.todo-list li').should('have.length', 3)",
      "cy.get('li').should('contain', 3)",
      "cy.assert(3)",
      "cy.get('.todo-list').should('eq', 3)"
    ],
    a: 0,
    exp: "La aserción 'have.length' valida cantidad de elementos."
  },
  {
    cat: "Cypress",
    q: "Para marcar como completada una tarea, ¿qué selector/acción es típica en TodoMVC?",
    opts: [
      "Hacer click en el checkbox del item (por ejemplo '.toggle')",
      "Recargar la página",
      "Cambiar el URL manualmente",
      "Ejecutar cy.pause()"
    ],
    a: 0,
    exp: "En TodoMVC, el checkbox '.toggle' marca el item como completado."
  },
  {
    cat: "Cypress",
    q: "¿Qué verificación suele confirmar que una tarea quedó completada?",
    opts: [
      "El elemento tiene clase 'completed' o el texto está tachado via CSS",
      "El navegador se cierra",
      "El test imprime logs",
      "El contador aumenta"
    ],
    a: 0,
    exp: "Normalmente el item recibe la clase 'completed' y el estilo tachado."
  },
  {
    cat: "Cypress",
    q: "¿Qué validación corresponde al filtro 'Active'?",
    opts: [
      "Muestra solo tareas no completadas",
      "Muestra todas las tareas",
      "Muestra solo tareas completadas",
      "Elimina tareas"
    ],
    a: 0,
    exp: "Active filtra tareas pendientes (no completadas)."
  },
  {
    cat: "Cypress",
    q: "¿Qué acción elimina las tareas completadas en TodoMVC?",
    opts: [
      "Click en 'Clear completed'",
      "Click en 'Completed'",
      "cy.reload()",
      "Borrar cookies"
    ],
    a: 0,
    exp: "El botón 'Clear completed' elimina ítems completados."
  },
  {
    cat: "Cypress",
    q: "Para mejorar estabilidad y evitar repetir setup en cada test, ¿qué patrón es recomendado?",
    opts: [
      "Usar beforeEach() para visitar la página y preparar estado",
      "Duplicar código en todos los tests",
      "Usar waits fijos (cy.wait) siempre",
      "Ejecutar los tests en orden obligatorio"
    ],
    a: 0,
    exp: "beforeEach permite un setup consistente por test y reduce duplicación."
  },

// JMETER
{
  cat: "JMeter", q: "¿Qué configuración de Thread Group controla cuántos usuarios concurrentes se simulan?", opts: [
    "Ramp-up",
    "Number of Threads (users)",
    "Loop Count",
    "Think Time"
  ], a: 1, exp: "Number of Threads define usuarios virtuales. Ramp-up controla cómo se incrementan en el tiempo; Loop Count repite iteraciones."
},

{
  cat: "JMeter", q: "¿Cuál práctica es clave para ejecutar pruebas de carga de forma correcta en CI?", opts: [
    "Ejecutar siempre en modo GUI para ver los gráficos",
    "Ejecutar en modo non-GUI (CLI), guardar resultados y generar reportes HTML",
    "Usar solo listeners pesados en runtime",
    "Aumentar el número de listeners para más precisión"
  ], a: 1, exp: "En carga, los listeners pesados degradan el generador. En CI se recomienda non-GUI + reportes offline."
},

{
  cat: "JMeter", q: "La correlación en JMeter se refiere a…", opts: [
    "Ordenar los threads por prioridad",
    "Capturar valores dinámicos (tokens/IDs) de una respuesta y reutilizarlos en requests posteriores",
    "Aumentar el throughput",
    "Reducir la latencia de red"
  ], a: 1, exp: "Se extraen valores con Regex/JSON Extractor y se parametriza la siguiente petición (p. ej., CSRF, sessionId)."
},

{
  cat: "JMeter", q: "Para analizar performance, ¿qué métrica suele ser más útil que el promedio (average)?", opts: [
    "El percentil 90/95/99 (p95/p99)",
    "El número total de samples solamente",
    "El tamaño del script",
    "El nombre del thread"
  ], a: 0, exp: "Los percentiles reflejan colas y outliers; el promedio puede ocultar degradaciones severas para parte de usuarios."
},

{
  cat: "JMeter", q: "¿Cuál combinación modela mejor comportamiento real de usuarios?", opts: [
    "Sin timers y 100% de requests en ráfaga",
    "Uso de timers (think time), ramp-up adecuado y datos parametrizados (CSV/DataSet)",
    "Solo assertions sin datos",
    "Aumentar heap al máximo sin control"
  ], a: 1, exp: "Think time y ramp-up realistas + datos variados mejoran fidelidad del test; además evita caches irreales."
},

{
  cat: "JMeter",
    q: "¿Cuál es el propósito principal de JMeter?",
      "opts": [
        "Pruebas funcionales de Interfaz de usuario",
        "Pruebas de rendimiento y carga",
        "Gestión de proyectos",
        "Automatización de pruebas unitarias"
      ],
        a: 1,
          exp: "JMeter se usa principalmente para pruebas de rendimiento/carga."
},
{
  cat: "JMeter",
    q: "¿Cuál de los siguientes elementos de JMeter se utiliza para agrupar peticiones que serán ejecutadas por un hilo?",
      opts: [
        "Assertion",
        "Sampler",
        "Thread Group",
        "Test Fragment"
      ],
        a: 2,
          exp: "Thread Group define usuarios/hilos y ejecuta sus elementos."
},
{
  cat: "JMeter",
    q: "¿Qué componente se utiliza en JMeter para simular una petición HTTP?",
      opts: [
        "HTTP Assertion",
        "HTTP Header Manager",
        "HTTP Request Sampler",
        "HTTP Proxy Server"
      ],
        a: 2,
          exp: "HTTP Request Sampler envía solicitudes HTTP/HTTPS."
},
{
  cat: "JMeter",
    q: "¿Qué representa un \"hilo\" (thread) en un Thread Group?",
      opts: [
        "Un módulo de aplicación",
        "Un proceso en segundo plano",
        "Un usuario virtual que ejecuta las peticiones",
        "Un conjunto de datos de entrada"
      ],
        a: 2,
          exp: "Cada hilo simula un usuario virtual."
},
{
  cat: "JMeter",
    q: "¿Para qué se usa el componente \"Timer\" en JMeter?",
      opts: [
        "Medir el tiempo de ejecución del script",
        "Generar informes de tiempos",
        "Introducir retrasos entre peticiones",
        "Finalizar el test automáticamente"
      ],
        a: 2,
          exp: "Los Timers introducen delays entre requests."
},
{
  cat: "JMeter",
    q: "¿Cuál es la función del elemento \"Assertion\" en JMeter?",
      opts: [
        "Simular múltiples usuarios",
        "Generar reportes de carga",
        "Validar las respuestas recibidas",
        "Controlar el número de peticiones"
      ],
        a: 2,
          exp: "Assertions validan condiciones del response."
},
{
  cat: "JMeter",
    q: "¿Qué componente permite parametrizar datos de entrada en JMeter usando un archivo externo?",
      opts: [
        "JSR223 Sampler",
        "CSV Data Set Config",
        "Constant Timer",
        "HTTP Cookie Manager"
      ],
        a: 1,
          exp: "CSV Data Set Config lee variables desde un CSV."
},
{
  cat: "JMeter",
    q: "¿Qué se logra al usar un \"Loop Controller\" en un Test Plan?",
      opts: [
        "Ejecutar el script desde línea de comandos",
        "Repetir los elementos hijos un número definido de veces",
        "Ejecutar peticiones en orden aleatorio",
        "Validar respuestas automáticamente"
      ],
        a: 1,
          exp: "Loop Controller repite sus hijos según el conteo."
},
{
  cat: "JMeter",
    q: "¿Cuál es la forma recomendada de ejecutar pruebas de carga en JMeter sin interfaz gráfica?",
      opts: [
        "Desde el navegador",
        "Usando JMeter GUI en modo minimizado",
        "Usando el modo non-GUI con línea de comandos",
        "Solo es posible en la interfaz gráfica"
      ],
        a: 2,
          exp: "Modo non-GUI (CLI) es recomendado para carga/CI."
},
{
  cat: "JMeter",
    q: "¿Qué información muestra el componente \"View Results Tree\"?",
      opts: [
        "La estructura jerárquica del script",
        "El uso de memoria durante la prueba",
        "Detalles de cada petición y respuesta",
        "Un resumen del plan de pruebas"
      ],
        a: 2,
          exp: "Permite inspeccionar request/response, headers, body."
},
{
  cat: "JMeter",
    q: "¿Qué significa si un resultado en JMeter aparece en color rojo en el View Results Tree?",
      opts: [
        "La respuesta fue más lenta de lo esperado",
        "La petición no fue ejecutada",
        "El test fue pausado",
        "La petición falló o no cumplió una assertion"
      ],
        a: 3,
          exp: "Rojo indica error del sampler o assertion fallida."
},
{
  cat: "JMeter",
    q: "¿Qué herramienta puede usarse para generar reportes visuales de resultados después de una prueba en modo non-GUI?",
      opts: [
        "BeanShell",
        "JTL Converter",
        "HTML Report generator de JMeter",
        "Jenkins Report plugin"
      ],
        a: 2,
          exp: "JMeter genera reportes HTML a partir del .jtl."
},
{
  cat: "JMeter",
    q: "¿Cuál de los siguientes se utiliza para reutilizar lógica común en varios scripts de JMeter?",
      opts: [
        "Module Controller",
        "Loop Controller",
        "HTTP Cache Manager",
        "Sampler chain"
      ],
        a: 0,
          exp: "Module Controller permite invocar un Test Fragment reutilizable."
},
{
  cat: "JMeter",
    q: "¿Qué hace el \"HTTP Cookie Manager\"?",
      "opts": [
        "Deshabilita el almacenamiento de cookies",
        "Genera peticiones de tipo JSON",
        "Maneja automáticamente las cookies entre peticiones",
        "Sirve para establecer encabezados HTTP"
      ],
        a: 2,
          exp: "Gestiona cookies/sesión automáticamente."
},
{
  cat: "JMeter",
    q: "¿Qué lenguaje es comúnmente utilizado en JMeter para scripting avanzado y manipulación de datos?",
      "opts": [
        "SQL",
        "Python",
        "Groovy",
        "PHP"
      ],
        a: 2,
          exp: "Groovy es recomendado en JSR223 por performance."
},

// API / STACK
{
  cat: "API", q: "¿Qué validación agrega mayor valor en pruebas de API además del status code?", opts: [
    "Solo validar el tiempo total del pipeline",
    "Validar contrato/esquema (JSON Schema/OpenAPI) + reglas de negocio y tipos de datos",
    "Validar que el response sea texto plano",
    "Evitar asserts para no hacerlos frágiles"
  ], a: 1, exp: "Status code no garantiza contrato ni reglas de negocio; schema + negocio detecta breaking changes y errores lógicos."
},

{
  cat: "API", q: "¿Qué es contract testing (ej. PACT) y qué problema aborda?", opts: [
    "Pruebas de UI que validan estilos",
    "Validar que consumidor y proveedor cumplen un contrato, detectando incompatibilidades sin depender del despliegue conjunto",
    "Pruebas de carga a nivel de navegador",
    "Pruebas unitarias de base de datos"
  ], a: 1, exp: "Asegura compatibilidad entre servicios (consumer-driven contracts), reduce fallos por cambios de API."
},

// CI/CD
{
  cat: "CI/CD", q: "En un pipeline saludable, ¿cuál estrategia es más efectiva para feedback rápido?", opts: [
    "Ejecutar e2e UI primero, luego unit tests",
    "Aplicar pirámide de pruebas: unitarias rápidas → integración/API → e2e UI selectivas",
    "Ejecutar todo en serial siempre",
    "Deshabilitar tests cuando fallen"
  ], a: 1, exp: "Prioriza pruebas rápidas y confiables temprano; e2e UI se deja como capa superior y selectiva."
},

{
  cat: "CI/CD", q: "¿Qué práctica ayuda a gestionar tests inestables (flaky) sin esconder problemas?", opts: [
    "Ignorar fallos intermitentes",
    "Quarantine + tracking de flakiness + análisis de causa raíz + criterios de salida",
    "Aumentar timeouts indefinidamente",
    "Reintentar el pipeline infinitamente"
  ], a: 1, exp: "Cuarentena temporal con métricas (flake rate), dueños y SLA para corrección evita bloquear entregas sin normalizar mala calidad."
},

// Docker
{
  cat: "Docker", q: "¿Cuál es un beneficio real de containerizar el runner de pruebas?", opts: [
    "Garantiza 0 bugs",
    "Asegura entornos reproducibles (dependencias/versions) y reduce “it works on my machine”",
    "Elimina la necesidad de CI",
    "Hace que Selenium no necesite waits"
  ], a: 1, exp: "Contenedores fijan versiones y dependencias; facilitan escalado y consistencia entre dev/CI."
},

// Git
{
  cat: "Git", q: "Para mantener calidad en automatización dentro de un equipo, ¿qué política es más efectiva?", opts: [
    "Commits directos a main sin revisión",
    "PRs con code review + linters + ejecución de pruebas en CI como gate",
    "Solo revisar manualmente cuando hay incidentes",
    "Deshabilitar hooks para ir más rápido"
  ], a: 1, exp: "Code review y gates en CI (lint, unit, smoke) mantienen estándares y previenen deuda técnica."
},

//Diseño
{
  cat: "Diseño", q: "¿Qué problema típico resuelve el Page Object Model (POM) bien aplicado?", opts: [
    "Acelera la red del navegador",
    "Reduce duplicación y acoplamiento entre tests y UI, centralizando selectores y acciones",
    "Reemplaza assertions",
    "Elimina la necesidad de esperas"
  ], a: 1, exp: "POM encapsula interacción y locators; los tests quedan enfocados en intención/validación."
},

{
  cat: "Diseño", q: "¿Qué señal indica que tu framework de UI tests está demasiado acoplado?", opts: [
    "Los tests fallan en un solo ambiente",
    "Un cambio menor de UI rompe decenas de tests por selectores duplicados y lógica repetida",
    "Tienes reportes HTML",
    "Usas asserts"
  ], a: 1, exp: "Duplicación de locators y lógica en tests produce cascadas de fallos. Se corrige con POM/Screenplay, helpers y selectores estables."
},

{
  cat: "Diseño",
  q: `Usted ha recibido el siguiente informe de defecto de los desarrolladores en el que se indica que la anomalía descrita en este informe de prueba no es reproducible.

"La aplicación se bloquea"
"03-Mayo-2022 — Juan Piedra Seca - Rechazado"
"La aplicación se bloquea tras introducir  Entrada de prueba: $ä  en el campo Nombre de la pantalla de creación de un nuevo usuario."
"Intenté cerrar la sesión, iniciar sesión con la cuenta test_admin01, mismo problema. Probado con otras cuentas de administrador de prueba,"
"mismo problema. No se ha recibido ningún mensaje de error; el registro (véase adjunto) contiene una notificación de error crítico."
"Basándose en el caso de prueba TC-1305, la aplicación debería aceptar la entrada proporcionada y crear el usuario. Por favor, corrija con alta prioridad,"
"esta prestación está relacionada con REQ-0012, que es un nuevo requisito de negocio crítico."

¿Qué información crítica falta en este informe de prueba que hubiera sido útil para los desarrolladores?`,
  opts: [
    "Resultado esperado y resultado real.",
    "Referencias y estado de los defectos.",
    "Entorno de prueba y elemento de prueba.",
    "Prioridad y severidad."
  ],
  a: 2,
  exp: "Si el defecto no es reproducible, lo más importante que falta es saber en qué entorno y versión se ejecutó la prueba. Sin eso, los desarrolladores no pueden replicar el problema."
},
{
  cat: "Diseño", q: "¿Cuál de las siguientes opciones es el MEJOR ejemplo de cómo la trazabilidad apoya la prueba?", opts: [
    "Realizar el análisis de impacto de un cambio dará información sobre la compleción de las pruebas",
    "El análisis de la trazabilidad entre los casos de prueba y los resultados de prueba proporcionará información sobre el nivel de riesgo residual estimado",
    "Realizar el análisis de impacto de un cambio ayudará a seleccionar los casos de prueba adecuados para la prueba de regresión. ",
    "El análisis de la trazabilidad entre la base de prueba, los objetos de prueba y los casos de prueba ayudará a seleccionar los datos de prueba para lograr la cobertura que se asume del objeto de prueba. "
  ], a: 2, exp: "La trazabilidad muestra qué cambia y qué pruebas deben ejecutarse en la regresión"
},

{
  cat: "Diseño",
  q: "¿Cuáles DOS de las siguientes opciones son métricas comunes utilizadas para Informar sobre el nivel de calidad del objeto de prueba?",
  opts: [
    "Número de defectos encontrados durante la prueba de sistema",
    "Esfuerzo total en el diseño de pruebas dividido por el número de casos de prueba diseñados.",
    "Número de procedimientos de prueba ejecutados.",
    "Número de defectos encontrados dividido por el tamaño de un producto de trabajo.",
    "Tiempo necesario para reparar un defecto."
    
  ],
  a: [0, 3],
  exp: "Las métricas a) y d) son correctas porque ambas miden directamente la calidad del producto: a) cuenta cuántos defectos tiene y d) mide la densidad de defectos según el tamaño del producto."
},

{
  cat: "Diseño", q: "¿Cuál de las siguientes informaciones contenidas en un informe del avance de la prueba es la MENOS útil para los representantes de negocio?", opts: [
    "Impedimentos para la prueba.",
    "Cobertura de rama alcanzada;",
    "Avances de la prueba.",
    "evos riesgos dentro del ciclo de prueba"
  ], a: 1, exp: "  "
},

// Observabilidad
{
  cat: "Observabilidad", q: "¿Qué evidencia es más útil para diagnosticar un fallo de UI en CI?", opts: [
    "Solo el mensaje “Test failed",
    "Screenshot + video (si aplica) + logs de consola + logs de red/driver + trazas del framework",
    "Solo el tiempo total del job",
    "Solo el nombre del test"
  ], a: 1, exp: "Artefactos (screenshot/video) y logs (browser/driver/network) aceleran el triage y reducen MTTR."
},

{
    cat: "Observabilidad",
    q: "Escenario: en CI tu prueba de carga empieza a degradarse y el generador (JMeter) se queda al 95% de CPU. ¿Qué ajuste es el MÁS adecuado para evitar que el generador sea el cuello de botella?",
    opts: [
      "Aumentar el número de listeners (View Results Tree, Graph Results) para tener más detalle",
      "Ejecutar en non-GUI, minimizar listeners en runtime y mover el análisis a reportes offline (.jtl + HTML)",
      "Subir el ramp-up a 1 segundo para terminar más rápido",
      "Poner Thread.sleep() en un JSR223 para controlar el ritmo"
    ],
    a: 1,
    exp: "En carga, los listeners pesados consumen recursos. Lo correcto es non-GUI + pocos listeners y análisis offline (JTL/HTML)."
  },
  {
    cat: "Observabilidad",
    q: "Escenario: tu API usa token CSRF que cambia por sesión. En la 2ª petición recibes 403. ¿Qué solución es la más correcta en JMeter?",
    opts: [
      "Aumentar el timeout del HTTP Request",
      "Hardcodear el token en el body",
      "Extraer el token del response (Regex/JSON Extractor) y reutilizarlo en la siguiente request",
      "Activar 'Follow Redirects' para que el token se refresque solo"
    ],
    a: 2,
    exp: "Es un caso típico de correlación: extraer valores dinámicos (token) y parametrizarlos en requests posteriores."
  },
  {
    cat: "Observabilidad",
    q: "Escenario: necesitas mantener la sesión (cookies) para simular navegación real. Sin Cookie Manager, el login funciona pero las siguientes llamadas fallan. ¿Qué debes hacer?",
    opts: [
      "Agregar HTTP Cookie Manager al Thread Group",
      "Agregar View Results Tree",
      "Cambiar el método HTTP a GET",
      "Aumentar el número de threads"
    ],
    a: 0,
    exp: "HTTP Cookie Manager gestiona cookies automáticamente entre peticiones para mantener sesión."
  },
  {
    cat: "Observabilidad",
    q: "Escenario: el objetivo del test es '20 transacciones cada 10 segundos' (pacing). ¿Qué error común produce resultados irreales?",
    opts: [
      "Usar Constant Throughput Timer y validar p95",
      "No usar timers y lanzar todas las solicitudes en ráfaga (burst) con alta concurrencia",
      "Ejecutar en modo non-GUI",
      "Usar CSV Data Set Config"
    ],
    a: 1,
    exp: "Sin timers/pacing, las solicitudes salen en ráfaga, generando un patrón irreal que no representa comportamiento de usuario."
  },
  {
    "cat": "Observabilidad",
    "q": "Escenario: tu prueba pasa, pero el p95 empeora mientras el throughput sube. ¿Cuál interpretación es más correcta?",
    "opts": [
      "El sistema mejoró para todos los usuarios",
      "Puede haber contención/colas: más operaciones totales pero peor tail latency (p95)",
      "JMeter está midiendo mal porque el promedio no cambió",
      "La métrica p95 no sirve en performance"
    ],
    "a": 1,
    "exp": "Throughput puede subir a costa de cola/contención, empeorando p95/p99 (tail latency)."
  },
  {
    "cat": "Observabilidad",
    "q": "Escenario: en un test distribuido, algunos workers reportan más errores que otros. ¿Qué causa es MÁS probable?",
    "opts": [
      "Diferencias de red/latencia o límites por IP/afinidad en el backend",
      "Los assertions siempre son distintos entre máquinas",
      "CSV Data Set Config no funciona en remoto",
      "JMeter no soporta ejecución distribuida"
    ],
    "a": 0,
    "exp": "En distribuido, la red y el balanceo (afinidad/rate limits por IP) suelen generar variaciones por nodo."
  },
  {
    "cat": "Observabilidad",
    "q": "Escenario: tu CSV tiene 5 filas pero con 100 usuarios empiezas a ver colisiones de datos (mismo usuario). ¿Qué configuración ayuda a evitarlo?",
    "opts": [
      "Poner 'Recycle on EOF' en true y 'Stop thread on EOF' en false",
      "Aumentar el ramp-up",
      "Usar 'Sharing mode' apropiado (por ejemplo: Current thread) y suficientes datos únicos",
      "Cambiar View Results Tree por Aggregate Report"
    ],
    "a": 2,
    "exp": "Hay que controlar el sharing mode y la cantidad de datos únicos. Con pocos datos, habrá colisiones inevitablemente."
  },
  {
    "cat": "Observabilidad",
    "q": "Escenario: te piden detener toda la ejecución ante el primer error de negocio. ¿Dónde lo configuras de forma más directa?",
    "opts": [
      "En el HTTP Header Manager",
      "En Thread Group → 'Action to be taken after a Sampler error' = Stop Test",
      "En el Summary Report",
      "En el JMX cambiando el nombre del test"
    ],
    "a": 1,
    "exp": "Thread Group permite definir acción ante error del sampler (Stop Thread/Stop Test/etc.)."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: tu test falla de forma intermitente porque esperas con cy.wait(5000) después de un submit. ¿Qué refactor es más estable?",
    "opts": [
      "Aumentar cy.wait a 15000 para que “siempre alcance”",
      "Usar cy.intercept() + alias y cy.wait('@alias') con aserciones sobre la respuesta",
      "Usar {force:true} en todos los clicks",
      "Ejecutar solo en modo headed"
    ],
    "a": 1,
    "exp": "La espera determinística es interceptar la red y esperar por el alias; evitar waits fijos reduce flakiness."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: tienes un flujo con SSO que redirige a otro dominio y el test falla por cross-origin. ¿Qué solución es correcta?",
    "opts": [
      "Desactivar la seguridad del navegador",
      "Usar cy.origin() para ejecutar comandos en el segundo origen",
      "Reemplazar Cypress por Selenium obligatoriamente",
      "Ignorar la redirección y continuar"
    ],
    "a": 1,
    "exp": "cy.origin permite manejar flujos cross-origin (Cypress v10+)."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: un selector basado en clases CSS cambia cada sprint y rompe tests. ¿Qué estrategia es más mantenible?",
    "opts": [
      "Usar XPath absoluto para evitar cambios",
      "Usar data-cy/data-testid acordado con el equipo de frontend",
      "Usar nth-child() para ser más específico",
      "Usar cy.wait para estabilizar"
    ],
    "a": 1,
    "exp": "Atributos dedicados a pruebas (data-*) reducen fragilidad ante cambios de estilos/layout."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: necesitas reutilizar el login en muchos tests y reducir tiempo. ¿Qué enfoque es más robusto?",
    "opts": [
      "Hacer login UI completo en cada test siempre",
      "Crear un comando custom o login por API y usar cy.session() (si aplica) para cachear sesión",
      "Guardar credenciales en el repo y reusar cookies manualmente",
      "Desactivar validaciones de autenticación"
    ],
    "a": 1,
    "exp": "Login por API + cy.session reduce tiempo y flakiness; evita hardcodear credenciales."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: al hacer click aparece un overlay que intercepta el elemento y Cypress lanza error de 'element is covered'. ¿Qué opción es mejor primero?",
    "opts": [
      "Agregar {force:true} a todos los clicks",
      "Esperar/validar que el overlay desaparezca (assert visible/exists) y luego click",
      "Usar cy.wait(10000)",
      "Cambiar a Selenium"
    ],
    "a": 1,
    "exp": "Primero se debe sincronizar con el estado real (overlay desaparece). force:true puede ocultar bugs reales."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: una aserción pasa local pero falla en CI por diferencias de timezone/locale. ¿Qué práctica reduce este riesgo?",
    "opts": [
      "Comparar fechas como strings formateadas según el navegador",
      "Forzar timezone/locale en el entorno de CI o validar en formato ISO/valores normalizados",
      "Usar cy.wait para que la fecha se actualice",
      "Deshabilitar el test en CI"
    ],
    "a": 1,
    "exp": "Normalizar/forzar timezone o comparar valores ISO evita discrepancias por locale en CI."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: necesitas validar que un request salga con un header específico (Authorization). ¿Cómo lo harías de forma determinística?",
    "opts": [
      "Revisar el header manualmente en DevTools",
      "Usar cy.intercept() y en el handler/asserts verificar req.headers",
      "Usar cy.log('headers ok')",
      "Aumentar retries"
    ],
    "a": 1,
    "exp": "cy.intercept permite inspeccionar el objeto request y validar headers/body."
  },
  {
    "cat": "Cypress",
    "q": "Escenario: tus tests dependen de datos compartidos y a veces fallan por colisión. ¿Qué enfoque de datos es más sólido?",
    "opts": [
      "Reusar un usuario único compartido para todo el equipo",
      "Sembrar/crear datos por test (setup/teardown) o usar APIs para generar datos aislados",
      "Ejecutar solo de noche",
      "Aumentar el orden de ejecución"
    ],
    "a": 1,
    "exp": "Datos determinísticos y aislados por test evitan colisiones y dependencia de estado global."
  },
  {
    "cat": "Selenium",
    "q": "Escenario: tus UI tests fallan con StaleElementReferenceException justo después de un re-render de React. ¿Qué solución es más apropiada?",
    "opts": [
      "Guardar el WebElement como variable global y reusarlo",
      "Re-localizar el elemento después del re-render y usar WebDriverWait por condición",
      "Aumentar implicit wait a 60 segundos",
      "Agregar Thread.sleep(5000) después de cada acción"
    ],
    "a": 1,
    "exp": "Ante re-render, la referencia se vuelve stale: se debe reubicar el elemento y sincronizar con waits explícitos."
  },
  {
    "cat": "CI/CD",
    "q": "Escenario: tu pipeline tarda 45 minutos porque corre e2e UI completos en cada commit. ¿Qué cambio da mejor feedback rápido sin perder cobertura?",
    "opts": [
      "Mover e2e UI a una etapa nocturna y dejar smoke/regresión crítica + API tests en PR",
      "Quitar unit tests para ganar tiempo",
      "Ejecutar todo en un solo job serial",
      "Desactivar reportes/artefactos"
    ],
    "a": 0,
    "exp": "Estrategia típica: PR → unit/API/smoke; e2e completos → scheduled o post-merge, con paralelización."
  },
  {
    "cat": "Observabilidad",
    "q": "Escenario: un test falla en CI pero no puedes reproducirlo local. ¿Qué conjunto de artefactos acelera más el diagnóstico?",
    "opts": [
      "Solo el mensaje de error en consola",
      "Screenshot + video (si aplica) + logs del navegador + logs del driver + trazas del framework",
      "Solo el tiempo total del job",
      "Solo el archivo package-lock"
    ],
    "a": 1,
    "exp": "Evidencia (screenshot/video) + logs/trazas reduce MTTR y permite triage más preciso."
  },
  {
    "cat": "API",
    "q": "Escenario: tu API devuelve 200 pero cambió un campo 'totalAmount' de number a string y rompió consumidores. ¿Qué tipo de prueba lo detecta mejor?",
    "opts": [
      "Solo validar status code",
      "Contract testing / validación de esquema (OpenAPI/JSON Schema) además de reglas de negocio",
      "Ejecutar UI tests",
      "Aumentar timeouts"
    ],
    "a": 1,
    "exp": "Validar contrato/esquema detecta breaking changes aunque el status code sea 200."
  },
  {
    "cat": "Docker",
    "q": "Escenario: en tu máquina todo funciona, pero en CI falla por versión distinta de navegador/driver. ¿Qué medida reduce este riesgo?",
    "opts": [
      "Dejar versiones “latest” para siempre tener lo más nuevo",
      "Containerizar el runner con versiones fijadas (browser/driver/deps) y reproducibles",
      "Ejecutar solo en modo headed",
      "Poner implicit wait alto"
    ],
    "a": 1,
    "exp": "Contenedores con versiones pinneadas garantizan consistencia y evitan “it works on my machine”."
  },
  {
    "cat": "Git",
    "q": "Escenario: entran cambios a main sin revisión y la suite se rompe frecuentemente. ¿Qué política mejora la calidad del repo?",
    "opts": [
      "Commits directos a main para ir más rápido",
      "PRs con code review + checks obligatorios (lint/tests) en CI como gate",
      "Solo revisar cuando haya incidentes",
      "Deshabilitar ramas protegidas"
    ],
    "a": 1,
    "exp": "Code review + gates en CI previenen deuda técnica y evitan merges que rompen la suite."
  },
  {
    "cat": "Seguridad",
    "q": "Escenario: necesitas usar credenciales para login en tests en CI. ¿Qué práctica es la más segura?",
    "opts": [
      "Hardcodear credenciales en el repo",
      "Usar secretos del CI/Secret Manager y evitar imprimirlos en logs",
      "Compartir credenciales por chat",
      "Guardar credenciales en LocalStorage del navegador"
    ],
    "a": 1,
    "exp": "Credenciales deben manejarse como secretos (CI secrets/Vault) y no deben exponerse en logs."
  },
  {
    "cat": "Diseño",
    "q": "Escenario: un cambio pequeño en la UI rompe 30 tests porque los locators están duplicados. ¿Qué mejora de diseño reduce el impacto?",
    "opts": [
      "Copiar los locators en más lugares para “asegurar” consistencia",
      "Aplicar Page Object Model/abstracción de acciones y centralizar selectores",
      "Aumentar el número de sleeps",
      "Desactivar paralelización"
    ],
    "a": 1,
    "exp": "Centralizar locators/acciones (POM/Screenplay) reduce duplicación y acoplamiento."
  },
  {
    "cat": "Performance",
    "q": "Escenario: el promedio de respuesta es 200ms, pero el p99 es 4s y hay quejas de usuarios. ¿Qué indicador debe guiar la optimización?",
    "opts": [
      "Promedio (average) únicamente",
      "Percentiles (p95/p99) y tasa de errores",
      "Cantidad de commits por día",
      "Número de tests automatizados"
    ],
    "a": 1,
    "exp": "Los percentiles reflejan tail latency que impacta experiencia real; average puede ocultar colas/outliers."
  },
  {
    "cat": "BDD",
    "q": "Escenario: el equipo adopta Gherkin y en 2 meses tiene 500 escenarios casi iguales y muy lentos. ¿Cuál es el problema más probable?",
    "opts": [
      "Gherkin no se puede usar en CI",
      "Falta de modelado/abstracción: escenarios redundantes y excesivamente granulares",
      "BDD solo sirve para pruebas unitarias",
      "Cypress no soporta BDD"
    ],
    "a": 1,
    "exp": "Sin disciplina, BDD genera redundancia. Debe enfocarse en comportamiento de negocio y reuso de steps."
  },

  {
    "cat": "Observabilidad",
    "q": "En un plan con múltiples endpoints dependientes, ¿qué componente se usa para extraer un valor del response (por ejemplo un ID) y reutilizarlo en la siguiente petición?",
    "opts": [
      "Constant Timer",
      "JSON Extractor / Regular Expression Extractor",
      "View Results Tree",
      "Aggregate Report"
    ],
    "a": 1,
    "exp": "La correlación se hace extrayendo valores dinámicos con extractors y reutilizándolos como variables."
  },
  {
    "cat": "Observabilidad",
    "q": "Para que un endpoint (III) consuma el ID generado al crear una entidad en (II), ¿qué debes hacer?",
    "opts": [
      "Duplicar manualmente el ID en el sampler",
      "Guardar el ID en una variable (extractor) y parametrizar el siguiente sampler con ${variable}",
      "Aumentar el ramp-up",
      "Agregar un listener"
    ],
    "a": 1,
    "exp": "Se extrae el ID del response y se usa como variable en el siguiente request."
  },
  {
    "cat": "Observabilidad",
    "q": "Si necesitas crear 3 pre-envíos dentro de una misma recogida, ¿qué estructura te ayuda a agrupar y repetir esa acción 3 veces?",
    "opts": [
      "Loop Controller configurado a 3",
      "HTTP Cache Manager",
      "JSR223 Assertion",
      "View Results Tree"
    ],
    "a": 0,
    "exp": "Un Loop Controller permite repetir los samplers hijos N veces (3)."
  },
  {
    "cat": "Observabilidad",
    "q": "Para leer datos de entrada desde un archivo CSV con al menos 5 combinaciones, ¿qué elemento debes agregar?",
    "opts": [
      "CSV Data Set Config",
      "HTTP Cookie Manager",
      "Test Fragment",
      "Backend Listener"
    ],
    "a": 0,
    "exp": "CSV Data Set Config permite parametrizar entradas desde un .CSV."
  },
  {
    "cat": "Observabilidad",
    "q": "En ejecución non-GUI, ¿qué comando/opción se usa típicamente para guardar resultados en un .jtl?",
    "opts": [
      "jmeter -g test.jmx",
      "jmeter -n -t test.jmx -l results.jtl",
      "jmeter --ui --report",
      "jmeter -open results.jtl"
    ],
    "a": 1,
    "exp": "El modo non-GUI usa -n, -t para el plan y -l para el archivo de resultados (.jtl)."
  },
  {
    "cat": "Observabilidad",
    "q": "Si necesitas generar el dashboard HTML después de una ejecución non-GUI, ¿qué combinación de flags es la correcta?",
    "opts": [
      "-e -o <carpetaReporte>",
      "-x -y <carpeta>",
      "-html -out <carpeta>",
      "-report -jtl <archivo>"
    ],
    "a": 0,
    "exp": "JMeter genera reporte con -e (report) y -o (output folder) usando el .jtl indicado con -l."
  },
  {
    "cat": "Observabilidad",
    "q": "Para ver %Error y tiempos agregados por sampler (promedio, p90/p95/p99), ¿qué listener es más adecuado (en GUI, para análisis)?",
    "opts": [
      "Aggregate Report / Summary Report",
      "View Results Tree",
      "HTTP Header Manager",
      "Constant Timer"
    ],
    "a": 0,
    "exp": "Aggregate/Summary muestran métricas agregadas incluyendo %Error y tiempos."
  },
  {
    "cat": "Observabilidad",
    "q": "En el Thread Group, la opción “Action to be taken after a Sampler error” en “Stop Test” sirve para…",
    "opts": [
      "Continuar aunque haya errores",
      "Detener la prueba al primer error",
      "Reintentar automáticamente el sampler",
      "Aumentar la concurrencia"
    ],
    "a": 1,
    "exp": "Esa configuración permite detener la ejecución ante el primer error del sampler."
  },
  {
    "cat": "Observabilidad",
    "q": "Para simular 100 usuarios concurrentes en 1 hora con un solo ciclo (1 iteración), ¿qué configuración es la más apropiada en un Thread Group estándar?",
    "opts": [
      "Threads=100, Ramp-up=3600s, Loop Count=1",
      "Threads=1, Ramp-up=100s, Loop Count=3600",
      "Threads=100, Ramp-up=1s, Loop Forever",
      "Threads=3600, Ramp-up=100s, Loop Count=1"
    ],
    "a": 0,
    "exp": "100 hilos con ramp-up de 3600s distribuye el arranque en 1 hora y con Loop=1 ejecuta una sola iteración."
  },
  {
    "cat": "Observabilidad",
    "q": "Si el objetivo es enviar ~20 transacciones cada 10 segundos de forma continua, ¿qué enfoque se ajusta mejor sin plugins?",
    "opts": [
      "Usar Constant Throughput Timer configurado a ~120 requests/min y Loop Forever",
      "Usar View Results Tree para controlar el ritmo",
      "Aumentar Implicit Wait",
      "Bajar la concurrencia a 1"
    ],
    "a": 0,
    "exp": "20 cada 10s equivale a 120/min. Constant Throughput Timer + loop infinito permite aproximar ese ritmo."
  },
  {
    "cat": "Observabilidad",
    "q": "Para poder inspeccionar request/response y cabeceras enviadas/recibidas durante depuración, ¿qué listener es el más directo?",
    "opts": [
      "View Results Tree",
      "Summary Report",
      "Backend Listener",
      "Throughput Controller"
    ],
    "a": 0,
    "exp": "View Results Tree muestra request, response y headers, pero no se recomienda en pruebas de carga grandes."
  },


// Seguridad
{
  cat: "Seguridad", q: "En pruebas automatizadas, ¿cuál práctica es correcta al manejar credenciales/tokens?", opts: [
    "Hardcodearlas en el repo",
    "Usar secret managers/variables seguras del CI y rotación; nunca exponer en logs",
    "Compartirlas por chat",
    "Guardarlas en el frontend"
  ], a: 1, exp: "Credenciales deben gestionarse como secretos (vault/CI secrets), con rotación y sanitización de logs."
},

// Datos
{
  cat: "Datos", q: "¿Qué enfoque mejora la estabilidad cuando los tests dependen de datos?", opts: [
    "Usar siempre datos reales de producción",
    "Generar/sembrar datos determinísticos por test (setup/teardown) y aislarlos",
    "Reutilizar un único usuario compartido para todos",
    "No limpiar datos para ahorrar tiempo"
  ], a: 1, exp: "Data management (seed/cleanup) evita colisiones y dependencia de estado global; mejora repeatability."
},

// Performance
{
  cat: "Performance", q: "¿Cuál es una mala interpretación común al ver una mejora en throughput (TPS) pero peor p95?", opts: [
    "Que el sistema mejoró para todos",
    "Que puede haber colas/contención: más operaciones totales pero peor experiencia en cola (tail latency)",
    "Que la red siempre está bien",
    "Que JMeter está mal instalado"
  ], a: 1, exp: "Throughput puede subir aunque aumente la tail latency. Se debe analizar percentiles, errores y saturación (CPU/DB/IO)."
},

// BDD
{
  cat: "BDD", q: "¿Cuál es el principal riesgo de adoptar BDD/Gherkin sin disciplina?", opts: [
    "No se puede versionar",
    "Generar escenarios redundantes o demasiado granulares, aumentando costo de mantenimiento",
    "BDD no funciona con APIs",
    "Gherkin es incompatible con CI"
  ], a: 1, exp: "Sin buen modelado, se crean suites enormes y repetitivas. BDD debe enfocarse en comportamientos de negocio y reuso."
},

{
  cat: "BDD", q: "¿Cuál de los siguientes enunciados describe MEJOR el enfoque de desarrollo guiado por prueba de aceptación (DGPA)?", opts: [
    "En DGPA, los criterios de aceptación suelen crearse basándose en el formato dado/cuando/entonces given/when/then ",
    "En DGPA, los casos de prueba se crean principalmente en la prueba de componente y están orientados al código.",
    "En DGPA, se crean pruebas basadas en criterios de aceptación para impulsar el desarrollo del software correspondiente.",
    "En DGPA, las pruebas se basan en el comportamiento deseado del software, lo que facilita su comprensión por parte de los miembros del equipo."
  ], a: 2, exp: "En DGPA, las pruebas de aceptación se escriben antes del desarrollo y guían lo que se construye."
},

{
  cat: "BDD", q: "¿Cuál de las siguientes opciones describe MEJOR la forma en que se pueden documentar los criterios de aceptación?", opts: [
    "Realizar retrospectivas para determinar las necesidades reales de los implicados con respecto a una historia de usuario dada. ",
    "Utilizar el formato dado/cuando/entonces given/when/then para describir un ejemplo de condición de prueba relacionada con una historia de usuario determinada",
    "Utilizar la comunicación verbal para reducir el riesgo de que los demás malinterpreten los criterios de aceptación. ",
    "Documentar los riesgos relacionados con una historia de usuario dada en un plan de prueba para facilitar la prueba basada en el riesgo de una historia de usuario dada."
  ], a:1 , exp: "El formato Given/When/Then es un estándar claro, estructurado y ampliamente usado para documentar criterios de aceptación mediante ejemplos comprensibles y verificables."
},

{
  cat: "BDD",
  q:
    "Tenga en cuenta la siguiente historia de usuario:\n\n" +
    "Como Editor quiero revisar el contenido antes de que se publique para asegurarme de que la gramática es correcta y sus criterios de aceptación:\n\n" +
    "• El usuario puede iniciar sesión en el sistema de gestión de contenidos con el rol de Editor.\n" +
    "• El editor puede ver las páginas de contenido existentes.\n" +
    "• El editor puede editar el contenido de la página.\n" +
    "• El editor puede añadir comentarios.\n" +
    "• El editor puede guardar cambios.\n" +
    "• El editor puede reasignar el rol de propietario del contenido para realizar actualizaciones.\n\n" +
    "¿Cuál de las siguientes opciones es el MEJOR ejemplo de prueba DGPA para esta historia de usuario?",
  opts: [
    "Probar si el editor puede guardar el documento después de borrar el contenido de la página.",
    "Probar si el propietario del contenido puede iniciar sesión y realizar actualizaciones del contenido.",
    "Probar si el editor puede programar el contenido editado para su publicación.",
    "Probar si el editor puede reasignar a otro editor para realizar actualizaciones."
  ],
  a: 3,
  exp: "El editor puede reasignar el rol de propietario del contenido para realizar actualizaciones."
},

];
``