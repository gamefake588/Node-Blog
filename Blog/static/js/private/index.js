
var wenzi = document.getElementById('wenzi')
var video_demo = document.getElementById('video_demo')
var video_d = document.getElementById('video_d')
var num = 0;

function demo_switch(){
    
    if(num == 0){
        video_demo.style.display = 'block'
        wenzi.style.display = 'none'
        num = 1;
    }
    else if(num == 1){
        video_demo.style.display = 'none'
        wenzi.style.display = 'block'
        num = 0;
    }


}
video_d.addEventListener('click',demo_switch)