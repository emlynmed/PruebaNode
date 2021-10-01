
export const operacion = {
    /*
        Respuesta2 obtiene el número de respuestas contestadas y no contestadas
        Recibe un Json con la información a procesar
        La variable cont es un contador de las respuestas contestadas
        La variable nocont es un contador de las respuestas no contestadas
        En la iteracion se verifica si el valor is_answered es tru, si se cumple 
        la condición se incrementara un valor de 1 el contador "cont"en uno 
        y en caso de que no se incrementara un valor de 1 el contador "nocont"
        Se retorna un json con el resultado
    */
    respuesta2: (obj) => {
        let cont = 0
        let nocont = 0;
        obj.items.forEach(element => {
            if (element.is_answered) {
                cont++;
            } else {
                nocont++;
            }
        })
        let resjson = { 'contada': cont, 'nocontada': nocont };
        return resjson;
    },

    respuesta3: (obj) => {
        let valmax = 0;

        obj.items.forEach(element => {
            if (valmax < element.owner.reputation) {
                valmax = element.owner.reputation;
            }
        })

        return valmax;
    },
/*
La funcion respuesta4 se encarga de obtener el valor minimo de las vistas 
Recibe un Json con la información a procesar
La variable viewmin es la encargada de almacenar el view_count de la primera posición del json 
En la iteración en la condicion if se verifica si el valor de la variable viewmin es mayor al valor de la iteración actual,
en caso de cumplirse la variable viewmin es actualizada con el nuevo valor 
Se retorna el valor minimo de vistas
*/
    respuesta4: (obj) => {
        let viewmin = obj.items[0].view_count;
        obj.items.forEach(element => {    
            if (viewmin > element.view_count) {
                viewmin = element.view_count;
            }
        })
        return viewmin;
    },
/*
La función respuesta5 se encarga de obtenerla fecha más vieja y la mas reciente
    Recibe un Json con la información a procesar
    La variable fecha_vieja y fecha_actual almacenan la primera fecha 
    y ya en la iteracion verifica con un if si es mayor que la fecha actual en caso se cumplir la condicion 
    la variable fecha_actual es actualizada, tambien en el siguiente if verifica si es menor que la fecha vieja en caso se cumplir la condicion 
    la variable fecha_vieja es actualizada 
    Retorna un json con el resultado
*/
    respuesta5: (obj) => {

        let fecha_vieja= new Date(obj.items[0].creation_date);
        let fecha_actual= new Date(obj.items[0].creation_date);

        obj.items.forEach(element => {
            const fecha = new Date(element.creation_date);
            if(fecha > fecha_actual){
                fecha_actual=fecha
            }
            if(fecha < fecha_vieja){
                fecha_vieja=fecha
            }
        })

        let resjson = { 'fecha_vieja': fecha_vieja, 'fecha_actual': fecha_actual };
        return resjson;
   
    },
    /*
    La funcion respuest6 recibe un json con los resultados de las preguntas 2 a la 5
    realizando una impresión en consola
    */
    respuesta6: (obj) => {

        console.log('Respuesta 2:\n'+ ' contestadas: '+ obj.res2.contada+'\n no contestadas: '+obj.res2.nocontada);
        console.log('\nRespuesta 3:\n Mayor reputación de owners:'+ obj.res3);
        console.log('\nRespuesta 4:\n  valor minimo:'+ obj.res4);
        console.log('\nRespuesta 5:\n'+' fecha actual: '+ obj.res5.fecha_actual+'\n fecha vieja: '+obj.res5.fecha_vieja);
   
    }
}
