<script>
    // Este componente se encarga de recorrer una array de objetos y mostrar su id y descripción/nombre
    // Requiere: la información de las opciones y el mensaje que se muestra por defecto.
    export let options;
    export let message;
    // Opcional: un valor por defecto en la opción no seleccionable
    export let defaultValue = '';

</script>

<option value={defaultValue} selected disabled>{message}</option>

{#await options}
    <option value='' disabled>Obteniendo información...</option>
{:then options} 
    {#if options.length > 0}
        {#each options as option}
        <option value="{option.id}">{option.name}</option>
        {/each}
    {/if}
{/await}
