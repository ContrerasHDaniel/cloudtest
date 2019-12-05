// url base
var url = "/ganado/";

function updateVaca(id, alias, sex, weight, age, breed, type, vaccs, calf, iron, details) {
    var datosJS = JSON.stringify({"id": id, "alias": alias, "sex": sex, "weight": weight, "age": age, "breed": breed, "type": type, "vaccs": vaccs, "calf": calf, "iron": iron, "details": details});
    var datos = JSON.parse(datosJS);
    $.ajax({
        url: url,
        type: 'PUT',
        data: datos,
        success: function (res) {
            alert('Registro modificado con éxito');
            document.location.reload(true);
        },
        statusCode: {
            500: function () {
                alert('Algo salió mal');
            }
        }
    });
}