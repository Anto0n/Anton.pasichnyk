package com.bionic.baglab.mail;

public interface MailSender {

    boolean sendMail(String email, String subject, String body);
}
