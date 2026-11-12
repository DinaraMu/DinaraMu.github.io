/* Additive gallery behavior. Original script.js (Neural Glass) remains untouched. */
(function () {
  'use strict';
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(el => {
    const track = el.querySelector('.carousel-track');
    const slides = Array.from(el.querySelectorAll('.slide'));
    const thumbs = Array.from(el.querySelectorAll('.carousel-thumb'));
    const count = el.querySelector('.carousel-count');
    const videos = Array.from(el.querySelectorAll('video'));
    let position = 0;
    const number = slides.length;
    if (!number || !track) return;
    let paused = false;
    let lastChange = Date.now();
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'carousel-auto-toggle';
    const refreshToggle = () => {
      toggle.textContent = paused ? '▶ Auto rotate' : 'Ⅱ Pause rotation';
      toggle.setAttribute('aria-label', paused ? 'Start automatic image rotation' : 'Pause automatic image rotation');
    };
    refreshToggle();
    toggle.addEventListener('click', () => {
      paused = !paused;
      lastChange = Date.now();
      refreshToggle();
    });
    el.querySelector('.carousel-bottom')?.append(toggle);
    window.setInterval(() => {
      const playing = videos.some(video => !video.paused && !video.ended);
      if (paused || document.hidden || playing) {
        lastChange = Date.now();
        return;
      }
      if (Date.now() - lastChange >= 5000) update(position + 1);
    }, 500);
    const update = index => {
      lastChange = Date.now();
      position = (index + number) % number;
      track.style.transform = `translateX(-${position*100}%)`;
      count.textContent = `${String(position+1).padStart(2,'0')} / ${String(number).padStart(2,'0')}`;
      slides.forEach((slide,i) => {
        slide.setAttribute('aria-hidden',String(i!==position));
        const iframe=slide.querySelector('iframe');
        if (iframe) iframe.tabIndex = i===position ? 0 : -1;
      });
      thumbs.forEach((button,i)=>{
        const selected=i===position;
        button.classList.toggle('is-active',selected);
        button.setAttribute('aria-pressed',String(selected));
      });
      // Stop audio if leaving a trailer slide.
      videos.forEach(v=>{ if (!slides[position].contains(v)) v.pause(); });
      // Never scroll the page when a carousel advances automatically.
    };
    el.querySelector('.carousel-prev')?.addEventListener('click',()=>update(position-1));
    el.querySelector('.carousel-next')?.addEventListener('click',()=>update(position+1));
    thumbs.forEach((button,i)=>button.addEventListener('click',()=>update(i)));
    el.addEventListener('keydown',ev=>{
      if (ev.target.closest('video, iframe, button')) return;
      if (ev.key==='ArrowRight' || ev.key==='ArrowLeft') {
        ev.preventDefault(); update(position+(ev.key==='ArrowRight'?1:-1));
      }
    });
    let dragStart=null;
    el.querySelector('.carousel-stage').addEventListener('pointerdown',ev=>{
      if(ev.target.closest('video,iframe,button')) return;
      dragStart=ev.clientX;
    });
    el.querySelector('.carousel-stage').addEventListener('pointerup',ev=>{
      if(dragStart===null) return;
      const delta=ev.clientX-dragStart;dragStart=null;
      if(Math.abs(delta)>60) update(position+(delta<0?1:-1));
    });
  });
})();
