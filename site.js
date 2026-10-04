const nav=document.querySelector('.nav'),menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('[data-reveal]').forEach(e=>observer.observe(e));
const modal=document.getElementById('project-modal'),close=modal.querySelector('button'),main=document.querySelector('main'),header=document.querySelector('header'),footer=document.querySelector('footer');
let previousFocus;
function openProject(project){previousFocus=project;document.getElementById('modal-image').src=project.dataset.image;document.getElementById('modal-image').alt=project.querySelector('img').alt;for(const field of ['title','type','description'])document.getElementById('modal-'+field).textContent=project.dataset[field];modal.inert=false;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');[main,header,footer].forEach(e=>e.inert=true);close.focus()}
function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modal.inert=true;document.body.classList.remove('modal-open');[main,header,footer].forEach(e=>e.inert=false);previousFocus?.focus()}
document.querySelectorAll('.project').forEach(project=>{project.addEventListener('click',()=>openProject(project));project.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();openProject(project)}})});
close.addEventListener('click',closeProject);modal.addEventListener('click',e=>{if(e.target===modal)closeProject()});document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeProject();if(e.key==='Tab'){e.preventDefault();close.focus()}});
