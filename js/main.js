 // Función para convertir el nombre a mayúsculas cuando se pierde el foco del campo
 $(document).ready(function() {
    $("#nombre").on("blur", function() {
      $(this).val($(this).val().toUpperCase());
    });

    // Inicializar el datepicker de Bootstrap en el campo de fecha de nacimiento
    $("#fechaNacimiento").datepicker({
        format: 'dd/mm/yyyy', // Formato de la fecha
        autoclose: true,     // Cerrar automáticamente al seleccionar una fecha
        todayHighlight: true, // Resaltar la fecha actual
        endDate: 'today',
      });
    });

    $("#fechaNacimiento").on("change", function() {
    var fechaNacimiento = $(this).val();
    if (fechaNacimiento) {
      var hoy = new Date();
      var nacimiento = new Date(fechaNacimiento);
      var edad = hoy.getFullYear() - nacimiento.getFullYear();
      var m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      $("#edad").val(edad);
    }
  });

     // Handler para el cambio de estado
     $("#estado").on("change", function() {
        var selectedEstado = $(this).val();
        cargarCiudades(selectedEstado);
      });
    
      // Función para cargar las ciudades mediante AJAX
      function cargarCiudades(estado) {
        $.ajax({
          url: "json/ciudades.json",
          type: "GET",
          dataType: "json",
          success: function(data) {
            console.log(data); // Verificar si los datos se cargan correctamente
            // Filtrar las ciudades correspondientes al estado seleccionado
            var ciudadesFiltradas = data.filter(function(ciudad) {
              return ciudad.estado === estado;
            });
    
            // Limpiar el select de ciudades antes de llenarlo
            $("#ciudad").empty();
    
            // Llenar el select de ciudades con las opciones filtradas
            ciudadesFiltradas.forEach(function(ciudad) {
              $("#ciudad").append('<option value="' + ciudad.ciudad + '">' + ciudad.ciudad + '</option>');
            });
    
            // Actualizar el select de ciudades con el plugin Select2
            $("#ciudad").select2();
          },
          error: function(xhr, status, error) {
            console.error("Error al cargar las ciudades:", error);
          }}); 
        }

         // Lista de sugerencias predefinidas (puedes cambiar o ampliar esta lista)
    var sugerencias = [
      "Argentina",
      "Brasil",
      "Chile",
      "Colombia",
      "Perú",
      "Uruguay",
      "Venezuela",
      "México",
      "España",
      "Estados Unidos"
    ];
  
    // Obtener el campo de entrada donde se ingresará el texto
    var inputField = $("#autocomplete-input");
  
    // Configurar el autocompletado usando jQuery UI
    inputField.autocomplete({
      source: sugerencias, // Utilizar la lista de sugerencias como fuente de datos
      minLength: 2 // Número mínimo de caracteres para mostrar sugerencias
    });

     // Aplicar el formato del número de teléfono con InputMask
     $("#phone-input").inputmask("(999)-999-99-99");