from celery import Celery
from app.config import settings

celery_app = Celery(
    "aakar_tasks",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.tasks.sync_tasks"]
)

# Optional config for periodic tasks
celery_app.conf.beat_schedule = {
    # Example: 'sync-departments-every-hour': {
    #     'task': 'app.tasks.sync_tasks.pull_department_data',
    #     'schedule': 3600.0,
    # },
}
celery_app.conf.timezone = 'Asia/Kolkata'
