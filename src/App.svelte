<script>
    // Sistema de rutas en cliente.
	import { Router, Link, Route} from "svelte-navigator";
	
	// Vistas que es insertarán en una ruta.
	import Form from "./views/Contact.svelte";
	import Dashboard from "./views/Dashboard.svelte";
</script>

<!-- Declaramos router -->
<Router>
	<!--CABECERA DE PÁGINA Y MENÚ DE NAVEGACIÓN-->
	<header class="container">
		<nav>
			<ul>
				<li><strong>Prueba técnica.</strong></li>
			</ul>
			<ul>
				<!-- Asignamos el control de rutas -->
				<li><a href="/#"><Link to="/">Contacto</Link></a></li>
				<li><a href="/#" class="nav-button"><Link to="/admin">Panel de control</Link></a></li>
			</ul>
		</nav>
	</header>

	<!--CONTENIDO DE LA RUTA SELECCIONADA-->
	<main class="container">
		<!-- Los path y la vista dentro de cada path -->
		<Route path="/">
			<Form/>
		</Route>

		<Route path="/admin">
			<Dashboard/>
		</Route>

	</main>
</Router>
	

<!-- Algunos estilos -->
<style>
	.container{
		padding: 40px 0px 20px 0px;
	}
</style>