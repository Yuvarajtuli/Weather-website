function run(){
    var dataget = $("#loc").val();
    if(dataget==""){
        alert("Please Enter Location !");
        return;
    }
fetch("http://localhost:3000/weather?address="+dataget).then((resp)=>{
    resp.json().then((data)=>{
        if(data.error){
            alert(data.error);
            return;
        }else{
            $("#result1").html(data.weather_data.weather);
            $("#result").fadeIn("slow");
        }
       
    })
})

}
function close_note(){
    $("#result").fadeOut("slow");
    $("#loc").val("");
    $("#result1").html("");
}