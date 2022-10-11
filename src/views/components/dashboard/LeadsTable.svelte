<script>
    import { onMount } from "svelte";
    import LeadsGraph from "./leads-graphs/leadsGraph.svelte";
    
    let leads = [];

    // Función que obtiene, de una llamada a la API, los leads según el filtro aplicado.
    async function getLeads() {
		
        let filter = {
            since: document.getElementById('since').value,
            until: document.getElementById('until').value,
            rows: document.getElementById('rows').value,
        }
        console.log(filter);

        // Construimos la URL según los filtros utilizados.
        let url = '/api/leads?limit='+filter.rows;

        if (filter.since != "" && filter.until != "") {
            url += '&since='+filter.since+'&until='+filter.until;
        }
        console.log(url);

        // Ejecutamos la llamada a la API.
		let response = await Promise.resolve(fetch(url))
                            .then(async (result) => {
                                for (let i = 0; i < result.length; i++) {
                                    result[i].country_name = await filterCountryByID(result[i].country_id);
                                }
                                return result;
                            });

		return response.ok ? await response.json() : null;
	}

    // Sirve para cuando se actualizan los filtros, traer los Leads con las nuevas directivas.
    async function updateLeads() {
        leads = Promise.resolve(await getLeads()).then((result)=>result);
	}

    // Se ejecuta al montar los componentes.
    // Evita ejecuciones antes de que se haya cargado la interfaz.
	onMount(async () => {
        setTimeout(()=>{
            let today = new Date();
            today = today.toISOString().split('T')[0];
            document.getElementById('until').value = today;
            leads = getLeads();
        }, 100);
	});
</script>


<!-- TABLA Y CONTROLES PRINCIPALES -->
<section>
    <h3>Detalle de Leads</h3>
    <nav class="filter">
        <ul id="filter-date">
            <label for="since">Desde <input type="date" id="since" on:change={updateLeads}></label>
            <label for="until">Hasta <input type="date" id="until" on:change={updateLeads}></label>
        </ul>
        <ul id="filter-rows">
            <label for="rows">
                N° Leads
                <select id="rows" on:change={updateLeads}>
                    <option value="10" selected>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
        </ul>
    </nav>
    <table>
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo Electrónico</th>
                <th scope="col">País</th>
                <th scope="col">Producto</th>
                <th scope="col">Motivo de consulta</th>
                <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>    
        {#await leads}
            <tr>Buscando...</tr>
        {:then leads}    
            {#each leads as lead}
            <tr>
                <th scope="row">{lead.id}</th>
                <td>{lead.firstname} {lead.lastname}</td>
                <td>{lead.email}</td>
                <td>{lead.country}</td>
                <td>{lead.product_selected}</td>
                <td>{lead.reason}</td>
                <td>{lead.date.slice('0',10)}</td>
            </tr> 
            {/each}
                
        {/await}
        </tbody>
    </table>
</section>

<section>
<!-- GRÁFICOS -->
<!-- Una vez obtenida la información de Leads, insertamos el componente de gráfico. -->
{#await leads}
    <p>Cargando información de Leads</p>
{:then leads}
    <h4>Datos demográficos</h4>
    <hr>
    <LeadsGraph leads={leads} property='country' graphTitle="Leads según País"/>
    <LeadsGraph leads={leads} property='city' graphTitle="Leads según Ciudades"/>
    <LeadsGraph leads={leads} property='gender' graphTitle="Leads según género"/>
    <h4>Datos de productos</h4>
    <hr>
    <LeadsGraph leads={leads} property='product_selected' graphTitle="Productos que generaron más Leads" graphType='bar'/>
{/await}
</section>


<style>
    .filter ul
    {
        margin: 0;
    }
    .filter label
    {
        width: fit-content;
        max-width: 200px;
        float:left !important;
        margin-right: 20px;
    }
    #filter-rows label
    {
        text-align: right;
        margin-right: 0px !important;
    }
    .filter #rows
    {
        float: right;
        max-width: 140px;
        margin-right: 0;
    }


    table { 
        font-size: 15px;
        
    }
</style>