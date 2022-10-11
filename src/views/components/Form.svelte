<script>
    // Importamos los componentes personalizados de cada select.
    import CountriesOptions from "./form/countries-options.svelte";
    import CitiesOptions from "./form/cities-options.svelte";
    import ProductsOptions from "./form/products-options.svelte";
    import ReasonsOptions from "./form/reasons-options.svelte";

    // Declaramos la información del formulario.
    // Esta se asignará de manera reactiva, en cada input.
    let dataForm = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        gender: '',
        country_id: null,
        city_id: '',
        product_selected_id: '',
        reason_id: '',
    }

    // Sirve para mostrar el estado del envío de formulario
    let response = {
        wrong: false,
        ok : false
    }

    // Detiene el funcionamiento normal del formulario.
    // Ejecuta algunos estilos y atributos en el botón de envío.
    // Genera la llamada a la api de creación de Leads

    async function handleSubmit(form)
    {
        resetResponse();
        form.preventDefault();
        form.target.querySelector('button').setAttribute('aria-busy',true);
        form.target.querySelector('button').setAttribute('disabled',true);

        // Estructura de nuestra llamada.
        let headers = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        };

        // Ejecutamos la llamada a la api
        await fetch('/api/leads', headers).then((res)=>{
            // Obtenemos la respuesta y almacenamos.
            response = {
                wrong: !res.ok,
                ok : res.ok
            }

            form.target.querySelector('button').setAttribute('aria-busy',false);
            if (response.wrong) {
                form.target.querySelector('button').setAttribute('disabled',false);
            }

        }); 
    }

    // Permite resetear rápidamente los valores de estado.
    function resetResponse()
    {
        response = {
            wrong: false,
            ok : false
        }
    }

</script>

<!-- Generamos el formualario, asignando los valores reactivos, e importando los componentes de opciones. -->
<form on:submit={async (event) => {await handleSubmit(event)}}>

    <input bind:value={dataForm.firstname} type="text" name="firstname" placeholder="Nombre" autocomplete="given-name" class="half-input" required>
    <input bind:value={dataForm.lastname} type="text" name="lastname" placeholder="Apellido" autocomplete="family-name" class="half-input" required>
    <input bind:value={dataForm.email} type="email" name="email" placeholder="Correo electrónico" autocomplete="email" required>
    <input bind:value={dataForm.phone} type="tel" name="phone" placeholder="Teléfono" autocomplete="tel">

    <select name="country" bind:value={dataForm.country_id} class="half-input" required>
        <CountriesOptions/>
    </select>
    <select name="city" bind:value={dataForm.city_id} class="half-input" required>
        <CitiesOptions countryID={dataForm.country_id}/>
    </select>
    <select name="product" bind:value={dataForm.product_selected_id} required>
        <ProductsOptions/>
    </select>
    <select name="reason" bind:value={dataForm.reason_id}>
        <ReasonsOptions/>
    </select>

    <fieldset>
        <legend>Seleccione su genero</legend>
        <label>
        <input bind:group={dataForm.gender} type="radio" name="size" value="1">
        Femenino
        </label>
        <label>
        <input bind:group={dataForm.gender} type="radio" name="size" value="2">
        Masculino
        </label>
        <label>
        <input bind:group={dataForm.gender} type="radio" name="size" value="3" checked>
        Prefiero no especificar
        </label>
    </fieldset>

    <!-- Mostramos información según el estado de la llamada.-->
    {#if response.wrong}
    <dialog open>
        <article>
            <h3>Ha ocurrido un error :/</h3>
            <p>
                Sucedió un error inesperado. Intente contarse en otro momento.
            </p>
            <p>
            <strong>Gracias, y disculpe las molestias.</strong>
            </p>
            <footer>
            <a href="#confirm" role="button" on:click={resetResponse}>De acuerdo</a>
            </footer>
        </article>
    </dialog>
    {/if}
    {#if response.ok}
    <dialog open>
        <article>
          <h3>Gracias por contactarse</h3>
          <p>
            Registramos correctamente su información de contacto, y estaremos comunicándonos lo más pronto posible.
          </p>
          <p>
            <strong>Muchas gracias.</strong>
          </p>
          <footer>
            <a href="#confirm" role="button" on:click={resetResponse}>De acuerdo</a>
          </footer>
        </article>
      </dialog>
    {/if}

    <button type="submit" class="primary">Enviar</button>
</form>


<!-- Algunos estilos -->
<style>
    form
    {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .half-input
    {
        width: 49%;
    }
    form button
    {
        margin: 0;
    }
</style>