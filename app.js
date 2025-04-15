fetch('app.json')
    .then(response => response.json())
    .then(apps =>{

        const grid = document.getElementById("appGrid");

        apps.forEach(app => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
            <a href="${app.url}" target="_blank">${app.name}</a>
            <p><strong>Version:</strong> ${app.version}</p>
            <p><strong>Developer:</strong> ${app.developer}</p>
            <p><strong>Category:</strong> ${app.category}</p>
            <p><strong>Release Date:</strong> ${app.releaseDate}</p>
            <p class="desc">${app.description}</p>
        `;

      grid.appendChild(card);
    });
})