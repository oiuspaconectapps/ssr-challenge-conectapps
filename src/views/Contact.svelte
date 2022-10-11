<script>
  import Form from "./components/Form.svelte";
</script>

<article class="grid">
  <div>
    <hgroup>
      <h1>Contacto.</h1>
      <h2>Completá los datos del formulario y te contactaremos.</h2>
    </hgroup>
    <Form/>
  </div>
  <div id="form-image"></div>
</article>


<style>
#form-image
{
  background-image:  url("../images/form-background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
}
</style>