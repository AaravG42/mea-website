from fastapi import APIRouter, Depends, HTTPException
from app.core.security import verify_admin_key
from app.services.reminder_service import send_event_reminders
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/reminders", tags=["reminders"])

@router.post("/send", dependencies=[Depends(verify_admin_key)])
async def trigger_reminders():
    """
    Trigger sending reminder emails for upcoming events.
    Protected by ADMIN_API_KEY header.
    """
    try:
        # Run reminder logic
        events_count = send_event_reminders()
        return {"detail": f"Reminders triggered for {events_count} events"}
    except Exception as e:
        logger.error(f"Error triggering reminders: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send reminders") 