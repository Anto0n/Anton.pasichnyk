package com.bionic.baglab.mail.template;

import java.util.Map;

/**
 * Created by nicot on 6/12/2017.
 */
public interface TemplateEngine {

    String build(String templateName, Map<String, ?> values);
}
