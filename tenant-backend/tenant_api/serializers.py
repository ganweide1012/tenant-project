from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tenant, Subscription, Branch, Customer, Participation, Program, SurveyEditor, Section

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TenantTableSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False)
    logoTxtImg = serializers.ImageField(required=False)
    tenantId = serializers.CharField(required=False)

    class Meta:
        model = Tenant
        fields = ['tenantId', 'firstName', 'lastName', 'country', 'email', 'phone', 'companyName', 'description', 'logo', 'logoTxtImg', 'logoTxt']

class SubscriptionTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['tenantId', 'plan', 'startDate', 'endDate', 'termsInMonth']

class BranchTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'tenantId', 'name', 'imageUrl', 'email', 'isMainBranch', 'address', 'state', 'country', 'postcode', 'phone', 'isActive']

class ProgramTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'program', 'price', 'programDuration', 'startDate', 'endDate']

class CustomerTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'email', 'phone']

class ParticipationTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ['id', 'customer', 'program', 'price', 'participationDate', 'startDate', 'programDuration', 'endDate']

class SurveyEditorTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyEditor
        fields = ['id', 'labelName', 'labelType', 'options']

class SectionTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'labelName', 'labelType', 'labelSection']
