(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const p=()=>{const t=document.getElementById("toggleDarkMode"),o=document.documentElement;localStorage.getItem("mode")==="dark"&&(o.classList.add("dark"),t.checked=!0),t.addEventListener("input",()=>{o.classList.toggle("dark"),o.classList.contains("dark")?localStorage.setItem("mode","dark"):localStorage.setItem("mode","light")})},m=["code","fronend","programming"],y=Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),a=document.getElementById("game"),g=document.getElementById("logo");let d,i;const f=()=>{const t=sessionStorage.getItem("word");return`<div id="placeholders" class="placeholders-wrapper">${Array.from(t).reduce((r,e,n)=>r+`<h1 id="letter_${n}" class="letter">_</h1>`,"")}</div>`},h=()=>{const t=document.createElement("div");t.classList.add("keyboard"),t.id="keyboard";const o=y.reduce((s,r)=>s+`<button class="keyboard-button" id="${r}">${r}</button>`,"");return t.innerHTML=o,t},L=()=>{const t=document.createElement("img");return t.classList.add("hangman-image"),t.id="hangman-image",t.alt="Hangman image",t.src="/images/hg-0.png",t},E=t=>{const o=sessionStorage.getItem("word"),s=t.toLowerCase();if(o.includes(s))Array.from(o).forEach((e,n)=>{if(e===s){if(i++,i===o.length){l("win");return}document.getElementById(`letter_${n}`).innerText=s.toUpperCase()}});else{const r=document.getElementById("tries-left");d--,r.innerText=d;const e=document.getElementById("hangman-image");e.src=`/images/hg-${10-d}.png`,d===0&&l("lose")}},l=t=>{document.getElementById("placeholders").remove(),document.getElementById("tries").remove(),document.getElementById("keyboard").remove(),document.getElementById("quit").remove();const o=sessionStorage.getItem("word");t==="win"?(document.getElementById("hangman-image").src="images/hg-win.png",document.getElementById("game").innerHTML+='<h2 class="result-header win">You won!</h2>'):t==="lose"?document.getElementById("game").innerHTML+='<h2 class="result-header lose">You lost :(</h2>':t==="quit"&&(g.classList.remove("logo-resize"),document.getElementById("hangman-image").remove()),document.getElementById("game").innerHTML+=`<p>The word was: <span class="result-word">${o}</span></p><button id="play-again" class="btn-primary px-5 py-2 mt-5">Play again</button>`,document.getElementById("play-again").onclick=u},u=()=>{d=10,i=0,g.classList.add("logo-resize");const t=Math.floor(Math.random()*m.length),o=m[t];sessionStorage.setItem("word",o),a.innerHTML=f(),a.innerHTML+='<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>';const s=h();s.addEventListener("click",e=>{e.target.tagName.toLowerCase()==="button"&&(E(e.target.id),e.target.disabled=!0)}),a.appendChild(s);const r=L();a.prepend(r),a.insertAdjacentHTML("beforeend",'<button id="quit" class="button-secondary px-8 py-2 mt-8">Quit</button>'),document.getElementById("quit").onclick=()=>{confirm("Are you sure you want to leave and lose your progress?")&&l("quit")}};p();const I=document.getElementById("startGame");I.addEventListener("click",u);