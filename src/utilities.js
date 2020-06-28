
let utilities = window.utilities = {
    say:function(text){

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[15];
        msg.voiceURI = "native";
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        msg.text =text;
        msg.lang = 'en-US';
        speechSynthesis.speak(msg);


    }
}

export default utilities;