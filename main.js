let model;

async function loadModel() {
      try {
        model = await tf.loadLayersModel('model.json');
        console.log("Model loaded");
      } catch (err) {
        console.error("Error loading model:", err);
      }
    }

var arr = [];
var mouseX = 0;
var mouseY = 0;
var down = false;
var c = document.getElementById("c");
var ctx = c.getContext("2d");
for (var i = 0; i < 28 * 28; i++) {
  arr.push(0);
}
var bars = document.getElementsByClassName("barW");


ctx.fillStyle = "white";
document.addEventListener("mousedown", (e) => {
  down = true;
});
document.addEventListener("mousemove", (e)=>{
  mouseX = e.clientX;
  mouseY = e.clientY;
})
document.addEventListener("mouseup", (e) => {
  down = false;
});


function clicked(){
    if(!model){
        alert("model not loaded yet")
    }
  const normArr = arr.map(v => v / 255);
  const input = tf.tensor(normArr, [1, 784]);
  const prediction = model.predict(input);
  prediction.array().then(array => {
  for(var i = 0; i < array[0].length; i++){
    bars[i].style.width = array[0][i]*100 + "%";
  }
});
}




function animation(){
    ctx.fillStyle = "black";
  ctx.fillRect(0,0,28,28);
  var X = mouseX-50;
  
  var Y = mouseY-120;
  ctx.fillStyle = "red";
  ctx.fillRect(Math.floor((X) / 20), Math.floor((Y) / 20), 1, 1);

  ctx.fillRect(Math.floor((X) / 20), Math.floor((Y) / 20), 1, 1);
  if (X <= 560 && Y <= 560 && down) {
    arr[Math.floor(Y / 20)*28 + (Math.floor(X / 20))] = 255;
    arr[(Math.floor(Y / 20)-1)*28 + (Math.floor(X / 20))] = 255;
    arr[(Math.floor(Y / 20)+1)*28 + (Math.floor(X / 20))] = 255;
    arr[Math.floor(Y / 20)*28 + (Math.floor(X / 20)) + 1] = 255;
    arr[Math.floor(Y / 20)*28 + (Math.floor(X / 20)) - 1] = 255;
  }
  ctx.fillStyle = "white";
  for(var i = 0; i < 28*28; i++){
    if(arr[i] == 255){
      ctx.fillRect(i % 28, Math.floor(i / 28),1,1);
    }
  }
  requestAnimationFrame(animation);
}
loadModel();
animation();
