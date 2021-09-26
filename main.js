Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takePicture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}
console.log(ml5.version);
model = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BQmWN_P6-/model.json', modelloaded);
function modelloaded() {
    console.log("model is loaded")
}
var prediction1 = "";
function speak() {
    var api = window.speechSynthesis;
    speak_data1 = "the first prediction is" + prediction1;
    
    var say_this = new SpeechSynthesisUtterance(speak_data1);
    api.speak(say_this);
}
function check() {
    image = document.getElementById("captured_image");
    model.classify(image, gotresult);
}
function gotresult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emoji").innerHTML = result[0].label;
        prediction1 = result[0].label;
        speak();
        if (result[0].label == "amazing") {
            document.getElementById("result_emoji").innerHTML = "&#128076;"
        }
        if (result[0].label == "victory") {
            document.getElementById("result_emoji").innerHTML = "&#9996;"
        }
        if (result[0].label == "best") {
            document.getElementById("result_emoji").innerHTML = "&#128077;"
        }
    }
}