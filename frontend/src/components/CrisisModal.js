import React, { useState } from 'react';
import '../styles/CrisisModal.css';

function CrisisModal({ crisisAlert, onClose }) {
  const [expanded, setExpanded] = useState(true);

  if (!crisisAlert || !expanded) {
    return null;
  }

  return (
    <div className="crisis-modal-overlay">
      <div className="crisis-modal">
        <div className="crisis-modal-header">
          <h2>🆘 Crisis Support Available</h2>
          <button 
            className="crisis-modal-close"
            onClick={() => setExpanded(false)}
            aria-label="Close crisis modal"
          >
            ✕
          </button>
        </div>

        <div className="crisis-modal-content">
          <div className="crisis-message">
            <p className="crisis-validation">
              {crisisAlert.message || 
                "I can see you're struggling deeply, and I want you to know: you do not have to go through this alone. Professional support can help."}
            </p>
          </div>

          <div className="crisis-actions">
            <div className="action-group">
              <h3>📞 Emergency Contacts</h3>
              <div className="contact-list">
                {crisisAlert.emergencyContacts && (
                  <>
                    {crisisAlert.emergencyContacts.helpline && (
                      <div className="contact-item">
                        <span className="contact-label">National Helpline:</span>
                        <a href={`tel:${crisisAlert.emergencyContacts.helpline.replace(/\D/g, '')}`} 
                           className="contact-link">
                          {crisisAlert.emergencyContacts.helpline}
                        </a>
                      </div>
                    )}
                    {crisisAlert.emergencyContacts.crisis && (
                      <div className="contact-item">
                        <span className="contact-label">Crisis Text Line:</span>
                        <a href="sms:741741" className="contact-link">
                          Text HOME to 741741
                        </a>
                      </div>
                    )}
                    {crisisAlert.emergencyContacts.emergency && (
                      <div className="contact-item emergency">
                        <span className="contact-label">Immediate Danger:</span>
                        <a href="tel:911" className="contact-link emergency-link">
                          {crisisAlert.emergencyContacts.emergency}
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="action-group">
              <h3>🔗 Professional Resources</h3>
              <div className="resources-list">
                {crisisAlert.resources && crisisAlert.resources.length > 0 ? (
                  crisisAlert.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {resource.name}
                      <span className="external-icon">↗</span>
                    </a>
                  ))
                ) : (
                  <>
                    <a
                      href="https://suicidepreventionlifeline.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      National Suicide Prevention Lifeline ↗
                    </a>
                    <a
                      href="https://www.crisistextline.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      Crisis Text Line ↗
                    </a>
                    <a
                      href="https://www.samhsa.gov/find-help/helpline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      SAMHSA National Helpline ↗
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="crisis-note">
              <p>
                <strong>Important:</strong> If you are in immediate danger, please call 911 or go to your nearest emergency room. 
                You deserve support and help is available right now.
              </p>
            </div>
          </div>

          <div className="crisis-modal-footer">
            <button
              className="crisis-action-btn primary"
              onClick={onClose}
            >
              I'm Safe, Take Me Back
            </button>
            <button
              className="crisis-action-btn secondary"
              onClick={() => setExpanded(false)}
            >
              Minimize
            </button>
          </div>
        </div>
      </div>

      {!expanded && (
        <button
          className="crisis-minimize-btn"
          onClick={() => setExpanded(true)}
          title="Open crisis support"
        >
          🆘 Crisis Support
        </button>
      )}
    </div>
  );
}

export default CrisisModal;
