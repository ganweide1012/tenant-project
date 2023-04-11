from django.db.models.signals import post_save
from django.dispatch import receiver
from tenant_api.models import Program, Participation
from dateutil.relativedelta import relativedelta

@receiver(post_save, sender=Program)
def update_participation(sender, instance, **kwargs):
    participations = Participation.objects.filter(program=instance.program)
    for participation in participations:
        participation.price = instance.price
        participation.startDate = instance.startDate
        participation.endDate = participation.participationDate + relativedelta(months=instance.programDuration)
        participation.programDuration = instance.programDuration
        participation.save()
