// javascript file for the index page
// update page email address after a short delay
// at least try to filter out some of the bots
window.addEventListener('load', () => {
    window.setTimeout(() => {
        try {
            const email = atob('NDN5ZmdwMTM1QG1vem1haWwuY29t')
            const contactEmail = document.getElementById('contact-email')
            contactEmail.textContent = 'Contact email: '

            const link = document.createElement('a')
            link.href = 'mailto:' + email
            link.textContent = email

            contactEmail.appendChild(link)
        } catch (e) {
            console.error(`Page load event has failed: ${e.message || e}`);
        }
    }, 2000)
})