const addticket = document.querySelector(".addbtn");
const modalcontainer = document.querySelector(".modal-cont");
const colobarArr = document.querySelectorAll(".color_modal");
const textcontainer = document.querySelector(".text-cont");
const maincontainer = document.querySelector(".main-cont");
const { randomUUID } = new ShortUniqueId({ length: 6 });
const colorsArray = ["colorb1", "colorb2", "colorb3", "colorb4"];
const deletebtn = document.querySelector(".removebtn");
const actionColors = document.querySelectorAll(".action");
let deleteflag = false;

/*------POP-UP APPEAR-------*/
addticket.addEventListener("click", function () {
    modalcontainer.style.display = "flex";
});

/*------WHEN POP-UP APPEARS THEN ALL FUNCTIONALITY SHOULD START---*/
for (let i = 0; i < colobarArr.length; i++) {
    const currColor = colobarArr[i];
    currColor.addEventListener("click", function (e) {
        for (let i = 0; i < colobarArr.length; i++) {
            colobarArr[i].classList.remove("selected");
        }

        e.target.classList.add("selected");
    });
}

/*-------WRTING THE TASK IN POP UP AND ENTER------*/
textcontainer.addEventListener("keypress", function (event) {
    if (event.key == "Enter" && event.shiftKey == false) { //---silly mistakes ---//
        modalcontainer.style.display = "none";
        const task = textcontainer.value;
        const colorelement = modalcontainer.querySelector(".selected");
        const taskcolor = colorelement.getAttribute("currcolor");
        textcontainer.value = "";
        console.log(task, taskcolor);
        createTicket(task, taskcolor);
    }
});
/*-----function to create ticket----*/
function createTicket(task, taskcolor) {
    const id = randomUUID();
    const ticketcontainer = document.createElement("div");
    ticketcontainer.innerHTML = `<div class="ticket-cont">
          <div class="ticketcolor ${taskcolor}"></div>
          <div class="ticketID">#${id}</div>
          <div class="ticketext">${task}</div>
          <i class="fa-solid fa-lock lock_icon"></i>`
    maincontainer.append(ticketcontainer);

    const lockbtn = ticketcontainer.querySelector(".lock_icon");
    const textaddition = ticketcontainer.querySelector(".ticketext");
    const oscillation = ticketcontainer.querySelector(".ticketcolor");

    handlelockbtn(lockbtn, textaddition);
    handleoscillation(oscillation);
    handledeleteticket(ticketcontainer);
};

/*-----------lock button functionalty----***/
function handlelockbtn(lockbtn, textaddition) {
    lockbtn.addEventListener("click", function () {
        const currclass = lockbtn.classList.contains("fa-lock");
        if (currclass == true) {
            lockbtn.classList.remove("fa-lock");
            lockbtn.classList.add("fa-lock-open");
            textaddition.setAttribute("contenteditable", "true");
        }
        else {
            lockbtn.classList.remove("fa-lock-open");
            lockbtn.classList.add("fa-lock");
            textaddition.setAttribute("contenteditable", "false");
        }
    });
}

/*-----oscilllation function--*/
function handleoscillation(oscillation) {
    oscillation.addEventListener("click", function () {
        const ccolor = oscillation.classList[1];
        const cindx = colorsArray.indexOf(ccolor);

        const newindx = (cindx + 1) % colobarArr.length;
        const nextcol = colorsArray[newindx];
        oscillation.classList.remove(ccolor);
        oscillation.classList.add(nextcol);
    });
};
/*----delete functionality---*/
deletebtn.addEventListener("click", function () {
    if (deleteflag == false) {
        deletebtn.style.color = "red";
        deleteflag = true;
    }
    else {
        deletebtn.style.color = "black";
        deleteflag = false;
    }
});

function handledeleteticket(ticketcontainer) {
    ticketcontainer.addEventListener("click", function () {
        if (deleteflag == true) {
            const check = confirm("DO YOU REALLY WANT TO DELETE");
            if (check) {
                ticketcontainer.remove();
            }
        }
    });
}
/* --- UI for filtering tickets---*/
for (let i = 0; i < actionColors.length; i++) {
    let curactioncolorelem = actionColors[i];
    curactioncolorelem.addEventListener("click", function (e) {
        for (let i = 0; i < actionColors.length; i++) {
            actionColors[i].classList.remove("selected");
        }

        e.target.classList.add("selected");

        const curractioncolor = colorsArray[i];
        filterticket(curractioncolor);
    });
}

/*----------filtering the tickets------*/
function filterticket(curractioncolor) {
    const alltickets = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < alltickets.length; i++) {
        const CurTicket = alltickets[i];
        const colorpresent = CurTicket.querySelector(`.${curractioncolor}`);
        if (colorpresent == null) {
            CurTicket.style.display = "none";
        }
        else {
            CurTicket.style.display = "block";
        }
    }
};
/*---------remove all filters on double click---*/
for (let i = 0; i < actionColors.length; i++) {
    actionColors[i].addEventListener("dblclick", function () {
        for (let i = 0; i < actionColors.length; i++) {
            actionColors[i].classList.remove("selected");
        }
        const alltickets = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < alltickets.length; i++) {
            alltickets[i].style.display = "block";
        }
    });
};
