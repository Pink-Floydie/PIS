# Create your views here.
from django.shortcuts import render, redirect
from .models import Article
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

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

def register(request):
    if request.method == "POST":
        form = {
            "username": request.POST.get("username", "").strip(),
            "email": request.POST.get("email", "").strip(),
            "password": request.POST.get("password", "").strip(),
        }

        if not form["username"] or not form["email"] or not form["password"]:
            form["errors"] = "Не все поля заполнены"
            return render(request, "register.html", {"form": form})

        if User.objects.filter(username=form["username"]).exists():
            form["errors"] = "Пользователь с таким логином уже существует"
            return render(request, "register.html", {"form": form})

        User.objects.create_user(form["username"], form["email"], form["password"])

        return redirect("archive")

    return render(request, "register.html", {"form": {"username": "", "email": "", "password": ""}})

def login_view(request):
    if request.method == "POST":
        form = {
            "username": request.POST.get("username", "").strip(),
            "password": request.POST.get("password", "").strip(),
        }

        if not form["username"] or not form["password"]:
            form["errors"] = "Не все поля заполнены"
            return render(request, "login.html", {"form": form})

        user = authenticate(username=form["username"], password=form["password"])
        if user is None:
            form["errors"] = "Неверный логин или пароль"
            return render(request, "login.html", {"form": form})

        login(request, user)

        return redirect("archive")

    return render(request, "login.html", {"form": {"username": "", "password": ""}})