from django.db import models
from django.utils.text import slugify
from dateutil.relativedelta import relativedelta

class Tenant(models.Model):
    tenantId = models.CharField(primary_key=True, db_index=True, max_length=250)
    firstName = models.CharField(max_length=250)
    lastName = models.CharField(max_length=250)
    country = models.CharField(max_length=200, null=True)
    email = models.EmailField(db_index=True, unique=True, max_length=254)
    phone = models.CharField(max_length=250, null=True)
    companyName = models.CharField(max_length=200)
    description = models.CharField(max_length=500, null=True)
    logo = models.ImageField(blank=True, null=True)
    logoTxtImg = models.ImageField(blank=True, null=True)
    logoTxt = models.CharField(max_length=250, blank=True, null=True)
    created_at = models.DateTimeField("created_at", auto_now_add=True)

    def __str__(self):
        return self.tenantId
    
    def save(self, *args, **kwargs):
        if not self.tenantId:
            self.tenantId = slugify(self.companyName)
        super().save(*args, **kwargs)

class Subscription(models.Model):
    tenantId = models.CharField(max_length=250)
    plan = models.CharField(max_length=50)
    startDate = models.DateField()
    endDate = models.DateField()
    termsInMonth = models.IntegerField()
    created_at = models.DateTimeField("created_at", auto_now_add=True)

    def __str__(self):
        return self.tenantId

class Branch(models.Model):
    tenantId = models.CharField(max_length=250)      
    slugName = models.CharField(max_length=250, unique=True)     
    name = models.CharField(max_length=200)        
    imageUrl = models.ImageField(blank=True, null=True)
    email = models.EmailField(db_index=True, unique=True, max_length=254) 
    isMainBranch = models.BooleanField(default=False) 
    address = models.CharField(max_length=250, null=True)   
    state = models.CharField(max_length=250, null=True)  
    country = models.CharField(max_length=250, null=True)  
    postcode = models.CharField(max_length=250, null=True)  
    phone = models.CharField(max_length=250, null=True)  
    isActive = models.BooleanField(default=False)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.slugName
    
    def save(self, *args, **kwargs):
        if not self.slugName:
            self.slugName = slugify(self.name)
        super().save(*args, **kwargs)

class Program(models.Model):
    slugProgramName = models.CharField(max_length=250, unique=True)     
    program = models.CharField(max_length=200)
    price = models.IntegerField()
    startDate = models.DateField()
    programDuration = models.IntegerField()
    endDate = models.DateField()
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.slugProgramName
    
    def save(self, *args, **kwargs):
        if not self.slugProgramName:
            self.slugProgramName = slugify(self.program)
        if self.startDate and self.endDate:
            delta = relativedelta(self.endDate, self.startDate)
            self.programDuration = delta.years * 12 + delta.months
        super().save(*args, **kwargs)

class Customer(models.Model):
    slugName = models.CharField(max_length=250, unique=True)     
    name = models.CharField(max_length=200)
    email = models.EmailField(db_index=True, unique=True, max_length=254)
    phone = models.CharField(max_length=250, null=True)

    def __str__(self):
        return self.slugName
    
    def save(self, *args, **kwargs):
        if not self.slugName:
            self.slugName = slugify(self.name)
        super().save(*args, **kwargs)

class Participation(models.Model):
    slug = models.CharField(max_length=250, unique=True)
    customer = models.CharField(max_length=200)  
    program = models.CharField(max_length=200)
    price = models.IntegerField()
    participationDate = models.DateField()
    startDate = models.DateField()
    programDuration = models.IntegerField()
    endDate = models.DateField()
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.slugProgramName
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.customer + "-" + self.program)
        super().save(*args, **kwargs)

class SurveyEditor(models.Model):
    slug = models.CharField(max_length=250, unique=True)
    labelName = models.CharField(max_length=250)
    labelType = models.CharField(max_length=200)
    options = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.slug
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.labelName + "-" + self.labelType)
        super().save(*args, **kwargs)
