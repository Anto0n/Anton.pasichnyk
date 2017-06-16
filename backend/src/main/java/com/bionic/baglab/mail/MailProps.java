package com.bionic.baglab.mail;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.UnsupportedEncodingException;

public class MailProps {

    private String senderEmail;
    private String password;
    private String senderPersonal;

    public String getSenderEmail() {
        return senderEmail;
    }

    public MailProps setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public MailProps setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getSenderPersonal() {
        return senderPersonal;
    }

    public MailProps setSenderPersonal(String senderPersonal) {
        this.senderPersonal = senderPersonal;
        return this;
    }

    public InternetAddress getSenderAddress() {
        try {
            return (senderPersonal != null)
                ? new InternetAddress(senderEmail, senderPersonal)
                : new InternetAddress(senderEmail);
        } catch (AddressException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
