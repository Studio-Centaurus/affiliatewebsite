$(() => {
  $(".cellHeader").click((event) => {
    $(`.${event.target.id.slice(0, 4)}Cells`).slideToggle("slow");
  });
});
