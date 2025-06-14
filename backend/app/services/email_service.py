from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, html_content: str, plain_text: str | None = None):
    """
    Send an email using SendGrid.
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML content of the email
        plain_text: Optional plain text version of the email
        
    Returns:
        None
    """
    message = Mail(
        from_email=Email(settings.EMAIL_FROM),
        to_emails=To(to_email),
        subject=subject,
        html_content=html_content,
    )
    
    # Optionally set plain text
    if plain_text:
        message.add_content(Content("text/plain", plain_text))
        
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        logger.info(f"Email sent to {to_email}, status_code={response.status_code}")
    except Exception as e:
        logger.error(f"Error sending email to {to_email}: {e}")
        
# Optional: Add a function to send emails using SendGrid templates
def send_template_email(to_email: str, template_id: str, dynamic_data: dict):
    """
    Send an email using a SendGrid dynamic template.
    
    Args:
        to_email: Recipient email address
        template_id: SendGrid template ID
        dynamic_data: Dictionary of dynamic data to populate the template
        
    Returns:
        None
    """
    message = Mail(
        from_email=Email(settings.EMAIL_FROM),
        to_emails=To(to_email),
    )
    message.template_id = template_id
    message.dynamic_template_data = dynamic_data
    
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        logger.info(f"Template email sent to {to_email}, status_code={response.status_code}")
    except Exception as e:
        logger.error(f"Error sending template email to {to_email}: {e}") 