(()=>{
const CSS=':host{display:block;position:relative;width:100%;height:100%;aspect-ratio:3/2}'+
'.f{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}'+
'img{position:absolute;inset:0;width:100%;height:100%;display:none}'+
'.c{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;font:10px/1.2 system-ui,-apple-system,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.c a{color:inherit;text-decoration:none}.c a:hover{text-decoration:underline}';
const UTM='utm_source=icorpal&utm_medium=referral';
const withUtm=h=>{try{const u=new URL(h);if(/(^|\.)unsplash\.com$/.test(u.hostname)&&!u.searchParams.has('utm_source')){u.searchParams.set('utm_source','icorpal');u.searchParams.set('utm_medium','referral');}return u.toString();}catch(e){return '';}};
class ImageSlot extends HTMLElement{
static get observedAttributes(){return['src','fit','shape','radius','credit','credit-href'];}
constructor(){super();const r=this.attachShadow({mode:'open'});
r.innerHTML='<style>'+CSS+'</style><div class="f"><img alt="" loading="lazy" decoding="async"></div><span class="c"></span>';
this._f=r.querySelector('.f');this._i=r.querySelector('img');this._c=r.querySelector('.c');}
connectedCallback(){this._r();}
attributeChangedCallback(){if(this._i)this._r();}
_r(){const src=this.getAttribute('src')||'',fit=(this.getAttribute('fit')||'cover').toLowerCase(),shape=(this.getAttribute('shape')||'rounded').toLowerCase();
let rad='';if(shape==='circle')rad='50%';else if(shape==='pill')rad='9999px';else if(shape==='rounded'){const n=parseFloat(this.getAttribute('radius'));rad=(isFinite(n)?n:12)+'px';}
this._f.style.borderRadius=rad;this._i.style.objectFit=fit==='contain'?'contain':'cover';
const ph=this.getAttribute('placeholder');if(ph)this._i.alt=ph.replace(/^[^·]*·\s*/,'');
if(src){if(this._i.getAttribute('src')!==src)this._i.src=src;this._i.style.display='block';}else{this._i.removeAttribute('src');this._i.style.display='none';}
const credit=(this.getAttribute('credit')||'').trim(),href=withUtm(this.getAttribute('credit-href')||'');this._c.textContent='';
if(src&&credit){const a=(t,h)=>{const e=document.createElement('a');e.target='_blank';e.rel='noopener noreferrer';e.href=h;e.textContent=t;return e;};
const m=/^Photo by (.+) on Unsplash$/.exec(credit);
if(m){this._c.append('Photo by ',href?a(m[1],href):m[1],' on ',a('Unsplash','https://unsplash.com/?'+UTM));}else this._c.textContent=credit;
this._c.style.display='block';}else this._c.style.display='none';}
}
customElements.get('image-slot')||customElements.define('image-slot',ImageSlot);
})();
