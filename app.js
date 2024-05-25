document.addEventListener('DOMContentLoaded', showSavedClasses);

function openForm() {
    var form = document.getElementById("addForm");
    form.style.display = "block";
}

function addClass() {
    var className = document.getElementById("className").value;
    var sectionName = document.getElementById("sectionName").value;
    var teacherName = document.getElementById("teacherName").value;

    addClassForm(className, sectionName, teacherName);
    saveClassData(className, sectionName, teacherName);

    document.getElementById("className").value = "";
    document.getElementById("sectionName").value = "";
    document.getElementById("teacherName").value = "";
    document.getElementById("addForm").style.display = "none";
}

function addClassForm(className, sectionName, teacherName) {
    var lastSection = document.getElementById("last-section");

    var newForm = document.createElement("div");
    newForm.innerHTML = `
    <div class="card">
        <div class="card-header">
            <h1 class="subject-name">${className}</h1>
            <h2 class="section">${sectionName}</h2>
            <h3 class="teacher-name">${teacherName}</h3>
            <span class="material-icons teacher-icon"> person </span>

        </div>
        <div class="card-body"></div>
        <div class="card-footer">
            <span class="material-icons-outlined assignment-icon">assignment_ind</span>
            <span class="material-icons-outlined folder-icon">folder</span>
            <span class="material-icons-outlined folder-icon" onclick="removeClass(this)">clear</span>

        </div>
    </div>
    `;

    lastSection.appendChild(newForm);
}

function saveClassData(className, sectionName, teacherName) {
    var classData = localStorage.getItem('classData');
    var classes = classData ? JSON.parse(classData) : [];

    var newClass = {
        className: className,
        sectionName: sectionName,
        teacherName: teacherName
    };

    classes.push(newClass);
    localStorage.setItem('classData', JSON.stringify(classes));
}

function showSavedClasses() {
    var classData = localStorage.getItem('classData');
    var classes = classData ? JSON.parse(classData) : [];

    for (var i = 0; i < classes.length; i++) {
        var classInfo = classes[i];
        addClassForm(classInfo.className, classInfo.sectionName, classInfo.teacherName);
    }
}

function removeClass(iconElement) {
    var card = iconElement.closest('.card');
    var className = card.querySelector('.subject-name').textContent;
    var sectionName = card.querySelector('.section').textContent;
    var teacherName = card.querySelector('.teacher-name').textContent;

    // Remove the class from the UI
    card.remove();

    // Remove the class from local storage
    removeClassData(className, sectionName, teacherName);
}

function removeClassData(className, sectionName, teacherName) {
    var classData = localStorage.getItem('classData');
    var classes = classData ? JSON.parse(classData) : [];

    // Find and remove the class from the array
    var indexToRemove = -1;
    for (var i = 0; i < classes.length; i++) {
        var classInfo = classes[i];
        if (
            classInfo.className === className &&
            classInfo.sectionName === sectionName &&
            classInfo.teacherName === teacherName
        ) {
            indexToRemove = i;
            break;
        }
    }

    if (indexToRemove !== -1) {
        classes.splice(indexToRemove, 1);
        localStorage.setItem('classData', JSON.stringify(classes));
    }
}
