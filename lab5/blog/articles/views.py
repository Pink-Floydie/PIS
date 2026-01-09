# Create your views here.
from django.shortcuts import render, redirect
from .models import Article
from django.http import Http404
def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"article": post})
    except Article.DoesNotExist:
        raise Http404

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def create_post(request):
    if request.user.is_anonymous:
        raise Http404

    if request.method == "POST":
        form = {
            'title': request.POST.get("title", "").strip(),
            'text': request.POST.get("text", "").strip(),
        }

        # 1) проверка пустых полей
        if not form["title"] or not form["text"]:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'create_post.html', {'form': form})

        if Article.objects.filter(title=form["title"]).exists():
            form['errors'] = "Статья с таким названием уже существует"
            return render(request, 'create_post.html', {'form': form})

        # 3) создаём запись
        article = Article.objects.create(
            title=form["title"],
            text=form["text"],
            author=request.user
        )
        return redirect('get_article', article_id=article.id)

    # GET — показать пустую форму
    return render(request, 'create_post.html', {'form': {'title': '', 'text': ''}})

