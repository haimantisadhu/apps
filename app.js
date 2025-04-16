const colors = ["#e0f7fa", "#f1f8e9", "#fff3e0", "#fce4ec", "#ede7f6"]; // constant pastel palette

function appTemplate(app, index) {
  return {
    tag: "div",
    className: "card",
    style: { backgroundColor: colors[index % colors.length] }, // pick color by index
    children: [
      {
        tag: "a",
        text: app.name,
        attributes: { href: app.url, target: "_blank" }
      },
      { tag: "p", text: `Version: ${app.version}` },
      { tag: "p", text: `Developer: ${app.developer}` },
      { tag: "p", text: `Category: ${app.category}` },
      { tag: "p", text: `Release Date: ${app.releaseDate}` },
      { tag: "p", text: app.description, className: "desc" }
    ]
  };
}

fetch('app.json')
  .then(res => res.json())
  .then(appData => {
    const container = document.getElementById("app-container");

    appData.applications.forEach((app, index) => {
      const template = appTemplate(app, index);

      const card = document.createElement(template.tag);
      if (template.className) card.className = template.className;

      // apply consistent color
      if (template.style && template.style.backgroundColor) {
        card.style.backgroundColor = template.style.backgroundColor;
      }

      template.children.forEach(child => {
        const el = document.createElement(child.tag);
        el.textContent = child.text;

        if (child.className) el.className = child.className;

        if (child.attributes) {
          Object.entries(child.attributes).forEach(([attr, val]) =>
            el.setAttribute(attr, val)
          );
        }

        card.appendChild(el);
      });

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
