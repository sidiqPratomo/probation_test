function oddNumbers(l, r) {
    let oddNumbersArray = [];

    for (let i = l; i <= r; i++) {
        if (i % 2 !== 0) {
            oddNumbersArray.push(i);
        }
    }

    return oddNumbersArray;
}

function main() {
    const l = 1;  
    const r = 10; 
    const result = oddNumbers(l, r);
    console.log(result.join('\n') + '\n');
}

main();