$(() => {
  $(".cellHeader").click((event) => {
    $(`.${event.target.id.slice(0, 4)}Cells`).slideToggle("slow");
  });
});

function testing123() {
  console.log("test");
}
