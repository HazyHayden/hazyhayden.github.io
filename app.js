function onLoad() {
    removeLoader();
    object();
}

function removeLoader() {
    let loader = document.querySelector('.loader');
    loader.style.display = 'none';
}

function navExpand() {
    let checkbox = document.getElementById('menu-btn');
    let hamburger = document.getElementById('hamburger-btn');
    if (checkbox.checked == false) {
        checkbox.checked = true;
        hamburger.className = 'nav__hamburger nav__hamburger__expanded';
    } else {
        checkbox.checked = false;
        hamburger.className = 'nav__hamburger';
    }
}


// For each day in the workout
//     for each exercise in day
//         have name as h2 element
//         if exercise has a dropset:
//             state info sets reps weight and dropset
//         else:
//             state info sets reps and weight

function object() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => insertData(data));

    function insertData(workout) {
        for (day in workout) { // workout > Day1 {...
            document.getElementById(`${day}__title`).innerHTML = workout[day].name;
            for (e in workout[day]) {
                let exercise = workout[day][e];
                const div = document.createElement('div');
                div.className = `exercise ${day}__${e}`;
                if (div.className == `exercise ${day}__name`) { 
                    // Dont make divs for non-exercises
                    continue;
                }
                // Choosing BG Color
                if (e % 2 == 0) {
                    div.style.setProperty('--clr-section-color', 'var(--clr-light)');
                    div.style.setProperty('--clr-text', 'var(--clr-dark)');
                } else {
                    div.style.setProperty('--clr-section-color', 'var(--clr-dark)');
                    div.style.setProperty('--clr-text', 'var(--clr-light)');
                }

                // Adding Content
                if (exercise.dropset == true) {
                    div.innerHTML = `
                    <h3><input type="checkbox" id="${exercise.name}-cb" /><label for="${exercise.name}-cb">${exercise.name}</label></h3>
                    <p>${exercise.info}</p><br>
                    <p>I do ${exercise.sets} sets of ${exercise.reps} reps with a weight of ${exercise.weight}. <u>Dropset</u> the final set.</p>
                    `
                } else {
                    div.innerHTML = `
                    <h3><input type="checkbox" id="${exercise.name}-cb" /><label for="${exercise.name}-cb">${exercise.name}</label></h3>
                    <p>${exercise.info}</p><br>
                    <p>I do ${exercise.sets} sets of ${exercise.reps} reps with a weight of ${exercise.weight}.</p>
                    `
                }
                document.getElementById(day).appendChild(div);
            }
        }
    }
}