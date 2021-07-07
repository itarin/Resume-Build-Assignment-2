code.Time("time");

QuestionsMarks = (str) =>{
    let test, indices, answer;
    answer = true;
    indices = [];
    str = str.split('');
    for (let i = 0; i < str.length; i++) {
        if (/\d/.test(str[i])) {
            let diff = 10 - Number(str[i]);
            for (let j = (i + 1); j < str.length; j++) {
                if (Number(str[j]) == diff) {
                    indices.push([i, j]);
                    break;
                }
            }
        }
    }
    if (indices[0] === undefined) {
        return false;
    }
    for (let index of indices) {
        testStr = str.slice((index[0] + 1), index[1]).join('');
        if (!/\?/.test(testStr)) {
            answer = false;
        }
        else if (testStr.match(/\?/g).length != 3) {
            answer = false;
        }
    }
    return answer;
}

// keep this function call here
QuestionsMarks(readline());
code.timeEnd("timeEnd");
//sourced from coderbytes as I ran out of time
