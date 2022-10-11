<script>
	// Obtiene la información desde la API y la muestra con el componente 'options'

    import { onMount } from "svelte";
    import Options from "./options.svelte";

    let reasons = [];

    async function getReasons() {
		let response = await fetch('/api/reasons')

		return response.ok ? await response.json() : null;
	}

	onMount(async () => {
		reasons = await getReasons();
	});
</script>

<Options options={reasons} message='Motivo de consulta'/>

