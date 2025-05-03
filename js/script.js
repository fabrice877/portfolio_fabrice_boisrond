/*====================================================================typing animation========================================================================*/
var typed = new Typed(".typing", {
  strings: [
    "à la recherche d'une alternance",
    "à la recherche d'une alternance",
    "à la recherche d'une alternance",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});
/*=====================================================================Aside==================================================================================*/

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        //allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if(window .innerWidth < 1200)
    {
      asideSectionTogglerBtn();
    }
  })
}
function removeBackSection()
{
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num)
{
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element)
{
  for(let i = 0; i<totalNavList; i++)
  {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
    {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click",function(){
  const sectionIndex = this.getAttribute("data-section-index");
 // console.log(sectionIndex);
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex); 
})


const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
  navTogglerBtn.addEventListener("click",() => 
  {
    asideSectionTogglerBtn();
  })
  function asideSectionTogglerBtn()
  {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i = 0; i<totalSection;i++)
    {
      allSection[i].classList.toggle("open");
    }
  }

  // Gestion du formulaire
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Feedback visuel pendant l'envoi
  submitBtn.innerHTML = 'Envoi en cours...';
  submitBtn.disabled = true;
  
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      showFormResponse('Message envoyé avec succès !', 'success');
    } else {
      throw new Error('Erreur réseau');
    }
  })
  .catch(error => {
    showFormResponse('Une erreur est survenue. Veuillez réessayer.', 'error');
  })
  .finally(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  });
});

function showFormResponse(message, type) {
  const responseDiv = document.createElement('div');
  responseDiv.id = 'formResponse';
  responseDiv.textContent = message;
  responseDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
  responseDiv.style.color = type === 'success' ? '#155724' : '#721c24';
  
  const existingResponse = document.getElementById('formResponse');
  if (existingResponse) {
    existingResponse.remove();
  }
  
  document.querySelector('.contact-form').appendChild(responseDiv);
  responseDiv.style.display = 'block';
  
  setTimeout(() => {
    responseDiv.style.display = 'none';
  }, 5000);
}