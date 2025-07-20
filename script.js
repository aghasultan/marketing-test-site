/* ==========================================================
   script.js – canvas particles, reveal-on-scroll, mobile nav
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* remove fallback class */
  document.body.classList.remove('no-js');

  /* -------- CONFIG -------- */
  const DENSITY = 9000, MAX = 350;
  const GREEN = 'rgba(0,168,107,0.4)', GREEN_STROKE = 'rgba(0,168,107,';
  const CONNECT = 7;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- CANVAS -------- */
  const canvas = document.getElementById('interactive-bg');
  const ctx = canvas.getContext('2d');
  const mouse = {x:null,y:null,radius:(innerHeight/100)*(innerWidth/100)};
  let particles=[];

  function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if(!reduce) init();
  }

  class Particle{
    constructor(x,y,dx,dy,s){this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.s=s;}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fillStyle=GREEN;ctx.fill();}
    update(){
      if(this.x>canvas.width||this.x<0)  this.dx=-this.dx;
      if(this.y>canvas.height||this.y<0) this.dy=-this.dy;
      const dx=mouse.x-this.x, dy=mouse.y-this.y, dist=Math.hypot(dx,dy);
      if(dist<mouse.radius+this.s){
        if(mouse.x<this.x&&this.x<canvas.width-this.s*10) this.x+=5;
        if(mouse.x>this.x&&this.x>this.s*10)              this.x-=5;
        if(mouse.y<this.y&&this.y<canvas.height-this.s*10) this.y+=5;
        if(mouse.y>this.y&&this.y>this.s*10)              this.y-=5;
      }
      this.x+=this.dx; this.y+=this.dy; this.draw();
    }
  }

  function init(){
    particles=[];
    const count=Math.min(MAX,(canvas.width*canvas.height)/DENSITY);
    for(let i=0;i<count;i++){
      const s=Math.random()*2+1;
      particles.push(new Particle(
        Math.random()*(canvas.width-s*2)+s*2,
        Math.random()*(canvas.height-s*2)+s*2,
        (Math.random()*0.4)-0.2,
        (Math.random()*0.4)-0.2,
        s));
    }
  }

  function connect(){
    for(let a=0;a<particles.length;a++){
      for(let b=a;b<particles.length;b++){
        const dx=particles[a].x-particles[b].x,
              dy=particles[a].y-particles[b].y,
              dist=dx*dx+dy*dy;
        if(dist<(canvas.width/CONNECT)*(canvas.height/CONNECT)){
          ctx.strokeStyle=GREEN_STROKE+(1-dist/20000)+')';
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x,particles[a].y);
