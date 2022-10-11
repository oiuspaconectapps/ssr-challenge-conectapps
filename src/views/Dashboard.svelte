<script>
    import LeadsTable from "./components/dashboard/LeadsTable.svelte";

    //Declaración de variables que simulan el login de usuario.
    let credentials = {
            user : '',
            password: ''
        }
    let session = false;
    let login_error = false;

    async function login(event)
    {
        login_error = false;
        event.preventDefault();

        // Hacemos un llamado la ruta de logeo.
        fetch('/api/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)})
        .then((response) => {
            // Obtenemos los resultados en variables locales.
            session = response.ok;
            login_error = !response.ok;
        });
    }

</script>

<!-- En caso de haber iniciado sesión, mostramos la información en el componente LeadsTable. Si no, el login -->
{#if session}
    <article>
        <hgroup>
            <h1>Panel de administración</h1>
            <p>Desde acá se pueden visualizar, diferentes datos de interés para el negocio.</p>
        </hgroup>
        <hr>
        <LeadsTable/>
    </article>
{:else}
<article>
    <hgroup>
        <h1>Iniciá sesión</h1>
        <p>Para poder acceder al panel de administrador</p>
    </hgroup>
    {#if login_error}
        <p class="wrong">Usuario y/o contraseña incorrectos. Intente de nuevo.</p>
    {/if}
    <form>
        <label>
            Usuario
            <input bind:value={credentials.user} id="login-user" type="text" required>
        </label>
        <label>
            Contraseña
            <input bind:value={credentials.password} id="login-password" type="password" required>
        </label>
        
        <button on:click={(event) => {login(event)}}>Ingresar</button>
    </form>
</article>
{/if}


<style>
    .wrong
    {
        color: red;
    }
    button
    {
        margin-top: 25px;
    }
</style>