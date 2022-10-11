<script>
    import { onMount } from "svelte";

    // Se utiliza Chart.js para la creación de los gráficos.

    // Requiere: la información de Leads y la propiedad a mostrar en el gráfico
    export let leads;
    export let property;

    // Opcional: tipo de gráfico y título del mismo.
    export let graphType = 'pie';
    export let graphTitle = 'Gráfico de torta - '+ property;


    let backgroundColors = [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ];
    
    // Reinicia y crea el canvas donde se insertará el gráfico
    function createCanvas(value)
    {
        if(document.querySelector('#'+value)) document.querySelector('#'+value).remove();
        let container = document.querySelector(".container-chart-"+property);
        //let canvas = document.createElement('canvas');
        let canvas = container.appendChild(document.createElement('canvas'));
        canvas.setAttribute('id', "chart-"+property);
    }
    
    // Al iniciar el componente, crea el canvas
    onMount(async()=>{
        createCanvas("chart-"+property);
    })
    
    // Se ejecuta reactivamente. Inserta el gráfico.
   $: {
        let values = {};
        leads.forEach(lead => {
            values[lead[property]] = values[lead[property]] ? values[lead[property]]+1 : 1; 
        });
        
        let xValues = [];
        let yValues = [];

        for (const property in values) {
            xValues.push(property)
            yValues.push(values[property]);
        }
        
        setTimeout(() => {
            let chartID = "chart-"+property;
            createCanvas(chartID);

            let config = {
                type: graphType,
                data: {
                    labels: xValues,
                    datasets: [{
                        label: '# Productos más seleccionados',
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0,0,0,0.2)',
                        data: yValues
                    }]
                },
                options: {
                    color: '#ddd',
                    plugins: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 16,
                                    weight: 600
                                }
                            }
                        }
                    }
                }
            }

            new Chart(chartID, config);
           
        }, 300);
    }

</script>

<article class={"container-chart-"+property}>
    <h3>{graphTitle}</h3>
</article>

<style>
    article
    {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 40px;
    }
</style>



