// javascript file for the index page
window.addEventListener('load', () => {
    addContactEmail()
    addScrollAnimation() // optional
    addMenuActions()
})

/**
 * Update page "contact-email" address after a short delay
 * at least try to filter out some of the bots
 */
function addContactEmail() {
    window.setTimeout(() => {
        try {
            const email = atob('NDN5ZmdwMTM1QG1vem1haWwuY29t')
            const contactEmail = document.getElementById('contact-email')
            contactEmail.textContent = 'Email: '

            const link = document.createElement('a')
            link.href = 'mailto:' + email
            link.textContent = email

            contactEmail.appendChild(link)
        } catch (e) {
            console.error(`Page load event has failed: ${e.message || e}`);
        }
    }, 2000)
}

// The debounce function receives our function as a parameter
const createDebounce = (fn) => {
    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame

    // The debounce function returns a new function that can receive a variable number of arguments
    return (cb /*...params*/) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
            cancelAnimationFrame(frame)
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
            // Call our function and pass any params we received
            fn(cb /*...params*/)
        })
    }
}

const onScroll = () => {
    // optional: add scroll position to data attribute
    // so we can use it in our stylesheets
    //document.documentElement.dataset.scroll = window.scrollY
    const elements = document.querySelectorAll(".parallax.scroll") // ".article"
    for (const element of elements) {
        const rect = element.getBoundingClientRect()

        // initialize saving original background position
        if (!element.hasAttribute("data-background-position-y")) {
            // 1. has style property/attribute set
            const attrStylePosY = (element.style.backgroundPositionY || "").replace("%", "")
            if (attrStylePosY) {
                element.setAttribute("data-background-position-y", attrStylePosY)
            } else {
                // 2. has CSS property set
                const computedStylePosY = window.getComputedStyle(element)["background-position-y"].replace("%", "")
                if (computedStylePosY) {
                    element.setAttribute("data-background-position-y", computedStylePosY)
                }
            }
        }
        const oldBGPosY = Number((element.getAttribute("data-background-position-y") || "").replace("%", ""))
        const newBGPosY = (((window.scrollY - rect.top) + (rect.height / 2)) / 100) * 0.20
        element.style.backgroundPositionY = newBGPosY - oldBGPosY + "%"
        // element.style.backgroundPositionY = newBGPosY + "%" // option 2.
    }
}

/**
 * Adds parallax scrolling animation to the elements with class "parallax" 
 * and "scroll" when the page is scrolled.
 *
 * This function listens for new scroll events, and updates the background 
 * position of the elements with class "parallax" and "scroll" accordingly.
 *
 * The parallax scrolling animation is added by setting the background position
 * of the elements with class "parallax" and "scroll" to a value that is 
 * proportional to the scroll position of the page. The background position is
 * updated every time the page is scrolled.
 */
function addScrollAnimation() {
    // Listen for new scroll events, here we debounce our `onScroll` function
    document.addEventListener("scroll", createDebounce(onScroll), { passive: true })

    // Update scroll position for first time
    onScroll()
}

/**
 * Adds toggle open/close functionality to the menu button and
 * navigation.
 *
 * Clicking the menu button toggles the "open" class on the menu
 * button and navigation. Clicking on a link in the menu navigation
 * also removes the "open" class from both elements. Clicking anywhere
 * else in the document also removes the "open" class from both
 * elements.
 */
function addMenuActions() {
    const menuButton = document.querySelector(".menu .toggle")
    const menuNavigation = document.querySelector(".menu nav")

    menuButton.addEventListener("click", (e) => {
        e.stopPropagation()
        menuButton.classList.toggle("open")
        menuNavigation.classList.toggle("open")
    })

    menuNavigation.addEventListener("click", (e) => {
        e.stopPropagation()
        // delegate clicks to links only
        if (e.target.closest("a")) {
            menuButton.classList.remove("open")
            menuNavigation.classList.remove("open")
        }
    })

    document.addEventListener("click", (e) => {
         menuButton.classList.remove("open")
        menuNavigation.classList.remove("open")
    })
}