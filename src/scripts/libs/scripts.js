/* ----------------------------------------------- */
/* Author : Vincent Garreau  - vincentgarreau.com  */
/* ----------------------------------------------- */

$(function(){

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     ||  
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/* ----- Set variables ----- */

var appAnim = {
    window: $(window),
    ww: window.innerWidth,
    hh: window.innerHeight
}

var anim = {
    canvas: document.getElementById('anim'),
    mouse_pos: {x: 0, y: 0},
    opacity_line: 0.125,
    min_dist_particles: 60,
    min_dist_mouse: 180,
    status: 'mouseleave',
    particles_alpha: false,
    alpha_color: 1
}

var particles = {
    nb: 350,
    array: [],
}
if(appAnim.ww > 1400) particles.nb = 450;


/* ----- Start ----- */

anim.ctx = anim.canvas.getContext('2d');


/* ----- Canvas ----- */

function sizeCanvas(){
    appAnim.window.on('resize', function(){
        /* Refresh window size */
        appAnim.ww = window.innerWidth;
        appAnim.hh = window.innerHeight;

        /* Resize canvas */
        anim.canvas.width = appAnim.ww/2;
        anim.canvas.height = appAnim.hh;

        /* Paint canvas */
        paintCanvas();
    })
    anim.canvas.width = appAnim.ww/2;
    anim.canvas.height = appAnim.hh;
}
//sizeCanvas();

function paintCanvas(){
    anim.ctx.fillStyle = 'rgba(182,25,36,1)';
    anim.ctx.fillRect(0,0,appAnim.ww,appAnim.hh);
}
//paintCanvas();


/* ----- Particles ----- */

/* Init */

function particle(color){
    this.x = Math.random() * appAnim.ww/2;
    this.y = Math.random() * appAnim.hh;
    /* Speed */
    this.vx = -.5 + Math.random() * 1.1;
    this.vy = -.5 + Math.random() * 1.1;
    /* Size */
    this.radius = Math.random() * 1;

    this.draw = function(color){
        anim.ctx.fillStyle = color;
        anim.ctx.beginPath();
        anim.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        anim.ctx.fill();
    }
}

function createParticles(){
    for(var i = 0; i < particles.nb; i++) {
        particles.array.push(new particle('white'));
    }
}
//createParticles();


/* Move */

function drawParticles() {
    paintCanvas();
    for(var i = 0; i < particles.array.length; i++){
        //anim.ctx.clearRect(0, 0, appAnim.ww/2, appAnim.hh);
        if(particles.array[i].linked) particles.array[i].draw('white');
        else particles.array[i].draw('rgba(255,255,255,'+anim.alpha_color+')');
        
        //paintCanvas();
    }
    moveParticles();
}
//drawParticles();

var arrayTime = [];

function moveParticles(){
    for(var i = 0; i < particles.array.length; i++){
        p = particles.array[i];

        /* Move (based on velocity) */

        if(anim.status == 'mousemove'){
            arrayTime.push(new Date().getTime());

            var difTime = new Date().getTime() - arrayTime[0];


            var speedTest = difTime * 3 / 6000;
            

            if(difTime > 1000){
                anim.particles_alpha = true;
                anim.alpha_color = 1 - difTime / 6000;
            }   

            // if(new Date().getTime() > arrayTime[0] + 3000){
            //  p.x += p.vx/3;
            //  p.y += p.vy/3;
            // }

            p.x += p.vx/speedTest;
            p.y += p.vy/speedTest;

            
            
        }else{
            p.x += p.vx;
            p.y += p.vy;
        }
        

        /* Change position if out window */
        if(p.x + p.radius > appAnim.ww/2) p.x = p.radius;
        else if(p.x - p.radius < 0) p.x = appAnim.ww/2 - p.radius;
        if(p.y + p.radius > appAnim.hh) p.y = p.radius;
        else if(p.y - p.radius < 0) p.y = appAnim.hh - p.radius;

        /* Check distance between each particle and mouse position */
        for(var j = i + 1; j < particles.array.length; j++){
            p2 = particles.array[j];
            distanceParticleMouse(p, p2);
        }
        
    }
}

function distanceParticleMouse(p1, p2){

    var dist,
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
    dist = Math.sqrt(dx*dx + dy*dy);

    var dist_mouse,
        dx_mouse = p1.x - anim.mouse_pos.x;
        dy_mouse = p1.y - anim.mouse_pos.y;
    dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

    //anim.ctx.clearRect(0, 0, appAnim.ww/2, appAnim.hh);
    //anim.ctx.fillStyle = 'black';

    /* Check distance between 2 particles + Check distance between 1 particle and mouse position */
    if(dist <= anim.min_dist_particles && dist_mouse <= anim.min_dist_mouse && anim.status == 'mousemove'){
        /* Draw the line */
        anim.ctx.beginPath();
        anim.ctx.strokeStyle = 'rgba(255,255,255,'+anim.opacity_line+')';
        anim.ctx.moveTo(p1.x, p1.y);
        anim.ctx.lineTo(p2.x, p2.y);
        anim.ctx.stroke();
        anim.ctx.closePath();

        p1.linked = true;
        p2.linked = true;
    }else{
        if(anim.particles_alpha){
            p1.linked = false;
            p2.linked = false;
        }
    }

}



/* Launch */

function animloop(){
    drawParticles();
    requestAnimFrame(animloop);
}

if(appAnim.ww > 1100){
    sizeCanvas();
    paintCanvas();
    createParticles();
    drawParticles();
    animloop();
}


$(anim.canvas).on('mousemove mouseleave', function(e){
    if(anim.enablemouse){
            if(e.type == 'mousemove'){
            anim.status = 'mousemove';
            anim.mouse_pos.x = e.pageX;
            anim.mouse_pos.y = e.pageY;
        }else{
            anim.status = 'mouseleave';
            anim.mouse_pos.x = 0;
            anim.mouse_pos.y = 0;
            arrayTime = [];
            setTimeout(function(){
                anim.particles_alpha = false;
                anim.alpha_color = 1;
            }, 600)
            
        }
    }
    
})


function autoAnim(){
    $(anim.canvas).addClass('show_anim');
    anim.mouse_pos.x = appAnim.ww/5.5;
    anim.mouse_pos.y = appAnim.hh/1.5;
    anim.status = 'mousemove';
    
    setTimeout(function(){
        // $(anim.canvas).removeClass('show_anim');
        // anim.mouse_pos.x = 0;
        // anim.mouse_pos.y = 0;
        // anim.status = 'mouseleave';
        anim.enablemouse = true;
    }, 3000)

    // setTimeout(function(){
    //  anim.particles_alpha = false;
    //  anim.alpha_color = 1;
    // }, 3600)
}


$(anim.canvas).on('autoplay', function(){
    autoAnim();
})



$('.home_left').on('mousemove mouseleave', function(e){
    if(anim.enablemouse){
        if(e.type == 'mousemove'){
            anim.status = 'mousemove';
            anim.mouse_pos.x = e.pageX;
            anim.mouse_pos.y = e.pageY;

        }else{
            $(anim.canvas).removeClass('show_anim');
            anim.status = 'mouseleave';
            anim.mouse_pos.x = 0;
            anim.mouse_pos.y = 0;
        }
    }   
})

function checkIfAnim(){
    if(appAnim.ww > 1100){
        if(app.currentIndex != 0){
            $('.home_left_wrap').addClass('opacity');
            if(typeof(myReq) != 'undefined'){
                window.cancelAnimationFrame(myReq);
                //console.log('pause');
            }       
        }else{
            $('.home_left_wrap').removeClass('opacity');
            if(appAnim.ww >= 1100){
                $(anim.canvas).addClass('left').removeClass('opacity');
                animloop();
                //console.log('launch');
            }
        }
    }   
}

$('.nav_home.prev, .nav_home.next, .home_enter, .bc_home').on('click', function(e){
    setTimeout(function(){
        checkIfAnim();
    }, 100);
})


})