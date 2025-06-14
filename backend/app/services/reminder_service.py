from datetime import datetime, timezone, timedelta
from app.db.supabase_client import supabase
from app.services.email_service import send_email
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def send_event_reminders():
    """
    Query events starting in REMINDER_LEAD_HOURS ± small window (e.g., within next hour),
    then for each registration send a reminder email.
    """
    now = datetime.now(timezone.utc)
    lead = timedelta(hours=settings.REMINDER_LEAD_HOURS)
    
    # Define window: events starting between (now + lead) and (now + lead + 1 hour)
    window_start = now + lead
    window_end = window_start + timedelta(hours=1)
    
    logger.info(f"Checking for events between {window_start.isoformat()} and {window_end.isoformat()}")
    
    # Fetch events in this window
    res = supabase.table("events")\
        .select("id, title, start_datetime, description, location")\
        .gte("start_datetime", window_start.isoformat())\
        .lt("start_datetime", window_end.isoformat())\
        .execute()
        
    if hasattr(res, 'error') and res.error:
        logger.error(f"Error fetching events for reminders: {res.error.message}")
        return
        
    events = res.data
    logger.info(f"Found {len(events)} events for sending reminders")
    
    for evt in events:
        event_id = evt["id"]
        title = evt["title"]
        start_dt = evt["start_datetime"]
        location = evt.get("location", "")
        
        # Fetch registrations for this event
        reg_res = supabase.table("registrations")\
            .select("email, name")\
            .eq("event_id", event_id)\
            .execute()
            
        if hasattr(reg_res, 'error') and reg_res.error:
            logger.error(f"Error fetching registrations for event {event_id}: {reg_res.error.message}")
            continue
            
        registrations = reg_res.data
        logger.info(f"Found {len(registrations)} registrations for event {event_id}")
        
        for reg in registrations:
            email = reg.get("email")
            name = reg.get("name") or ""
            
            # Compose email content
            subject = f"Reminder: Upcoming event '{title}'"
            
            # Example HTML body
            html_content = f"""
            <p>Hi {name or 'there'},</p>
            <p>This is a reminder that the event <strong>{title}</strong> is scheduled at {start_dt} UTC.</p>
            <p>{f"Location: {location}" if location else ""}</p>
            <p>We look forward to your participation!</p>
            """
            
            send_email(email, subject, html_content)
            logger.info(f"Sent reminder to {email} for event {event_id}")
    
    return len(events) 