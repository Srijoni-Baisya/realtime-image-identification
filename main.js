function setup(){
    canvas = createCanvas(250,250);
    canvas.center();
    //access webcam
    video = createCapture(VIDEO);
    video.hide();
    //load the model
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/l6houZAJ6/model.json',modelLoaded);
}

function modelLoaded(){
    console.log("Model loaded !");
}

function draw(){
    image(video,0,0,250,250);

    //compare the realtime image with model
    classifier.classify(video,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        accuracy = results[0].confidence.toFixed(3);
        percentage = accuracy*100;
        document.getElementById("result_object_name").innerHTML= results[0].label;
        document.getElementById("result_object_accuracy").innerHTML= percentage + "  %";
    }
}