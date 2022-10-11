<script>
    // Obtiene la información desde la API y la muestra con el componente 'options'
    import Options from "./options.svelte";
    export let countryID = null; // Requiere el countryID para poder mostrar las ciudades relacionadas.
    
    let cities = [];
    let message = '';

    async function getCities() {
		let response = await fetch('api/cities?countryID='+countryID);

		return response.ok ? await response.json() : null;
	}

    async function updateCitiesList()
    {
        cities = Promise.resolve(await getCities()).then((results) => results);
    }

    $: {
        updateCitiesList();
        if(countryID != null)
        {
            message = 'Ciudad';
        }else{
            message = 'Ciudad - Debe elegir primero su país.'
        }
    }
    
</script>

{#if cities != null}
    <Options options={cities} message={message}/>
{/if}
