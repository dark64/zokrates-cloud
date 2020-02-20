const Stopwatch = () => {
    let now = performance.now();
    return {
        elapsed: () => (performance.now() - now)
    };
}

export default Stopwatch;