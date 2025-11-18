 // small interactions: toggle form mode or show notifications
document.addEventListener('click', e => {
  if (e.target.matches('[data-copy]')) {
    const txt = e.target.getAttribute('data-copy');
    navigator.clipboard?.writeText(txt).then(()=> {
      e.target.innerText = 'Copied!';
      setTimeout(()=> e.target.innerText = 'Copy', 1200);
    });
  }
});
