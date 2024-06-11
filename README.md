
# CRUD | Consultoría Global
## Desarrollar un CRUD de una librería en Nest.js

### Consideraciones:
- Debemos generar un CRUD para estas entidades.
- Se debe validar que al dar de alta un libro existan en la base el autor y la editorial.
- El DNI o el CUIT deben cumplir validaciones de formato.
- La fecha de lanzamiento puede llegar expresada en formato DD/MM/AAAA o DD/MM/AA.
- En cualquier caso debe ser aceptada y normalizada a ISO 8601.
- Al consultar el libro, debo recuperar todos los datos de autor y editorial.
- En caso de error(libro no existe, error en alta) utilizar los códigos HTTP adecuados en la respuesta.
  
### Puntos opcionales (Bonus):
- Realizar los tests para el CRUD de autor (utilizar libreria JEST)
- En la consulta general de todos los libros, se debería poder filtrar por categoría literaria.
- Los endpoints deben cumplir la nomenclatura RESTfull
- En la consulta general de todos los libros, se puede utilizar paginación.


### 🛠 Tecnologías utilizadas:
- Node.js
- Nest.js
- TypeScript
- MySQL
- TypeORM
- JEST


## Instalación

```bash
$ yarn install
```

## Ejecutar la aplicación

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test
```

## Información de contacto:
Puede comunicarse conmigo por correo electrónico: rtanquiascornejo@gmail.com\
O enviarme un mensaje en LinkedIn: https://www.linkedin.com/in/ramiro-tanquias/

## License

Nest is [MIT licensed](LICENSE).
