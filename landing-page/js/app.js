/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

//define const to take navBar to add the nav buttons
const getNav = document.querySelector("#navbar__list");
const getMain = document.querySelector("main");
/**
 * End Global Variables
 * Begin Main Functions
 *
 */

//first we will build Section 4 and add it to the body
const section4 = document.createElement("section");
const sectionDiv = document.createElement("div");
section4.setAttribute("id", "section4");
section4.setAttribute("data-nav", "section 4");
sectionDiv.setAttribute("class", "landing__container");
sectionDiv.innerHTML =
  "<h2>Section 4</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p> <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>";
section4.appendChild(sectionDiv);
getMain.appendChild(section4);

// build the nav
getNav.style.cssText = "padding:20px";
for (let i = 1; i < 5; i++) {
  let navli = document.createElement("li");
  let nava = document.createElement("a");
  nava.style.cssText =
    "text-decoration: none; padding:15.0px; color:#696969; font-size:1.2em; border-radius:8px;";
  nava.setAttribute("href", `#section${i}`);
  nava.textContent = "Section " + i;

  // Scroll to anchor ID using scrollTO event
  nava.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(`#section${i}`).scrollIntoView({
      behavior: "smooth",
    });
  });

  //add to the page
  navli.appendChild(nava);
  getNav.appendChild(navli);
}

// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", (event) => {
  let top = window.scrollY;
  let tabs = document.querySelectorAll("nav ul li a");
  tabs.forEach((tab) => {
    let section = document.querySelector(tab.hash);
    if (
      section.offsetTop < top &&
      section.offsetTop + section.offsetHeight > top
    ) {
      tab.classList.add("active");
      //add color for active sections
      tab.style.cssText += "color:#FFF; background-color:#04d1d1";
    } else {
      tab.classList.remove("active");
      tab.style.cssText += "color:#696969; background-color:#fff";
    }
  });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Set sections as active
window.addEventListener("scroll", (event) => {
  let top = window.scrollY;
  //define sections to use it for change active
  let sctions = document.querySelectorAll("section");
  sctions.forEach((sction) => {
    if (sction.offsetTop < top + 100) {
      sction.classList.add("your-active-class");
    } else {
      sction.classList.remove("your-active-class");
    }
  });
});
