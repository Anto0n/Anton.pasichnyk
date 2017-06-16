package com.bionic.baglab.mail.conf;

import com.bionic.baglab.mail.MailProps;
import com.bionic.baglab.mail.MailSender;
import com.bionic.baglab.mail.SimpleMailSender;
import com.bionic.baglab.mail.template.SimpleTemplateEngine;
import com.bionic.baglab.mail.template.TemplateEngine;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by nicot on 6/12/2017.
 */
@Configuration
public class MailConfig {

    @Bean
    private static MailSender mailSender() {
        MailProps mailProps = new MailProps()
            .setSenderEmail("baglab.eu.bionic@gmail.com")
            .setPassword("QWERTY12345");

        return new SimpleMailSender(mailProps);
    }

    @Bean
    private static TemplateEngine templateEngine() {
        return new SimpleTemplateEngine("static/mail");
    }
}
