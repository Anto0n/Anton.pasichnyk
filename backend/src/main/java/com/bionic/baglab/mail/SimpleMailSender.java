package com.bionic.baglab.mail;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

public class SimpleMailSender implements MailSender {

    private final MailProps mailProps;

    private final Session session = Session.getDefaultInstance(prepareMailProps(), null);

    public SimpleMailSender(MailProps mailProps) {
        this.mailProps = mailProps;
    }

    @Override
    public boolean sendMail(String email, String subject, String body) {
        try {
            MimeMessage message = buildMessage(email, subject, body);
            sendMessage(message);

            return true;
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return false;
        }
    }

    private void sendMessage(MimeMessage message) throws MessagingException {
        Transport transport = session.getTransport("smtp");
        try {
            transport.connect("smtp.gmail.com", mailProps.getSenderEmail(), mailProps.getPassword());
            transport.sendMessage(message, message.getAllRecipients());
        } finally {
            transport.close();
        }
    }

    private MimeMessage buildMessage(String email, String subject, String body) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = new MimeMessage(session);
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setSubject(subject);
        message.setFrom(mailProps.getSenderAddress());
        message.setContent(body, "text/html");
        return message;
    }

    private Properties prepareMailProps() {
        Properties mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");
        mailServerProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        return mailServerProperties;
    }
}
