var foldBtns = document.getElementsByClassName("fold-button");

for (var i = 0; i < foldBtns.length; i++) {
  foldBtns[i].addEventListener("click", function (e) {
    // ищем родителя-пост с классом one-post
    var post = e.target.closest(".one-post");
    if (!post) return;

    // переключаем класс folded у поста
    post.classList.toggle("folded");

    // меняем текст кнопки
    if (post.classList.contains("folded")) {
      e.target.textContent = "развернуть";
    } else {
      e.target.textContent = "свернуть";
    }
  });
}