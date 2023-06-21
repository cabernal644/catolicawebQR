const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img"),
descarga = document.querySelector("#descarga"),
img = document.querySelector("img");
var resultados = document.getElementById('resultado');
let preValue;

generateBtn.addEventListener("click", () => {
    resultado.innerHTML = '';
    var qrValue = qrInput.value.trim(); 
    numero = parseInt(qrValue);
    let bandera ="";
  if(qrValue > bandera ){
    $.ajax(
        {
         url:"https://g6decd90d51e3f0-cartas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/grados/grados/"+numero,
         success:function(respuesta){
          pintarRespuesta(respuesta.items);
         }
         
        });
    }   
});


function pintarRespuesta(items){
    if(items.length>0){
        setTimeout(codigo, 1000);
        let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+"<b>NOMBRE:</b> "+items[i].nombres+"</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td>"+"<b>TITULO:</b> "+items[i].titulo+"</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td>"+"<b>HORA:</b> "+items[i].hora+"</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td>"+"<b>DIRECCION:</b> "+items[i].direccion+"</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td>"+"<b>FECHA:</b> "+items[i].fecha+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>"; 
    $("#resultado").append(myTable);

    function codigo(){
        let qrValue = qrInput.value.trim();
        if(!qrValue || preValue === qrValue) return;
        preValue = qrValue;
        generateBtn.innerText = "Generating QR Code...";
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        qrImg.addEventListener("load", () => {
            wrapper.classList.add("active");
            generateBtn.innerText = "Generando Codigo QR";
        });
    }

}
    else{
        document.getElementById("prueba").value = "";
      //  $("#resultado").append("<p style=color:#A52A2A;>No se encuentra en el sistema codigo QR nulo</p>"); 
        window.location.reload()
     }         
}

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

descarga.addEventListener("click", ()=>{

    let imgPath = img.getAttribute("src");
    let nombreArchivo = getFileName(imgPath);
    saveAs(imgPath, nombreArchivo);
})

function getFileName(str){
    return str.substr(str.lastIndexOf('/') + 1)
}

