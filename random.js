const url = 'https://script.google.com/macros/s/AKfycbxR4KrHZVka7by0IXuYdu8Qk83qEMQus0rFfsqRe9xRaZbVRZA/exec';

var _gas = new GAS(url)
window.onload = () => {
    _gas.crud('READ', 'row', 
        {
            sheetName: 'Browser Created Sheet',
            _Id: 'Ez6J_jtx7l6y8'
        }
        ).then( payload => {
            arrayManipulator(payload);
    })
}

const update = (data) => {
    _gas.crud('UPDATE', 'row', 
    {
        sheetName: 'Browser Created Sheet',
        _Id: 'Ez6J_jtx7l6y8',
        content: data
    }
    ).then( payload => {
        console.log("Emilys payload: ", payload);
    })
}

const arrayManipulator = (data) => {

    let waitingArray = data.waiting.split(",");

    const selected = [];
    let randNum1 = Math.floor(Math.random()*waitingArray.length);
    let driveChoice = waitingArray[randNum1];
    waitingArray.splice(randNum1, 1);
    selected.push(driveChoice);
    driver.innerHTML = selected[0];

    let randNum2 = Math.floor(Math.random()*waitingArray.length);
    let navChoice = waitingArray[randNum2];
    waitingArray.splice(randNum2, 1);
    selected.push(navChoice);  
    navi.innerHTML = selected[1];
    
    let usedArray = data.used.split(",");
    
    usedArray.push(selected);
    data.waiting = waitingArray.join(",");
    data.used = usedArray.join(",");

    if (data.waiting == "") {
        data.waiting = data.allStudents;
        data.used = "'";
    }

    update(data);
}