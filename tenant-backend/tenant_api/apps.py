from django.apps import AppConfig


class TenantApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tenant_api'

    def ready(self):
        import tenant_api.signals
