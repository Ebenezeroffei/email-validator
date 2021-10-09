from django.shortcuts import render
from django.views import generic
from django.contrib import messages
from django.contrib.auth import authenticate
from django.urls import reverse
from django.http import HttpResponseRedirect,JsonResponse
from django.contrib.auth import login
from .models import Email

# Create your views here.
class EmailsListView(generic.ListView):
    model = Email
    template_name = 'app/index.html'
    context_object_name = 'emails'


class SignInAdminView(generic.View):
    template_name = 'app/signin.html'

    def get(self,request):
        print("Get")
        return render(request,self.template_name)

    def post(self,request):
        # Get username and password
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username and password:
            # Authenticate User
            user = authenticate(username = username,password = password)
            if user is not None and user.is_superuser:
                login(request,user) # Login admin
                return HttpResponseRedirect(reverse('app:home')) # redirect admin
            else:
                print("No user")
                messages.error(request,"Enter a valid admin username and/or password.")
            

        return render(request,self.template_name)


class AddEmailView(generic.View):
    def post(self,request):
        email = request.POST.get('email')
        # Check if email is already present
        if not Email.objects.filter(email = email):
            # Create instance and save into the database
            new_email = Email(email = email)
            new_email.save()
            return JsonResponse({'status':'success'})
        return JsonResponse({'status':'duplicate'})
            
