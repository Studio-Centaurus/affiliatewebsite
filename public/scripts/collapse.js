// let eventAccess = false;

$(() => {
    $(".cellHeader").click((event) => {
        $(`.${event.target.id.slice(0, 4)}Cells`).slideToggle("slow");
    });
    // setTimeout(() => {
    //     eventAccess = true;
    // }, 300);
});

// function changeModal() {
//     if (innerWidth <= 1200) {
//         document.querySelector(".ReactModal__Content").style.width = "80%";
//     } else {
//         document.querySelector(".ReactModal__Content").style.width = "80%";
//     }
// }

// addEventListener("resize", () => {
//     if (document.querySelector(".ReactModal__Content")) {
//         changeModal();
//     }
// });
// document.addEventListener(
//     "DOMNodeInserted",
//     function (e) {
//         if (eventAccess) {
//             setTimeout(() => {
//                 changeModal();
//             }, 0);
//         }
//     },
//     false
// );
// console.log("bro");
