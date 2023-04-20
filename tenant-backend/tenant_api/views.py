from django.shortcuts import render
from .models import Tenant, Subscription, Branch, Program, Participation, Customer, SurveyEditor
from .serializers import CreateUserSerializer, UserSerializer, TenantTableSerializer, SubscriptionTableSerializer, BranchTableSerializer, ProgramTableSerializer, CustomerTableSerializer, ParticipationTableSerializer, SurveyEditorTableSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth import authenticate, login

class StandardPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = Response(status=status.HTTP_205_RESET_CONTENT)
            response = JsonResponse({'message': 'You have been logged out.'})
            response['Access-Control-Allow-Credentials'] = 'true'
            response['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, withCredentials'
            return response
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            ss = UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': ss.data,
            })

        return Response({'error': 'Invalid Credentials'}, status=401)
    
class TenantView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Tenant.objects.all().order_by('-created_at')
    serializer_class = TenantTableSerializer
    pagination_class = StandardPagination
    #all
    def list(self, request):
        queryset = Tenant.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TenantTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TenantTableSerializer(queryset, many=True)
        return Response(serializer.data)

    #specific id
    def retrieve(self, request, pk=None):
        try:
            user = Tenant.objects.get(tenantId=pk)
        except Tenant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TenantTableSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = TenantTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = Tenant.objects.get(tenantId=pk)
        except Tenant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TenantTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SubscriptionView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Subscription.objects.all().order_by('-created_at')
    serializer_class = SubscriptionTableSerializer
    pagination_class = StandardPagination
    #all
    def list(self, request):
        queryset = Subscription.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = SubscriptionTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SubscriptionTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SubscriptionTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TenantIdView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Tenant.objects.all().order_by('-created_at')
    serializer_class = TenantTableSerializer
    #all
    def list(self, request):
        queryset = Tenant.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TenantTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TenantTableSerializer(queryset, many=True)
        return Response(serializer.data)
    
class BranchView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Branch.objects.all().order_by('-created_at')
    serializer_class = BranchTableSerializer
    pagination_class = StandardPagination
    #all
    def list(self, request):
        queryset = Branch.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = BranchTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = BranchTableSerializer(queryset, many=True)
        return Response(serializer.data)

    #specific id
    def retrieve(self, request, pk=None):
        try:
            user = Branch.objects.get(id=pk)
        except Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BranchTableSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = BranchTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = Branch.objects.get(id=pk)
        except Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BranchTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            user = Branch.objects.get(id=pk)
        except Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProgramView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Program.objects.all().order_by('-created_at')
    serializer_class = ProgramTableSerializer
    #all
    def list(self, request):
        queryset = Program.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProgramTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProgramTableSerializer(queryset, many=True)
        return Response(serializer.data)

    #specific id
    def retrieve(self, request, pk=None):
        try:
            user = Program.objects.get(id=pk)
        except Program.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ProgramTableSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProgramTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = Program.objects.get(id=pk)
        except Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ProgramTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            user = Program.objects.get(id=pk)
        except Program.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ParticipationView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Participation.objects.all().order_by('-created_at')
    serializer_class = ParticipationTableSerializer
    #all
    def list(self, request):
        queryset = Participation.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ParticipationTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ParticipationTableSerializer(queryset, many=True)
        return Response(serializer.data)

    #specific id
    def retrieve(self, request, pk=None):
        try:
            user = Participation.objects.get(id=pk)
        except Participation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ParticipationTableSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = ParticipationTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = Participation.objects.get(id=pk)
        except Branch.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ParticipationTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            user = Participation.objects.get(id=pk)
        except Participation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CustomerView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CustomerTableSerializer
    #all
    def list(self, request):
        queryset = Customer.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CustomerTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CustomerTableSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            if pk.isnumeric():  # if pk is numeric, treat it as an ID
                user = Customer.objects.get(id=pk)
            else:  # if pk is not numeric, treat it as a name
                user = Customer.objects.get(name=pk)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerTableSerializer(user)
        return Response(serializer.data)
    
class SurveyEditorView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = SurveyEditor.objects.all().order_by('-created_at')
    serializer_class = SurveyEditorTableSerializer
    #all
    def list(self, request):
        queryset = SurveyEditor.objects.all().order_by('updated_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = SurveyEditorTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SurveyEditorTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SurveyEditorTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateOrderView(APIView):
    def put(self, request, format=None):
        item_ids = request.data
        items = []
        for item_id in item_ids:
            try:
                item = SurveyEditor.objects.get(id=item_id)
                items.append(item)
            except SurveyEditor.DoesNotExist:
                pass
        for index, item in enumerate(items):
            item.order = index
            item.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
