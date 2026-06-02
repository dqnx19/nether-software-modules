const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");

document.body.appendChild(header);
document.body.appendChild(main);
document.body.appendChild(footer);

header.innerHTML = `
    <div class="app-drawer-wrapper"></div>
    <img src="img/icons/favicon.svg" alt="Logo" class="logo">
`;

footer.innerHTML = `
    <button onclick="showHome()">
        <img src="img/icons/favicon.svg" alt="Home">
    </button>
    <button onclick="showModules()">
        <img src="img/links-icons/modules.svg" alt="Modules">
    </button>
    <button onclick="showAbout()">
        <img src="img/links-icons/about.svg" alt="About">
    </button>
`;

function showHome() {
    document.title = "Nether Software Modules";
    main.innerHTML = `
        <h1>Home</h1>
        <section>
            <div class="grouped-list">
                <button class="item" onclick="showModules()">Modules</button>
            </div>
        </section>
    `;
}

function showModules() {
    document.title = "Modules - Nether Software Modules";
    main.innerHTML = `
        <h1>Modules</h1>
        <section>
            <h2>Visual Studio Code Modules</h2>
            <div class="grouped-list">
                <button class="item" onclick="showVSCodeModule('nether-syntax-highlighting', 'Syntax Highlighting')">Syntax Highlighting</button>
            </div>
        </section>
    `;
}

function showAbout() {
    document.title = "About - Nether Software Modules";
    main.innerHTML = `
        <h1>About</h1>
        <section>
            <h2>Legal</h2>
            <br>
            <ul>
            <li>All programming languages and programs (VS Code, Python etc.) mentioned on this website are the property of their respective owners.</li>
            <li>All modules on this website are property of nether.</li>
            <li>Modules are open-source meaning you can view, modify, and distribute them however you want.</li>
        </section>
    `;
}

function showVSCodeModule(nameLowerCase, NameUpperCase) {
    document.title = `${NameUpperCase} for Visual Studio Code - Nether Software Modules`;
    main.innerHTML = `
        <h1>${NameUpperCase} for Visual Studio Code</h1>
    `;
}

showHome();