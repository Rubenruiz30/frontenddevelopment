const API_URL = "http://localhost:8081/products";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const productForm = document.getElementById("productForm");

const message = document.getElementById("message");
const tableBody = document.getElementById("productTableBody");

const panelTitle = document.getElementById("panelTitle");
const welcomeText = document.getElementById("welcomeText");
const permissionsBox = document.getElementById("permissionsBox");
const createProductSection = document.getElementById("createProductSection");

const pageInfo = document.getElementById("pageInfo");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

let currentUser = null;
let currentRole = null;

let currentPage = 0;
let pageSize = 20;
let totalPages = 0;

let currentSearchType = "";
let currentSearchValue = "";

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    currentUser = username;
    currentRole = role;

    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    showDashboard();
});

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (currentRole !== "ADMIN") {
        showMessage("No tienes permisos para crear productos", "error");
        return;
    }

    const product = {
        name: document.getElementById("name").value,
        size: document.getElementById("size").value,
        price: document.getElementById("price").value,
        stock: parseInt(document.getElementById("stock").value)
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error HTTP:", response.status);
                console.error("Respuesta del servidor:", errorText);
                throw new Error("Error al guardar el producto");
            }

            return response.json();
        })
        .then(() => {
            showMessage("Producto guardado correctamente", "success");
            productForm.reset();

            currentSearchType = "";
            currentSearchValue = "";
            document.getElementById("searchValue").value = "";
            document.getElementById("searchType").value = "id";

            loadProducts(0);
        })
        .catch(error => {
            console.error(error);
            showMessage("Error al guardar el producto. Mira la consola del navegador.", "error");
        });
});

function showDashboard() {
    loginSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");

    welcomeText.textContent = "Bienvenido, " + currentUser;

    if (currentRole === "ADMIN") {
        panelTitle.textContent = "Panel de Administrador";
        createProductSection.classList.remove("hidden");

        permissionsBox.textContent = "Permisos de administrador: puedes crear, ver, buscar y eliminar productos.";
        permissionsBox.className = "permissions-box admin";

        document.querySelectorAll(".admin-column").forEach(column => {
            column.style.display = "table-cell";
        });

    } else {
        panelTitle.textContent = "Panel de Usuario Normal";
        createProductSection.classList.add("hidden");

        permissionsBox.textContent = "Permisos de usuario normal: solo puedes ver y buscar productos.";
        permissionsBox.className = "permissions-box user";

        document.querySelectorAll(".admin-column").forEach(column => {
            column.style.display = "none";
        });
    }

    loadProducts(0);
}

function loadProducts(page = 0) {
    currentSearchType = "";
    currentSearchValue = "";
    currentPage = page;

    const url = `${API_URL}?page=${currentPage}&size=${pageSize}`;

    fetch(url)
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error HTTP:", response.status);
                console.error("Respuesta del servidor:", errorText);
                throw new Error("Error al cargar productos");
            }

            return response.json();
        })
        .then(pageData => {
            renderPage(pageData);
        })
        .catch(error => {
            console.error(error);
            showMessage("Error al cargar productos. Comprueba que Spring Boot está arrancado.", "error");
        });
}

function searchProduct(page = 0) {
    const searchType = document.getElementById("searchType").value;
    const searchValue = document.getElementById("searchValue").value.trim();

    if (searchValue === "") {
        showMessage("Introduce un valor para buscar", "error");
        return;
    }

    currentSearchType = searchType;
    currentSearchValue = searchValue;
    currentPage = page;

    const url = `${API_URL}/search?type=${encodeURIComponent(searchType)}&value=${encodeURIComponent(searchValue)}&page=${currentPage}&size=${pageSize}`;

    fetch(url)
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error HTTP:", response.status);
                console.error("Respuesta del servidor:", errorText);
                throw new Error("Error al buscar productos");
            }

            return response.json();
        })
        .then(pageData => {
            renderPage(pageData);

            if (pageData.totalElements === 0) {
                showMessage("No se encontraron productos", "error");
            } else {
                showMessage("Productos encontrados: " + pageData.totalElements, "success");
            }
        })
        .catch(error => {
            console.error(error);
            showMessage("Error al buscar productos. Revisa que exista /products/search en Spring Boot.", "error");
        });
}

function clearSearch() {
    document.getElementById("searchValue").value = "";
    document.getElementById("searchType").value = "id";

    currentSearchType = "";
    currentSearchValue = "";

    loadProducts(0);
    showMessage("Búsqueda limpiada", "success");
}

function renderPage(pageData) {
    totalPages = pageData.totalPages;
    currentPage = pageData.number;

    renderProducts(pageData.content);
    updatePagination();
}

function renderProducts(products) {
    tableBody.innerHTML = "";

    if (!products || products.length === 0) {
        const colspan = currentRole === "ADMIN" ? 6 : 5;

        tableBody.innerHTML = `
            <tr>
                <td colspan="${colspan}" class="empty">No hay productos disponibles</td>
            </tr>
        `;
        return;
    }

    products.forEach(product => {
        const deleteButton = currentRole === "ADMIN"
            ? `<td>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">
                        Eliminar
                    </button>
               </td>`
            : "";

        tableBody.innerHTML += `
            <tr>
                <td><span class="badge">${product.id}</span></td>
                <td>${product.name}</td>
                <td>${product.size}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                ${deleteButton}
            </tr>
        `;
    });
}

function updatePagination() {
    if (!pageInfo || !prevPageBtn || !nextPageBtn) {
        return;
    }

    if (totalPages === 0) {
        pageInfo.textContent = "Página 0 de 0";
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = true;
        return;
    }

    pageInfo.textContent = `Página ${currentPage + 1} de ${totalPages}`;

    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = currentPage >= totalPages - 1;
}

function nextPage() {
    if (currentPage >= totalPages - 1) {
        return;
    }

    if (currentSearchValue !== "") {
        searchProduct(currentPage + 1);
    } else {
        loadProducts(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage <= 0) {
        return;
    }

    if (currentSearchValue !== "") {
        searchProduct(currentPage - 1);
    } else {
        loadProducts(currentPage - 1);
    }
}

function deleteProduct(id) {
    if (currentRole !== "ADMIN") {
        showMessage("No tienes permisos para eliminar productos", "error");
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error HTTP:", response.status);
                console.error("Respuesta del servidor:", errorText);
                throw new Error("Error al eliminar producto");
            }

            showMessage("Producto eliminado correctamente", "success");

            if (currentSearchValue !== "") {
                searchProduct(currentPage);
            } else {
                loadProducts(currentPage);
            }
        })
        .catch(error => {
            console.error(error);
            showMessage("Error al eliminar producto", "error");
        });
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;

    setTimeout(() => {
        message.className = "message";
        message.textContent = "";
    }, 3500);
}

function logout() {
    localStorage.clear();
    currentUser = null;
    currentRole = null;

    dashboardSection.classList.add("hidden");
    loginSection.classList.remove("hidden");

    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="empty">Pulsa “Cargar productos”</td>
        </tr>
    `;
}

function checkSession() {
    const savedUser = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");

    if (savedUser && savedRole) {
        currentUser = savedUser;
        currentRole = savedRole;
        showDashboard();
    }
}

checkSession();