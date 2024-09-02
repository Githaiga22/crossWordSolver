function crosswordSolver(emptyPuzzle,words){


}

function checkDouble(words){
    let j=1
    for (let i=0; i<words.length-1;){
        for (;j<words.length;){
            if (words[i] === words[j]){
                return "Error"
            }
            j++
        }
        j = i+2
        i++
    }
}


// let words = ['casa', 'alan', 'ciao', 'anta','casa']
// console.log(checkDouble(words))