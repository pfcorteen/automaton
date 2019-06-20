function* countUp(start = 0) {
    while (true) {
        start++;
        yield* displayCounter(start);
    }
}
function* displayCounter(counter: number): any {
    const counterSpan = document.querySelector('#counter');
    counterSpan.textContent = String(counter);
    yield; // pause
}
function run(generatorObject: Iterator<void>) {
    if (!generatorObject.next().done) {
        // Add a new task to the event queue
        setTimeout(function () {
            run(generatorObject);
        }, 1000);
    }
}
run(countUp());