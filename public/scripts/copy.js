const blacklistedRefs = ["Click and Register", "N/A"];

setTimeout(() => {
    document.querySelectorAll(".cellRef").forEach((e) => {
        e.addEventListener("click", (e) => {
            const target = e.target;
            if (blacklistedRefs.indexOf(target.innerHTML) === -1) {
                target.select();
                document.execCommand("copy");
            }
        });
    });
}, 1000);
