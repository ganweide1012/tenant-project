from django.urls import path, include
from .views import LogoutView, RegisterView, LoginView, TenantView, SubscriptionView, TenantIdView, BranchView, ProgramView, ParticipationView, CustomerView, SurveyEditorView, UpdateOrderView, SurveySectionView
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

route = routers.DefaultRouter()
route.register("", TenantView, basename='userinputview')

route2 = routers.DefaultRouter()
route2.register("", SubscriptionView, basename='subscriptionview')

route3 = routers.DefaultRouter()
route3.register("", TenantIdView, basename='userinputview')

route4 = routers.DefaultRouter()
route4.register("", BranchView, basename='branchview')

route5 = routers.DefaultRouter()
route5.register("", ProgramView, basename='programview')

route6 = routers.DefaultRouter()
route6.register("", ParticipationView, basename='participationview')

route7 = routers.DefaultRouter()
route7.register("", CustomerView, basename='customerview')

route8 = routers.DefaultRouter()
route8.register("", SurveyEditorView, basename='surveyeditorview')

route9 = routers.DefaultRouter()
route9.register("", SurveySectionView, basename='sectionview')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('tenants/', include(route.urls)),
    path('subscription/', include(route2.urls)),
    path('tenantId/', include(route3.urls)),
    path('branch/', include(route4.urls)),
    path('program/', include(route5.urls)),
    path('participation/', include(route6.urls)),
    path('customer/', include(route7.urls)),
    path('survey/', include(route8.urls)),
    path('update_order/', UpdateOrderView.as_view(), name="update_order"),
    path('section/', include(route9.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

