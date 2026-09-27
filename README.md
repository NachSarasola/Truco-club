# Liga Fueguina de Truco — tabla de posiciones

Una sola página (`index.html`) que muestra la tabla de posiciones de la Liga de
Truco Ushuaia y un panel de administración para cargar los resultados. No
necesita servidor, base de datos ni cuentas.

En vivo: https://clubtruco.com (alias técnico, siempre disponible:
https://nachsarasola.github.io/liga-fueguina-truco/)

---

## 1. Publicarla

Subí `index.html` a cualquier hosting estático gratis. Tiene que quedar como
`index.html` en la raíz del sitio.

- **Netlify Drop** — https://app.netlify.com/drop — arrastrás el archivo y listo.
- **GitHub Pages** — subís `index.html` a un repo y activás Pages.
- **Cloudflare Pages**, **Vercel**, o el hosting que ya tengas.

Pasás ese link a los jugadores. Eso es todo lo que ven ellos.

Este proyecto ya está publicado en GitHub Pages con dominio propio
(`clubtruco.com`, vía el archivo `CNAME` en la raíz del repo). Para cambiar el
dominio: editar `CNAME`, actualizar los registros DNS en el proveedor del
dominio (4 registros A apuntando a `185.199.108.153`, `.109.153`, `.110.153`,
`.111.153`) y esperar a que GitHub verifique y emita el certificado HTTPS.

## 2. Entrar al panel

`https://tu-sitio/#admin` — no hay ningún botón visible que lleve ahí a
propósito, es la puerta de entrada del administrador.

Contraseña inicial: **`truco2026`**

**Cambiala antes de entregar la página.** Panel → *Configuración avanzada →
Contraseña*. La nueva contraseña se aplica cuando descargás y volvés a subir
la página (paso 3).

> Aclaración de seguridad: la contraseña frena a un curioso, pero cualquiera que
> descargue el HTML puede leer su rastro. Para una liga alcanza; no la uses para
> nada sensible.

## 3. Cargar una fecha y publicarla

Cada sábado se juega una fecha: un mini torneo eliminatorio por sede. Lo único
que cargás es **qué le pasó a cada equipo** — el resultado ya trae los puntos
fijos de esa ronda.

1. Entrás al panel: lo primero que ves es *Resultado de la fecha*, con el
   número de fecha arriba.
2. Para cada equipo, elegís su resultado de hoy: Campeón, Subcampeón,
   Semifinalista, Cuartofinalista, Eliminado en 16avos, Eliminado en 32avos, o
   dejás "Sin cambios" si no jugó. Los puntos entre paréntesis se suman al
   acumulado de temporada — no lo reemplazan.
3. Botón **Aplicar resultados de esta fecha**.
4. Actualizás el número de *Fecha actual*, arriba de la grilla, para la
   próxima vez.
5. Botón **Descargar página**.
6. Subís el `index.html` descargado a tu hosting, reemplazando el anterior.

Los cambios recién se ven cuando subís el archivo nuevo. Mientras tanto quedan
como *borrador* en tu navegador (botón **Guardar borrador**).

Los puntos por cada resultado (100 al campeón, 70 al subcampeón, etc.) casi
nunca hace falta tocarlos — están en *Configuración avanzada → Puntos por
resultado de fecha*, plegados porque se definen una vez al arrancar la
temporada.

## 4. Equipos

Sección plegable *Equipos*:
* **Uno por uno:** botón *+ Agregar un equipo*. Al escribir el nombre y presionar Enter, se guarda y pasa automáticamente al siguiente equipo.
* **Cargar múltiples equipos a la vez:** desplegás el panel *Cargar múltiples equipos a la vez (pegar lista)* y pegás los nombres (uno por renglón, acepta listas numeradas o simples):
  * **Agregar a la lista:** suma los equipos pegados sin tocar los existentes ni sus puntos acumulados.
  * **Reemplazar lista completa:** sustituye todos los equipos y reinicia los resultados a cero (ideal para el inicio de temporada).

## 5. Textos del sitio (nombre, premios, sede, redes)

El panel no tiene formulario para esto a propósito — son cosas que casi no
cambian y así el panel queda simple para el uso de todos los sábados. Se
editan a mano por *Copia de seguridad*:

1. **Exportar JSON** para bajar todos los datos en un archivo.
2. Abrís ese archivo en cualquier editor de texto y cambiás lo que haga
   falta dentro de `meta` — `leagueName`, `tagline`, `season`, y dentro de
   `meta.info`: `premios`, `organiza`, `sede`, `direccion`, `mapsUrl`, `redes`.
3. **Importar JSON**, pegás el contenido editado y cargás.
4. **Descargar página** como siempre.

## 6. Copia de seguridad

*Panel → Copia de seguridad*: **Exportar JSON** guarda todos los datos en un
archivo; **Importar JSON** los restaura. Conviene exportar de vez en cuando,
y es indispensable antes de editar los textos del punto anterior.

## Tabla y reglas

Columnas: `# · Equipo · FJ · Tít · Pts`. FJ es fechas jugadas, Tít es fechas
ganadas (campeonatos). Orden: puntos de temporada → fechas ganadas → finales
alcanzadas → semifinales alcanzadas → nombre.
