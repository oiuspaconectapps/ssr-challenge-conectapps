<script>
	// Obtiene la información desde la API y la muestra con el componente 'options'
    import { onMount } from "svelte";
    import Options from "./options.svelte";

    let countries = [];

    async function getCountries() {
		let response = await fetch('/api/countries')

		return response.ok ? await response.json() : null;
	}

	onMount(async () => {
		countries = await getCountries();
	});
</script>

<Options options={countries} message='País' defaultValue={null}/>