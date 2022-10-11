<script>
	// Obtiene la información desde la API y la muestra con el componente 'options'
    import { onMount } from "svelte";
    import Options from "./options.svelte";

    let products = [];

    async function getProducts() {
		let response = await fetch('/api/products')

		return response.ok ? await response.json() : null;
	}

	onMount(async () => {
		products = await getProducts();
	});
</script>

<Options options={products} message='Producto de interés'/>