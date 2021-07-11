const blacklistedRefs = ["Click and Register", "N/A"];

document.querySelector(".content").addEventListener("click", (e) => {
    if (e.target.type === "textarea") {
        if (!blacklistedRefs.includes(e.target.innerHTML)) {
            e.target.select();
            document.execCommand("copy");
        }
    }
});
