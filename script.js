let modals = document.querySelectorAll(".modal");
let actions = document.querySelectorAll("[data-action]");
let container = document.querySelector(".cats-container");
let addForm = document.forms.add;
const author = "anton683";

container.innerHTML = "";
cats.forEach(cat => {
container.innerHTML += createCard(cat);                    
})

function createCard(obj) {
    return `
        <div class="cat" data-id="${obj.id}" >
            <i class="${obj.favorite ? "fa-solid" : "fa-regular"} fa-heart cat-like" onclick="setLike(${obj.id},this)"></i>
            <div class="cat-pic" style="background-image: url('${obj.image || "images/default.png"}')" onclick="showModal(${obj.id}, this)" data-action="show"></div>
            <h2 class="cat-name">${obj.name}</h2>
            <div class="cat-rate">
                ${setRate(obj.rate || 0)}
            </div>
            <div class="cat-info">
                <button class="btn" onclick="showModal(${obj.id}, this)" data-action="show">
                    <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    `;
}

actions.forEach(btn => {
    btn.addEventListener("click", () => {
            Array.from(modals).find(m => m.dataset.type === btn.dataset.action).classList.add("active");
        })
    })

// ---------- close modal window ------------------
modals.forEach(openedModal => {
    function closeModal() {
      openedModal.classList.remove("active");
      addForm.reset();                              
    }        
            let closeOnBtn = openedModal.querySelector(".modal-close");
            closeOnBtn.addEventListener("click", () => {
                closeModal()
            })
            window.addEventListener("mousedown", (e) => {
                if (e.target === openedModal) {
                  closeModal();
                }
            })
            window.addEventListener("keydown", (e) => {
                if (e.keyCode === 27) {
                  closeModal();
                }
            })
    })
// -----------------------------------------

function setLike(id, el) {
    console.log(id);
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");
                cats = cats.map(cat => {
                    if (cat.id === id) {
                        cat.favorite = el.classList.contains("fa-solid")
                    }
                    return cat;
                });
        };

function setRate(n) {
    let html = "";
    for (let i = 0; i < n ; i++) {
        html += "<i class=\"fa-solid fa-star\"></i>"
    }
    for (let i = n; i < 10; i++) {
        html += "<i class=\"fa-regular fa-star\"></i>"
    }
    return html;
}

function setAge(n) {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return n + " год";
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return n + " года";
        }
        return n + " лет";
    }
    return n + " лет";
}

function showModal(id, el) {
    let m = Array.from(modals).find(m => m.dataset.type === el.dataset.action);
    m.classList.add("active");
    let content = m.querySelector(".modal-cat")
    let cat = cats.find(cat => cat.id === id);
    content.innerHTML = `
        <div class="cat-text">
            <h2>${cat.name}</h2>
            <div>${ cat.age > 0 ? setAge(cat.age) : "Возраст не указан"}</div>
            <div>${cat.description || "Информации пока нет..."}</div>
        </div>
        <img src=${cat.image || "images/default.png"} alt="${cat.name}">
    `
};

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let body = {};
    for (let i = 0; i < addForm.elements.length; i++) {
        let inp = addForm.elements[i];
        if (inp.name) {
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            } else {
                body[inp.name] = inp.value;
            }
        }
    }
    body.id = +body.id;
    console.log("add", body);
                cats.push(body);
                container.innerHTML = "";
                cats.forEach(cat => {
                    container.innerHTML += createCard(cat);
                })
                addForm.reset()
                Array.from(modals).find(m => m.dataset.type === "add").classList.remove("active");
})